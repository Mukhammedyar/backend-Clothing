const outerwearModel = require("../models/outerwear.model");
const underwearModel = require("../models/underwear.model");

const logProductById = async (req, res, next) => {
    try {
      const product = await outerwearModel.findOne(req.params.productId);
        
      if (!product) {
        console.log(`Product with productId ${productId} not found`);
        return res.status(404).send("Product not found");
      }
  
      const underWears = await outerwearModel.find()
    //   console.log('underWear found:', underWears);
    underWears.forEach(wear => {
        console.log(`Underwear with productId ${wear.complect1}`);
    })
      next();
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).send(error.message);
    }
  };
  
  module.exports = logProductById;