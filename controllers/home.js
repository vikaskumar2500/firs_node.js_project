const ReturnBooks = require("../modals/return-books");
const Books = require("../modals/books");

exports.homeController = async (req, res, next) => {
  try {
    const books = await Books.findAll({include:ReturnBooks});
    console.log(books[0]);
    res.render("home", {
      pageTitle: "Home",
      path: "/",
      formsCSS: true,
      productCSS: true,
      books: books,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.postAddBooks = async (req, res, next) => {
  const name = req.body.name;
  console.log("name", name);
  try {
    await Books.create({ name });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

exports.postReturnBooks = async (req, res, next) => {
  const name = req.body.name;
  const fine = req.body.fine;
  try {
    await ReturnBooks.create({ name, fine });
  } catch (e) {
    console.log(e);
  }
};
