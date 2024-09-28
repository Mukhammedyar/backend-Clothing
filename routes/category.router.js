const express = require("express");
const categoryController = require("../controllers/categoryController");
const countProducts = require("../middleware/outerwear.middleware");

const router = express.Router();

router.get("/get-all",countProducts, categoryController.getAll);
router.post("/create", categoryController.createCategory);
router.delete("/delete-one/:categoryId", categoryController.createCategory);
router.delete("/cleanup", categoryController.cleanupUnwantedDocuments);
router.delete('/delete-many', categoryController.deleteManyCategory);
router.delete("/delete-all", categoryController.deleteAll);

module.exports = router;
