const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// product routes
router.get("/get-all", productController.getAll);
router.get("/get-many", productController.getMany);
router.get("/get-one/:productId", productController.getOne);
router.post("/create", productController.create);
router.put("/edit/:productId", productController.edit);
router.delete("/delete-one/:productId", productController.delete);
router.delete('/delete-many', productController.deleteMany);
router.delete("/cleanup", productController.cleanupUnwantedDocuments);
router.delete("/delete-all", productController.deleteAll);

module.exports = router;
