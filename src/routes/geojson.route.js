import { Router } from "express";
import {
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
    getVillageNames
} from '../controllers/geojson.controller.js'

const router = Router();


router.get('/',getCountryData);
router.get('/state',getStateData);
router.get('/talukaCenter/:districtID',getTalukaByDistrictId)
router.get('/taluka/:districtID/:tehsilID',getTalukaBytehsilID)
router.get('/taluka/:districtID',getTalukaByID);
router.get('/villages/:districtID/:tehsilID',getVillagesByID);
router.post('/village',getVillageByName)
router.post('/villageinfo',getVillageInfo)
router.get('/dustbin',getDustbin)
router.get('/getdistricts',getDistrictNames)
router.post('/gettehsils',getTehsilNames)
router.post('/getvillages',getVillageNames)

export default router;