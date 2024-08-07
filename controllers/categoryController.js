const categoryModel = require("../models/category.model");

class CategoryController {
  async getAll(req, res) {
    try {
      const category = await categoryModel.find();
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async createCategory(req, res) {
    try {
      const category = await categoryModel.create(req.body);
      res.status(201).send(category);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteCategory(req, res) {
    try {
      await categoryModel.findByIdAndDelete(req.params.id);
      res.status(200).send("Category deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async cleanupUnwantedDocuments(req, res) {
    try {
      await categoryModel.deleteMany({
        $or: [
          { name: { $exists: false } },
          { count: { $exists: false } },
          { imgUrl: { $exists: false } },
        ],
      });
      res.status(200).send("Unwanted documents deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteAll(req, res) {
    try {
      await categoryModel.deleteMany({});
      res.status(200).send("All categories deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new CategoryController();
