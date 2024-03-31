const Chats = require("../modals/chats");


exports.getHome = (req, res, next) => {
  res.render("index", { title: "CHAT | HOME" });
}

exports.postChat = async (req, res, next) => {
  const { id, username, phone, email } = req.body;
  try {
    await Chats.create({ id, username, phone, email });
  } catch (e) {
    console.log(e);
  }
}

exports.getChat =  async (req, res, next) => {
  try {
    const data = await Chats.findAll();
    res.json(data);
  } catch (e) {
    console.log(e);
  }
}

exports.deleteChat = async (req, res, next) => {
  const chatId = req.params.chatId;
  console.log("chatId", chatId);
  try {
    await Chats.destroy({
      where: {
        id: chatId,
      },
    });
  } catch (e) {
    console.log(e);
  }
}