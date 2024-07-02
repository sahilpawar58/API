import mongoose from "mongoose";
import { Country } from "../models/country.model.js";
import { Maharashtra_district } from "../models/state.model.js";
import { Maharashtra_village } from "../models/village.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';
import {Maharashtra_taluka} from '../models/taluka.model.js'
import { Dustbin } from "../models/dustbin.model.js";
import { Village_info } from "../models/village_info.model.js";
import { Sensordata } from "../models/sensor.model.js";

const getdata = asyncHandler(async(req,res) => {
  const maxTimestampDocument = await Sensordata.findOne({})
      .sort({ Timestamp: -1 }) // Sort in descending order based on Timestamp
      .exec();

    //  maxTimestampDocument;
  console.log(maxTimestampDocument)
  return res.status(200).json(new ApiResponse(200, {maxTimestampDocument}, "Fetched Successfully"));;

})
const getCountryData = asyncHandler(async(req,res) => {
    const documents = await Country.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getCountryDataByStateName = asyncHandler(async(req,res) => {
  const {stateName} = req.body;
  try{
    if (!stateName) {
      return res.status(400).json({ message: 'State name is required' });
    }
  
    const districtNames = await Country.aggregate([
      {
        $project: {
          State_names: "$properties.NAME_1"
        }
      },
      {
        $match: {
          "State_names": { $regex: `^${stateName}`, $options: 'i' } // Case-insensitive search
        }
      },
    ]);
    return res.status(200).json(new ApiResponse(200, districtNames, "Fetched Successfully"));;  
  }catch(error){
    console.error(error);
    return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
  }
})

const getStateData = asyncHandler(async(req,res) => {
    const documents = await Maharashtra_district.find();
    return res.status(200).json(new ApiResponse(200, documents, "Fetched Successfully"));;
})

const getDistrictNamesByQuery = asyncHandler(async(req,res) => {
  const {districtName} = req.body;
  try{
    if (!districtName) {
      return res.status(400).json({ message: 'State name is required' });
    }
  
    const districtNames = await Maharashtra_district.aggregate([
      {
        $project: {
          State_names: "$properties.District"
        }
      },
      {
        $match: {
          "State_names": { $regex: `^${districtName}`, $options: 'i' } // Case-insensitive search
        }
      },
    ]);
    return res.status(200).json(new ApiResponse(200, districtNames, "Fetched Successfully"));;  
  }catch(error){
    console.error(error);
    return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
  }
})

const getDistrictNames = asyncHandler(async (req, res) => {
  const districtNames = await Maharashtra_district.aggregate([
    {
      $project: {
        district: "$properties.District"
      }
    }
  ]);

  res.json(districtNames);
});

const getTehsilNames = asyncHandler(async (req, res) => {
  const {district} = req.body;
  const districtNames = await Maharashtra_taluka.aggregate([
    {$project:
         {
          district: { $toLower: "$properties.District" },
          tehsil: { $toLower: "$properties.TEHSIL" },
         }
     },
     {
      $match:{
        district:district
      }
     }
  ]);

  res.json(districtNames);
});

const getTehsilNamesByQuery = asyncHandler(async(req,res) => {
  const {tehsilName,districtName} = req.body;
  try{
    if (!tehsilName) {
      return res.status(400).json({ message: 'State name is required' });
    }
    const tehsilList = await Maharashtra_taluka.aggregate([
      {
        $project: {
          TehsilName: "$properties.TEHSIL",
          DistrictName: { $toLower:"$properties.District"}
        }
      },
      {
        $match: {
          "DistrictName": districtName
        }
      },
      {
        $match: {
          "TehsilName": { $regex: `^${tehsilName}`, $options: 'i' } // Case-insensitive search
        }
      }
    ]);
    return res.status(200).json(new ApiResponse(200, tehsilList, "Fetched Successfully"));;  
  }catch(error){
    console.error(error);
    return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
  }
})

const getVillageNames = asyncHandler(async (req, res) => {
  const {tehsil} = req.body;
  const districtNames = await Maharashtra_village.aggregate([
    {$project:
         {
          district: { $toLower: "$properties.DISTRICT" },
          tehsil: { $toLower: "$properties.SUB_DIST" },
          name: { $toLower: "$properties.NAME" },
         }
     },
     {
      $match:{
        tehsil:tehsil
      }
     },
     {
      $project:
      {
        name:1
      }
     },
     {
      $sort: {
        name: 1 // 1 for ascending order, -1 for descending order
      }
    }
  ]);

  res.json(districtNames);
});

const getVillageNamesByQuery = asyncHandler(async(req,res) => {
  const {tehsilName,districtName,villageName} = req.body;
  try{
    if (!villageName) {
      return res.status(400).json({ message: 'State name is required' });
    }
    const villageList = await Maharashtra_village.aggregate([
      {
        $project: {
          TehsilName: "$properties.SUB_DIST",
          DistrictName: { $toLower:"$properties.DISTRICT"},
          VillageName: { $toLower: "$properties.NAME" }
        }
      },
      {
        $match: {
          "DistrictName": districtName
        }
      },
      {
        $match: {
          "TehsilName": tehsilName
        }
      },
      {
        $match: {
          "VillageName": { $regex: `^${villageName}`, $options: 'i' } // Case-insensitive search
        }
      }
    ]);
    return res.status(200).json(new ApiResponse(200, villageList, "Fetched Successfully"));;  
  }catch(error){
    console.error(error);
    return res.status(500).json(new ApiResponse(500, error.message, "Error fetching data"));
  }
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

const getVillageInfo = asyncHandler(async(req,res) => {
  const { id } = req.body;
  console.log(id)
  try{
    const documents = await Village_info.find({"officer":id});
    console.log(documents)
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
    getVillageInfo,
    getDistrictNames,
    getTehsilNames,
    getVillageNames,
    getCountryDataByStateName,
    getDistrictNamesByQuery,
    getTehsilNamesByQuery,
    getVillageNamesByQuery
    
}