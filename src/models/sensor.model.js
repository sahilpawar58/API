import mongoose, {Schema, SchemaType} from "mongoose";

const readingsSchema = new Schema({
    DesiredLitres: Number,
    Liters: Number
  });
  
  const tankSchema = new Schema({
    Turbidity_remark: String,
    ph_remark: String
  });
  
  const sensordata = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    Timestamp: Number,
    Readings: {
      NODE_1: readingsSchema,
      NODE_2: readingsSchema,
      TANK: tankSchema
    }
  });



export const Sensordata = mongoose.model("Sensordata", sensordata)