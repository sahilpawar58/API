import mongoose, {Schema, SchemaType} from "mongoose";


  
  const complaint_data = new Schema({
    village: String,
    district: String,
    tehsil: String,
    complaint: String
  });



export const Complaint_data = mongoose.model("Complaint_data", complaint_data)