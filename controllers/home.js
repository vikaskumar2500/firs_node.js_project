const ReturnBooks = require("../modals/return-books");
const Books = require("../modals/books");

exports.homeController = async (req, res, next) => {
  try {
    const books = await Books.findAll({ include: ReturnBooks });
    const returnBooks = books
      .map((book) => {
        if (book.returnBook !== null) return book.returnBook;
        else return null;
      })
      .filter((b) => b !== null);

    console.log("return books", returnBooks);
    res.render("home", {
      pageTitle: "Home",
      path: "/",
      formsCSS: true,
      productCSS: true,
      books: books,
      returnBooks,
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
  console.log(name, fine);
  try {
    await ReturnBooks.create({ name, fine, bookId });
    await Books.destroy({ where: { id: bookId } });
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
};
