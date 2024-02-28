import mongoose from "mongoose";
import { Country } from "../models/country.model.js";
import { Maharashtra } from "../models/state.model.js";
import { Maharashtra_village } from "../models/village.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';

const getCountryData = asyncHandler(async(req,res) => {
    const documents = await Country.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getStateData = asyncHandler(async(req,res) => {
    const documents = await Maharashtra.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getVillageByID = asyncHandler(async(req, res) => {
    
    const { districtID } = req.params;
    try {
        const documents = await Maharashtra_village.find({ "properties.District_ID": districtID });
        return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));
      } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
      }
});


export {
    getCountryData,
    getStateData,
    getVillageByID
}