import { Schema, model, Document } from "mongoose";

export interface IMonitor extends Document {
          name:string;
          url:string;
          interval:number; // Duration Check (s)
          isActive:boolean;
          createdAt:Date;
          updatedAt:Date;
};

const monitorSchema = new Schema<IMonitor>(
          {
                    name:{type:String,required:true,trim:true},
                    url:{type:String,required:true,trim:true},
                    interval:{type:Number,required:true,default:60},
                    isActive:{type:Boolean,default:true}
          },
          {timestamps:true}
);

export const Monitor = model<IMonitor>('Monitor',monitorSchema);