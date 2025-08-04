const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/UserRoutes')
const trackRoutes = require('./routes/TrackRoutes')
const shipmentRoutes = require('./routes/ShipmentRoutes')
const adminRoutes = require('./routes/AdminRoutes')
const axios = require('axios')

require('dotenv').config()

const app=express()

const FRONTEND_URL = process.env.FRONTEND_URL  
// const Router = process.env.OPENR_KEY

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

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to fetch response" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
