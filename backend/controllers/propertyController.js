const Property = require("../models/Property");

console.log(Property);
console.log(typeof Property);




// @route  GET /api/properties
// Supports: type, city, bedrooms, maxRent, search, sort=low|high|newest
const getProperties = async (req, res) => {
  try {
    const { type, city, bedrooms, maxRent, search, sort } = req.query;
    const query = {};

    if (type && type !== "All") query.type = type;
    if (city && city !== "All") query.city = city;
    if (bedrooms) {
      query.bedrooms = Number(bedrooms) >= 4 ? { $gte: 4 } : Number(bedrooms);
    }
    if (maxRent) query.rent = { $lte: Number(maxRent) };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { locality: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "low") sortOption = { rent: 1 };
    if (sort === "high") sortOption = { rent: -1 };

    const properties = await Property.find(query).sort(sortOption);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  GET /api/properties/meta/cities
const getCities = async (req, res) => {
  try {
    const cities = await Property.distinct("city");
    res.json(cities.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  POST /api/properties  (admin only)
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route  PUT /api/properties/:id  (admin only) — edit rent, rental & housing details
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route  DELETE /api/properties/:id  (admin only)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  getCities,
  createProperty,
  updateProperty,
  deleteProperty,
};
