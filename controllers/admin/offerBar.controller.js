// controllers/admin/offerBar.controller.js
import OfferBar from "../../models/offerBar.model.js";

/**
 * CREATE
 */
export const createOfferBar = async (req, res) => {
  try {
    const { text, order } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Offer text is required" });
    }

    const offer = await OfferBar.create({
      text,
      order
    });

    res.status(201).json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET (Frontend use)
 */
export const getActiveOfferBars = async (req, res) => {
  try {
    const offers = await OfferBar.find({
      isActive: true,
      $or: [
        { startDate: { $exists: false } },
        { startDate: { $lte: new Date() } }
      ],
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gte: new Date() } }
      ]
    }).sort({ order: 1 });

    res.json({
      success: true,
      data: offers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE
 */
export const updateOfferBar = async (req, res) => {
  try {
    const offer = await OfferBar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: offer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE
 */
export const deleteOfferBar = async (req, res) => {
  try {
    await OfferBar.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Offer removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
