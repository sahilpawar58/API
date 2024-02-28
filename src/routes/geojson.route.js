import { Router } from "express";
import {
    getCountryData,
    getStateData,
    getVillageByID    
} from '../controllers/geojson.controller.js'

const router = Router();


router.get('/',getCountryData);
router.get('/state',getStateData);
router.get('/villages/:districtID',getVillageByID);

export default router;