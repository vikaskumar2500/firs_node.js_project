const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/db");
const Users = require("./modals/users");
const Product = require("./modals/product");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(Users);
Users.hasMany(Product);

sequelize
  .sync()
  .then(async (db) => {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS product (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        imageUrl TEXT,
        description TEXT,
        price INT
      );
    `);

    app.listen(3000);
  })
  .catch((e) => console.log(e));
