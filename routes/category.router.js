const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/get-all", categoryController.getAll);
router.post("/create", categoryController.createCategory);
router.delete("/delete-one/:categoryId", categoryController.createCategory);
router.delete("/cleanup", categoryController.cleanupUnwantedDocuments);
router.delete("/delete-all", categoryController.deleteAll);

module.exports = router;
