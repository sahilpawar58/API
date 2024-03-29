import mongoose from "mongoose";
import { Country } from "../models/country.model.js";
import { Maharashtra_district } from "../models/state.model.js";
import { Maharashtra_village } from "../models/village.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';
import {Maharashtra_taluka} from '../models/taluka.model.js'
import { Dustbin } from "../models/dustbin.model.js";

const getCountryData = asyncHandler(async(req,res) => {
    const documents = await Country.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getStateData = asyncHandler(async(req,res) => {
    const documents = await Maharashtra_district.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getTalukaByDistrictId = asyncHandler(async(req,res) => {
  const { districtID } = req.params;
  console.log(districtID)
  try{
    const documents = await Maharashtra_district.find({"properties.District_ID": districtID});
    // console.log(documents)
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
  }catch(error){
    console.error(error);
    return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
  }
  
})


const getVillagesByID = asyncHandler(async(req, res) => {
    
    const { districtID,tehsilID } = req.params;
    console.log(tehsilID)
    try {
        const documents = await Maharashtra_village.find({ "properties.District_ID": districtID, "properties.Tehsil_NO":tehsilID });
        return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
      } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
      }
});



const getVillageByName = asyncHandler(async(req,res) => {
    console.log(req.params)
    const { districtID,tehsilID,name } = req.body;
    console.log(req.body);
    // return res.status(200).json(new ApiResponse(200,{name,districtID,tehsilID},"Done"))
    try {
        const documents = await Maharashtra_village.find({ "properties.District_ID": districtID, "properties.Tehsil_NO":tehsilID, "properties.NAME":name });
        console.log(documents)
        return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
      } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
      }
})

const getTalukaByID = asyncHandler(async(req, res) => {
    
    const { districtID} = req.params;
    try {
        const documents = await Maharashtra_taluka.find({ "properties.District_ID": districtID });
        return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
      } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
      }
});

const getTalukaBytehsilID = asyncHandler(async(req, res) => {
    
  const { districtID,tehsilID} = req.params;
  try {
      const documents = await Maharashtra_taluka.find({ "properties.District_ID": districtID , "properties.Tehsil_NO": tehsilID });
      return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
    }
});

const getDustbin =asyncHandler(async(req,res)=>{
  try {
    const dustbins = await Dustbin.find();
    return res.status(200).json(dustbins);
  } catch (error) {
    console.error('Error fetching dustbins:', error);
    return res.status(500).json({ error: 'Error fetching dustbins' });
  }
})


export {
    getCountryData,
    getStateData,
    getVillagesByID,
    getTalukaByID,
    getVillageByName,
    getDustbin,
    getTalukaByDistrictId,
    getTalukaBytehsilID,
}