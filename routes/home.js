const express = require("express");
const router = express.Router();
const home = require("../controllers/home");


router.post("/add-book", home.postAddBooks);
router.post("/add-return-books", home.postReturnBooks);
router.get("/", home.homeController);

module.exports = router;
