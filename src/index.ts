import { Elysia,status,t } from "elysia";
import { openapi } from '@elysia/openapi';
import { connectDB } from "./config/database";
import { Monitor } from "./models/monitor.model";

connectDB();


const app = new Elysia()
  // เปิดใช้งาน @elysia/openapi
  .use(openapi())

  // GET /health 
  .get('/health', () => ({
    status:'OK',
    timestamp:new Date().toISOString(),
  }) , {
    detail:{
      summary:'Health Check',
      tags:['System'],
    }
  })

  // GET /monitors - get menu of all monitor
  .get('/monitors', async () => {
    try {
      const monitor = await Monitor.find().sort({ createdAt:-1});
      return { success: true,data:monitor};
    } catch (error:any) {
      return {success:false, message: error.message};
    }
  } , {
    detail:{
      summary:'Get all monitors',
      tags:['Monitors'],
    }
  })


  // POST /monitors - create new monitor and validation and openAPI Docs
  .post('/monitors', async ({ body , set}) => {
    try {
      const newMonitor = new Monitor(body);
      const savedMonitor = await newMonitor.save();

      set.status = 201;
      return {success:true, data:savedMonitor};
    } catch (error:any) {
      set.status = 400;
      return {success:false, message:error.message};
    }
  },
  {
    body:t.Object({
      name:t.String({description:`Name's website or services`}),
      url:t.String({ description:`URL as Check`}),
      interval:t.Number({ default:60,description:`Duration on check (s)`}),
      isActive:t.Optional(t.Boolean({default:true})),
    }),
    detail:{
      summary:'Create a new monitor',
      tags:['Monitors'],
    },
  }
  )
  .listen(3000);



console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
