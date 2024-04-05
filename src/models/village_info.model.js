import mongoose, {Schema, SchemaType} from "mongoose";

const panchayatSchema = new Schema({
    Name: String,
    Designation: String,
    Gender: String
  });
  
  const village_data = new Schema({
    name: String,
    tehsilId: Number,
    DistrictId: Number,
    totalhouseholds: Number,
    tap: Number,
    unconnected: Number,
    District: String,
    Tehsil: String,
    officer: {
      type: Schema.Types.ObjectId,
      ref: 'Officer'
    },
    Panchayat: [panchayatSchema]
  });



export const Village_info = mongoose.model("Village_info", village_data)