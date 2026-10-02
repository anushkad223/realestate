const User = require("../models/User");
const Property = require("../models/Property");

// @route  GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route  POST /api/favorites/:propertyId  — toggles favourite on/off
const toggleFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const user = await User.findById(req.user._id);
    const index = user.favorites.findIndex((id) => id.toString() === propertyId);

    let favorited;
    if (index > -1) {
      user.favorites.splice(index, 1);
      favorited = false;
    } else {
      user.favorites.push(propertyId);
      favorited = true;
    }

    await user.save();
    res.json({ favorited, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFavorites, toggleFavorite };
