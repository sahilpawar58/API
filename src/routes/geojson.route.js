import { Router } from "express";
import {
    getCountryData,
    getStateData,
    getVillagesByID,
    getTalukaByID,
    getVillageByName
} from '../controllers/geojson.controller.js'

const router = Router();


router.get('/',getCountryData);
router.get('/state',getStateData);
router.get('/taluka/:districtID',getTalukaByID);
router.get('/villages/:districtID/:tehsilID',getVillagesByID);
router.post('/village',getVillageByName)

export default router;