const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "carts.json"
);

module.exports = class Cart {
  static addToCart(id, productPrice) {
    fs.readFile(p, (e, cartContent) => {
      console.log("Error", e);
      let carts = { products: [], totalPrice: 0 };
      if (!e) {
        carts = JSON.parse(cartContent);
      }

      const existingProduct = carts.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        // updateProduct = { ...existingProduct };
        existingProduct.qty = existingProduct.qty + 1;
      } else {
        carts.products = [...carts.products, { id, qty: 1 }];
      }

      carts.totalPrice = carts.totalPrice + +productPrice;

      console.log("carts", carts);

      fs.writeFile(p, JSON.stringify(carts), (e) => {
        console.log("Error", e);
      });
    });
  }

  static deleteFromCart(id, productPrice) {
    fs.readFile(p, (e, data) => {
      let carts = { products: [], totalPrice: 0 };
      if (!e) {
        carts = JSON.parse(data);
      }

      carts.products = carts.products.filter((product) => product.id === id);
      carts.totalPrice =
        carts.totalPrice > productPrice ? carts.totalPrice - productPrice : 0;

      fs.writeFile(p, carts, (e) => {
        console.log(e);
      });
    });
  }
};
