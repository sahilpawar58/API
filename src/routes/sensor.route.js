import { Router } from "express";
import { 
    getComplaints,
    getData,
    makecomplaint,
    getmldata,
    getmldatatwo
 } from "../controllers/sensor.controller.js";

const router = Router();


router.get('/getdata',getData);
router.post('/makecomplaint',makecomplaint)
router.post('/getcomplaints',getComplaints)
router.get('/getmldata',getmldata)
router.get('/getmldatatwo',getmldatatwo)


export default router;