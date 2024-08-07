const underWearModel = require("../models/underwear.model");
const fileService = require("../service/file.service");

class ProductController {
  async getAll(req, res) {
    try {
      const product = await underWearModel
    .find();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async create(req, res) {
    try {
      const fileName = fileService.save(req.files.image)
      const newPostData = {
        ...req.body,
        image: fileName,
        color: JSON.parse(req.body.color), // JSON stringini arrayga o'giradi
        colorName: JSON.parse(req.body.colorName), 
        sizes: JSON.parse(req.body.sizes), // JSON stringini arrayga o'giradi
        complect1: JSON.parse(req.body.complect1) // JSON stringini arrayga o'giradi
    };
      const product = await underWearModel.create(newPostData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async edit(req, res) {
    try {
      const { productId } = req.params;
      const updatedData = req.body;
      const updatedProduct = await underWearModel
    .findByIdAndUpdate(
        productId,
        updatedData,
        { new: true, runValidators: true } // Return the updated document
      );
      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async delete(req, res) {
    try {
      const { productId } = req.params;
      const deletedProduct = await underWearModel
    .findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).send("Product not found");
      }
      res.status(200).send(req.params);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async cleanupUnwantedDocuments(req, res) {
    try {
      await underWearModel
    .deleteMany({
        $or: [
          { name: { $exists: false } },
          { sizes: { $exists: false } },
          { image: { $exists: false } },
          { colors: { $exists: false } },
          {type: { $exists: false }},
          {description: { $exists: false }},
          { productId: { $exists: false } },
          { complect1: { $exists: false } },
        ],
      });
      res.status(200).send("Unwanted documents deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteAll(req, res) {
    try {
      await underWearModel
    .deleteMany({});
      res.status(200).send("All categories deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new ProductController();
