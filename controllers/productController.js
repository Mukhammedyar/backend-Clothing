const { filterData } = require("../middleware/filterData");
const productModel = require("../models/product.model");
const fileService = require("../service/file.service");
const { ObjectId } = require('mongodb');

class ProductController {
  async getAll(req, res) {
    try {
      const product = await productModel
    .find();
    if(product.length === 0) {
      res.status(404).send("Products array is empty. Please create a new one")
    }else{
      res.status(201).json(product);
    }
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
        colors: JSON.parse(req.body.color),
        sizes: Array.isArray(req.body.sizes) ? JSON.parse(req.body.sizes) : (JSON.stringify(req.body.sizes.split(',').map(size => size.trim()))) ,
        complect1: req.body.complect1
      };

      const product = await productModel.create(newPostData);
      res.status(201).json(product);
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ message: 'Error during file upload', error: error.message });
    }
  }
  async edit(req, res) {
    try {
      const { productId } = req.params;
      const oldProduct = await productModel.findById(productId)

      if (!oldProduct) {
        return res.status(404).send("Mahsulot topilmadi");
      }
      let fileName = oldProduct.image;

      if (req.files && req.files.image) {
        console.log("yangi rasm keldi");
        // Eski rasmni o'chirish
        if (oldProduct.image) {
          fileService.delete(oldProduct.image);
          console.log("oldingi rasm ochirildi");
        }
        // Yangi rasmni saqlash
        fileName = fileService.save(req.files.image);
      } else {
        // Agar yangi rasm yuborilmagan bo'lsa, eski rasmni saqlab qolish
        fileName = oldProduct.image;
      }

      console.log(req.files);

      const updatedData = {
        ...req.body,
        image: fileName,
        colors: JSON.parse(req.body.colors),
        sizes: JSON.parse(req.body.sizes),
        complect1: req.body.complect1 
      };
      
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true, runValidators: true }
      );
      res.status(200).send(updatedProduct);
      
    } catch (error) {
      res.status(500).send(error.message);
      console.log("Error during editing product",error.message);
    }
  }
  async delete(req, res) {
    try {
      const { productId } = req.params;
      const deletedProduct = await productModel
    .findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).send("Product not found");
      }
      fileService.delete(deletedProduct.image) 
      res.status(200).send(req.params);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteMany(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
          return console.log("No IDs provided");
        }
        const idsArray = Array.isArray(id) ? id : [id];
        const allProducts = await productModel.find({});
        const matchedProducts = allProducts.filter(product => 
          idsArray.some(id => product._id.equals(id))
        );
        if(matchedProducts.length === 0){
          return res.status(404).json({ message: 'No items found to delete' }); 
        }else{
          matchedProducts.forEach(product => {
            fileService.delete(product.image);
          });
          var result = await productModel.deleteMany({ _id: { $in: idsArray } });
        }
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'No items found to delete' });
        }
        res.status(200).json({ message: 'Items deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log("Failed to delete Many",error.message);
    }
  }
  async cleanupUnwantedDocuments(req, res) {
    try {
      await productModel
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
      await productModel
    .deleteMany({});
      res.status(200).send("All categories deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getMany(req, res) {
    try {
      const { ids } = req.query;
      if (!ids) {
        return res.status(400).send("ID lar ko'rsatilmagan");
      }
      
      const idArray = Array.isArray(ids) ? ids : ids.split(',');
      const products = await productModel.find({ _id: { $in: idArray } });
      
      if (products.length === 0) {
        return res.status(404).se
      }
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const { productId } = req.params;
      const product = await productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Mahsulot topilmadi" });
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
