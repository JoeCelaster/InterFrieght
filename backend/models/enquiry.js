const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  co: { type: String, required: true },                // Country of Origin
  port: { type: String, required: true },              // Port of Loading
  commodity: { type: String, required: true },         // Commodity
  cargoUnit: { type: String, required: true },         // Cargo Unit
  packages: { type: Number, required: true },          // No of packages
  dimensions: { type: String, required: true },        // Dimensions
  transport: { type: String, required: true },         // Air / Sea / Land
  shipment: { type: String, required: true },          // Import / Export
  contact: { type: String, required: false },          // Contact No (optional)
  email: { type: String, required: true },             // Email
  organization: { type: String, required: true }       // Organization Name
});

module.exports = mongoose.model("Enquiry", enquirySchema);