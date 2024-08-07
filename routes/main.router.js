const express = require("express");

const router = express.Router();

// product routes
router.get("/", (req, res)=> {
    res.send("clothing backend")
});

module.exports = router;