const Message = require("../models/Message");
const Property = require("../models/Property");

const sendMessage = async (req, res) => {
  try {
    console.log("====== SEND MESSAGE ======");
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const { id } = req.params;
    const { senderName, senderEmail, message } = req.body;

    const property = await Property.findById(id);

    console.log("Property Found:", property);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const doc = await Message.create({
      property: id,
      senderName,
      senderEmail,
      message,
    });

    console.log("Saved Message:", doc);

    res.status(201).json({
      message: "Message sent",
      data: doc,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMessagesForProperty = async (req, res) => {
  try {
    const messages = await Message.find({
      property: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessagesForProperty,
};