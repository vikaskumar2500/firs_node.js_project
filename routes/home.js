const express = require("express");
const router = express.Router();
const home = require("../controllers/home");

router.post("/add-return-book", home.postReturnBooks);
router.post("/add-book", home.postAddBooks);
router.get("/", home.homeController);

module.exports = router;
