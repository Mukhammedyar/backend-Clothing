const express = require("express");
const outerWearController = require("../controllers/outerWear.controller");
const logProductById = require("../middleware/outerwear.middleware");

const router = express.Router();

// product routes
router.get("/get-all", outerWearController.getAll);
router.get("/get/:productid", logProductById, outerWearController.getByProductId);
router.post("/create", outerWearController.create);
router.put("/edit/:productId", outerWearController.edit);
router.delete("/delete-one/:productId", outerWearController.delete);
router.delete("/cleanup", outerWearController.cleanupUnwantedDocuments);
router.delete("/delete-all", outerWearController.deleteAll);

module.exports = router;
