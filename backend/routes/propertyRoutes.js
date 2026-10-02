const express = require("express");
const {
  getProperties,
  getPropertyById,
  getCities,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const {
  sendMessage,
  getMessagesForProperty,
} = require("../controllers/messageController");

const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getProperties);
router.get("/meta/cities", getCities);
router.get("/:id", getPropertyById);

router.post("/:id/contact", sendMessage);

router.post("/", protect, adminOnly, createProperty);
router.put("/:id", protect, adminOnly, updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);
router.get("/:id/messages", protect, adminOnly, getMessagesForProperty);

module.exports = router;