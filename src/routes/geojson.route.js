import { Router } from "express";
import {
    getCountryData,
    getStateData,
    getVillagesByID,
    getTalukaByID,
    getVillageByName,
    getDustbin,
    getTalukaByDistrictId,
    getTalukaBytehsilID
} from '../controllers/geojson.controller.js'

const router = Router();


router.get('/',getCountryData);
router.get('/state',getStateData);
router.get('/talukaCenter/:districtID',getTalukaByDistrictId)
router.get('/taluka/:districtID/:tehsilID',getTalukaBytehsilID)
router.get('/taluka/:districtID',getTalukaByID);
router.get('/villages/:districtID/:tehsilID',getVillagesByID);
router.post('/village',getVillageByName)
router.get('/dustbin',getDustbin)

export default router;