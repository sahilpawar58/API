import { Sensordata } from "../models/sensor.model.js";
import { Complaint_data } from "../models/complaint.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';

const getData = asyncHandler(async(req,res) => {
  const maxTimestampDocument = await Sensordata.findOne({})
      .sort({ Timestamp: -1 }) // Sort in descending order based on Timestamp
      .exec();

    //  maxTimestampDocument;
  console.log(maxTimestampDocument)
  return res.status(200).json(new ApiResponse(200, maxTimestampDocument, "Fetched Successfully"));;

})

const makecomplaint = asyncHandler(async(req,res)=>{
  const {district,tehsil,village,complaint} = req.body;


  console.log(req.body)

  const newrecord = await Complaint_data.create({
    district:district.toLowerCase(),
    tehsil,
    village,
    complaint
})

  return res.status(200).json(new ApiResponse(200, {newrecord}, "Fetched Successfully"));;
})

const getComplaints = asyncHandler(async(req,res)=>{
  const {district,tehsil,village} = req.body;

  const documents = await Complaint_data.find({"district": district.toLowerCase(),"tehsil":tehsil.toLowerCase(),"village":village.toLowerCase()});
  console.log(req.body)
  return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
})

export {
    getData,
    makecomplaint,
    getComplaints
}