require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Property = require("../models/Property");

const properties = [
  { title: "Sunview Residency 2BHK", type: "Flat", city: "Nagpur", locality: "Dharampeth", bedrooms: 2, bathrooms: 2, sqft: 980, furnishing: "Semi-furnished", rent: 18000, deposit: 54000, leaseTerm: "11 months", availability: "Immediately", description: "Bright corner flat with balcony, close to markets and schools.", owner: { name: "Rohit Deshmukh", phone: "+91 98230 11234", email: "rohit.d@example.com" } },
  { title: "Green Meadows Bungalow", type: "Bungalow", city: "Nagpur", locality: "Wardha Road", bedrooms: 4, bathrooms: 3, sqft: 2600, furnishing: "Unfurnished", rent: 45000, deposit: 135000, leaseTerm: "12 months", availability: "1st of next month", description: "Independent bungalow with garden and covered parking for two cars.", owner: { name: "Suman Kale", phone: "+91 98220 55678", email: "suman.kale@example.com" } },
  { title: "Riverside Studio Flat", type: "Flat", city: "Pune", locality: "Kothrud", bedrooms: 1, bathrooms: 1, sqft: 520, furnishing: "Fully furnished", rent: 15500, deposit: 31000, leaseTerm: "11 months", availability: "Immediately", description: "Compact fully furnished studio, ideal for a working professional.", owner: { name: "Aditi Rane", phone: "+91 90210 99887", email: "aditi.rane@example.com" } },
  { title: "Palm County House", type: "House", city: "Pune", locality: "Baner", bedrooms: 3, bathrooms: 2, sqft: 1450, furnishing: "Semi-furnished", rent: 32000, deposit: 96000, leaseTerm: "11 months", availability: "15th next month", description: "Row house in a gated society with clubhouse and kids' play area.", owner: { name: "Vikram Joshi", phone: "+91 99870 44556", email: "vikram.joshi@example.com" } },
  { title: "Marine Breeze Apartment", type: "Flat", city: "Mumbai", locality: "Andheri West", bedrooms: 2, bathrooms: 2, sqft: 850, furnishing: "Fully furnished", rent: 52000, deposit: 156000, leaseTerm: "11 months", availability: "Immediately", description: "Modern apartment near the station with 24x7 security.", owner: { name: "Farah Sheikh", phone: "+91 98670 22110", email: "farah.sheikh@example.com" } },
  { title: "Whispering Pines Bungalow", type: "Bungalow", city: "Nashik", locality: "Gangapur Road", bedrooms: 5, bathrooms: 4, sqft: 3200, furnishing: "Unfurnished", rent: 60000, deposit: 180000, leaseTerm: "12 months", availability: "1st next month", description: "Large family bungalow with orchard-facing terrace.", owner: { name: "Prakash Nikam", phone: "+91 97650 33221", email: "prakash.nikam@example.com" } },
  { title: "Orchid Heights 1BHK", type: "Flat", city: "Indore", locality: "Vijay Nagar", bedrooms: 1, bathrooms: 1, sqft: 610, furnishing: "Semi-furnished", rent: 11000, deposit: 22000, leaseTerm: "11 months", availability: "Immediately", description: "Well-ventilated flat close to the tech park, good for students too.", owner: { name: "Neha Agarwal", phone: "+91 96540 77889", email: "neha.agarwal@example.com" } },
  { title: "Lakeview Independent House", type: "House", city: "Nagpur", locality: "Manish Nagar", bedrooms: 3, bathrooms: 3, sqft: 1700, furnishing: "Semi-furnished", rent: 27000, deposit: 81000, leaseTerm: "11 months", availability: "Immediately", description: "Independent house facing the lake with a private terrace garden.", owner: { name: "Ganesh Pillay", phone: "+91 98120 66334", email: "ganesh.pillay@example.com" } },
  { title: "Silver Oak Bungalow", type: "Bungalow", city: "Indore", locality: "Palasia", bedrooms: 4, bathrooms: 3, sqft: 2400, furnishing: "Unfurnished", rent: 38000, deposit: 114000, leaseTerm: "12 months", availability: "20th next month", description: "Renovated bungalow with home office space and servant quarters.", owner: { name: "Radhika Shah", phone: "+91 90987 12345", email: "radhika.shah@example.com" } },
];

const run = async () => {
  await connectDB();

  await Property.deleteMany();
  console.log("Existing properties cleared");

  let admin = await User.findOne({ email: "admin@nivasa.com" });
  if (!admin) {
    admin = await User.create({
      name: "Admin",
      email: "admin@nivasa.com",
      password: "admin1234",
      role: "admin",
    });
    console.log("Admin user created — admin@nivasa.com / admin1234");
  }

  const withCreator = properties.map((p) => ({ ...p, createdBy: admin._id }));
  await Property.insertMany(withCreator);
  console.log(`${withCreator.length} properties seeded`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
