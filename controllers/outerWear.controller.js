const { JsxEmit } = require('typescript');
const OuterWearModel = require('../models/outerwear.model');
const fileService = require('../service/file.service');

class OuterwearController {
  async getAll(req, res) {
    try {
      const product = await OuterWearModel.find();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getByProductId(req, res) {
    try {
      const product = await OuterWearModel.findOne(req.params.productId);
      if (!product) {
        return console.log(`Product with productId ${req.params} not found`);
      }
      res.status(200).json(product);
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
        complect1: JSON.parse(req.body.complect1) // JSON stringini arrayga o'giradi
    };
      const product = await OuterWearModel.create(newPostData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async edit(req, res) {
    try {
      const { productId } = req.params;
      const updatedData = req.body;
      const updatedProduct = await OuterWearModel
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
      const deletedProduct = await OuterWearModel
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
      await OuterWearModel
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
      await OuterWearModel
    .deleteMany({});
      res.status(200).send("All categories deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new OuterwearController();




