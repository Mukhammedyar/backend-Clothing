const express = require("express");
const shoesController = require("../controllers/shoesController");

const router = express.Router();

// product routes
router.get("/get-all", shoesController.getAll);
router.post("/create", shoesController.create);
router.put("/edit/:productId", shoesController.edit);
router.delete("/delete-one/:productId", shoesController.delete);
router.delete("/cleanup", shoesController.cleanupUnwantedDocuments);
router.delete("/delete-all", shoesController.deleteAll);

module.exports = router;