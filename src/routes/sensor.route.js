import { Router } from "express";
import { 
    getComplaints,
    getData,
    makecomplaint
 } from "../controllers/sensor.controller.js";

const router = Router();


router.get('/getdata',getData);
router.post('/makecomplaint',makecomplaint)
router.post('/getcomplaints',getComplaints)


export default router;