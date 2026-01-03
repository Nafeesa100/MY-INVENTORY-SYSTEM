const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// CREATE
router.post("/", async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
});

// READ
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories); // ✅ send array of categories
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
