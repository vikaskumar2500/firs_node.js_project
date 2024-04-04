const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const Books = require("./modals/books");
const ReturnBooks = require("./modals/return-books");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);

app.use(errorController.get404);

ReturnBooks.belongsTo(Books, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Books.hasOne(ReturnBooks);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((e) => console.log(e));
