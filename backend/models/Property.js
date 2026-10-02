const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    // --- Housing details ---
    type: {
      type: String,
      enum: ["Flat", "Bungalow", "House"],
      required: true,
    },
    city: { type: String, required: true, trim: true },
    locality: { type: String, required: true, trim: true },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    sqft: { type: Number, required: true, min: 0 },
    furnishing: {
      type: String,
      enum: ["Unfurnished", "Semi-furnished", "Fully furnished"],
      default: "Unfurnished",
    },
    description: { type: String, default: "" },

    // --- Rental details ---
    rent: { type: Number, required: true, min: 0 }, // monthly rent
    deposit: { type: Number, required: true, min: 0 },
    leaseTerm: { type: String, default: "11 months" },
    availability: { type: String, default: "Immediately" },

    // --- Owner / contact ---
    owner: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

propertySchema.index({ title: "text", city: "text", locality: "text" });

module.exports = mongoose.model("Property", propertySchema);
