const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const fileService = require("../service/file.service");

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
    const fileName = fileService.save(req.files.image)
    const products = await productModel.find()

    try {
      const updatedData = {
        ...req.body,
        image: fileName
      };
      const category = await categoryModel.create(updatedData)
      res.status(201).send(category);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteCategory(req, res) {
    try {
      const deletedProduct = await categoryModel.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).send("Product not found");
      }
      fileService.delete(deletedProduct.image) 
      res.status(200).send("Category deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteManyCategory(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
          return console.log("No IDs provided");
        }
        const idsArray = Array.isArray(id) ? id : [id]; // IDs ['dcsdc1sdc20dc', 'dsdcsdc223rse34sdc']

        const allCategories = await categoryModel.find({})
        const matchedCategories = allCategories.filter(c => 
          idsArray.some(id => c._id.equals(id))
        )
        if (matchedCategories.length === 0) {
          return res.status(404).json({ message: 'No items found to delete' });
        }else{
          matchedCategories.forEach(c => {
            fileService.delete(c.image);
          });
          var result = await categoryModel.deleteMany({ _id: { $in: idsArray } });
        }
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'No items found to delete' });
        }
        console.log(idsArray);
        res.status(200).json({ message: 'Items deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.log("Internal Server Error", error.message);
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
