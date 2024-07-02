import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(cors());
var corsOptions = {
  origin: ['http://localhost:5173', 'https://dashboard-green-gamma.vercel.app'],
  credentials: true,
  origin: true
}
// app.options('*', cors())
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

import geojsonRouter from './routes/geojson.route.js';
import userRouter from './routes/user.route.js';
import sensorRoute from './routes/sensor.route.js'

app.use('/api/v1/geojson',geojsonRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/sensor',sensorRoute)
export default app;
