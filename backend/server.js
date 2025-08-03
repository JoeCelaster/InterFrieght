const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/UserRoutes')
const trackRoutes = require('./routes/TrackRoutes')
const shipmentRoutes = require('./routes/ShipmentRoutes')
const adminRoutes = require('./routes/AdminRoutes')

require('dotenv').config()

const app=express()

const FRONTEND_URL = process.env.LOCAL_URL  

app.use(cors({
  origin : FRONTEND_URL,
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());


const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT


mongoose.connect(MONGO_URI)
.then(()=>console.log('Mongo Connected'))
.catch(()=>console.log('Error connection'))


app.use('/shipment',shipmentRoutes)
app.use('/users',userRoutes)
app.use('/',trackRoutes)
app.use('/admin',adminRoutes)

app.get('/', (req, res) => {
  const data = {
    message: 'This is a GET endpoint example',
  };
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
