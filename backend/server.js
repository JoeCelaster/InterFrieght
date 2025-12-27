require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const { Resend } = require('resend').default || require('resend');
const { MongoClient } = require('mongodb'); // <-- added

const userRoutes = require('./routes/UserRoutes');
const trackRoutes = require('./routes/TrackRoutes');
const shipmentRoutes = require('./routes/ShipmentRoutes');
const adminRoutes = require('./routes/AdminRoutes');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with or without trailing slash
    const allowedOrigins = [
      'https://www.interfreight.in',
      'https://www.interfreight.in/',
      'http://localhost:5173'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ------------ Mongoose (your existing connection) ------------
mongoose.connect(MONGO_URI)
  .then(() => console.log('Mongoose (auth) connected'))
  .catch(err => console.error('Mongoose connection error:', err));

// ------------ Native MongoClient for ports DB ------------
const client = new MongoClient(MONGO_URI, {
});
let portsDB = null;

async function connectClientDB() {
  try {
    await client.connect();
    console.log('MongoClient connected');
    portsDB = client.db('ports'); // choose the database name
    console.log('portsDB ready');
  } catch (error) {
    console.error('MongoClient connect error:', error);
  }
}
connectClientDB(); // <-- make sure we call it

// ------------ Routes ------------
app.use('/shipment', shipmentRoutes);
app.use('/users', userRoutes);
app.use('/', trackRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is a GET endpoint example' });
});

// ------------ GET /ports (fixed) ------------
app.get('/ports', async (req, res) => {
  try {
    if (!portsDB) {
      // Not connected yet
      return res.status(503).json({ success: false, error: 'Ports DB not ready. Try again shortly.' });
    }

    const collection = portsDB.collection('data'); // ensure this is the correct collection name
    const data = await collection.find({}).toArray(); // await -> get actual data

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('/ports error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post('/sendmail', async (req, res) => {
  try {
    const {
      co,
      port,
      commodity,
      cargoUnit,
      packages,
      dimensions,
      transport,
      shipment,
      contact,
      email,
      organization
    } = req.body;


    // Create a more detailed email template
    const emailHtml = `
      <h2>New Logistics Enquiry</h2>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Contact Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${contact}</p>
      <br/>

      <h3>Shipment Details</h3>
      <p><strong>Country of Origin:</strong> ${co}</p>
      <p><strong>Port:</strong> ${port}</p>
      <p><strong>Commodity:</strong> ${commodity}</p>
      <p><strong>Cargo Unit:</strong> ${cargoUnit}</p>
      <p><strong>No. of Packages:</strong> ${packages}</p>
      <p><strong>Dimensions:</strong> ${dimensions}</p>
      <p><strong>Transport Mode:</strong> ${transport}</p>
      <p><strong>Shipment Type:</strong> ${shipment}</p>
    `;


    const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

await transporter.sendMail({
  from: "Interfreight Enquiry <noreply@interfreight.in>",
  to: "interfreight.forwarders@gmail.com",
  subject: `New Enquiry from ${contact || 'a customer'}`,
  html: emailHtml,
});

  console.log('Email sent successfully:');
  return res.status(200).json({ 
    success: true, 
    message: 'Enquiry submitted successfully',
      // data: data
    });

  } catch (error) {
    console.error('Error in /sendmail endpoint:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
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

// ------------ Start server ------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
