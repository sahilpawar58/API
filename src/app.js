import  express  from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

import geojsonRouter from './routes/geojson.route.js';

app.use('/api/v1/geojson',geojsonRouter)
export default app;
