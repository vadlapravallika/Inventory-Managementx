const Category = require("../models/category");
const Product = require("../models/product");

// Create a new category
const create = (req, res, next) => {
  const categoryName = req.body.catName;
  const category = new Category({
    categoryName,
  });

  category.save()
    .then((data) => {
      res.status(201).json(data); // Return created category with status code 201
    })
    .catch((err) => {
      res.status(500).json({ error: "Error creating category" });
    });
};

// View all categories
const view = (req, res, next) => {
  Category.find()
    .then((data) => {
      res.status(200).json(data); // Return categories with status code 200
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching categories" });
    });
};

// Update a category by ID
const update = (req, res, next) => {
  const categoryId = req.params.id;
  const updateData = req.body;

  Category.findByIdAndUpdate(categoryId, updateData, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category); // Return updated category with status code 200
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating category" });
    });
};

// Remove a category by ID
const remove = (req, res, next) => {
  const categoryId = req.params.id;

  Category.findByIdAndDelete(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      // Remove products associated with the deleted category
      return Product.deleteMany({ category: categoryId });
    })
    .then(() => {
      res.status(200).json({ message: "Category deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error deleting category" });
    });
};

module.exports = { create, view, update, remove };
