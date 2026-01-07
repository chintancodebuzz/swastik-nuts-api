// controllers/admin/faq.controller.js
import FAQ from "../../models/faq.model.js";

/**
 * CREATE FAQ
 */
export const  createFAQ = async (req, res) => {
  try {
    const { question, answer, order } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: "Question is required" });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const faq = await FAQ.create({ question: question.trim(), answer: answer.trim(), order });

    res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    console.error("❌ createFAQ:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET All FAQs (Frontend or Admin)
 */
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    console.error("❌ getFAQs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE FAQ
 */
export const updateFAQ = async (req, res) => {
  try {
    const { question, answer, order, isActive } = req.body;

    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    if (question) faq.question = question.trim();
    if (answer) faq.answer = answer.trim();
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;

    await faq.save();

    res.json({ success: true, data: faq });
  } catch (error) {
    console.error("❌ updateFAQ:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE FAQ
 */
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await faq.deleteOne();

    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("❌ deleteFAQ:", error);
    res.status(500).json({ message: "Server error" });
  }
};
