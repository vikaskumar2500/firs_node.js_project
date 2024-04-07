const ReturnBooks = require("../modals/return-books");
const Books = require("../modals/books");

exports.homeController = async (req, res, next) => {
  try {
    const books = await Books.findAll();
    const returnBooks = await ReturnBooks.findAll();

    console.log("return books", returnBooks);
    res.render("home", {
      pageTitle: "Home",
      path: "/",
      formsCSS: true,
      productCSS: true,
      books: books,
      returnBooks: returnBooks,
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
  const bookId = req.body.bookId;
  const fine = req.body.fine;
  try {
    await ReturnBooks.create({ name, fine, bookId });
    await Books.destroy({ where: { id: bookId } });
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
};
