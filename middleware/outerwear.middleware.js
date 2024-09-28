const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");

const countProducts = async (req, res) => {
    try {
      const product = await productModel.find(req.params.productId);
      const category = await categoryModel.find(req.params.productId);
        
      if (!product) {
        console.log(`Product with productId ${productId} not found`);
        return res.status(404).send("Product not found");
      }
      let count = 0;
      category.map(c => {
        const filteredProduct = product.filter(product => product.categoryType.toLowerCase() === c.name.toLowerCase());
        count = filteredProduct.length
        c.count = count;
      })
      res.status(200).json(category)
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).send(error.message);
    }
  };
  
  module.exports = countProducts;