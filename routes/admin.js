const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/delete/:productId", adminController.postDeleteProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product/:productId", adminController.postEditProduct);

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
