import { Router } from "express";
import { 
    getComplaints,
    getData,
    makecomplaint,
    getmldata
 } from "../controllers/sensor.controller.js";

const router = Router();


router.get('/getdata',getData);
router.post('/makecomplaint',makecomplaint)
router.post('/getcomplaints',getComplaints)
router.get('/getmldata',getmldata)


export default router;