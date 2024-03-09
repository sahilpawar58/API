import mongoose from "mongoose";
import { Country } from "../models/country.model.js";
import { Maharashtra_district } from "../models/state.model.js";
import { Maharashtra_village } from "../models/village.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';
import {Maharashtra_taluka} from '../models/taluka.model.js'

const getCountryData = asyncHandler(async(req,res) => {
    const documents = await Country.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getStateData = asyncHandler(async(req,res) => {
    const documents = await Maharashtra_district.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
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
    const { districtID,tehsilID,name } = req.params;
    console.log(name);
    return res.status(200).json(new ApiResponse(200,{name,districtID,tehsilID},"Done"))
    try {
        const documents = await Maharashtra_village.find({ "properties.District_ID": districtID, "properties.Tehsil_NO":tehsilID, "properties.NAME":name });
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


export {
    getCountryData,
    getStateData,
    getVillagesByID,
    getTalukaByID,
    getVillageByName
}