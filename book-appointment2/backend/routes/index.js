var express = require("express");
const Chats = require("../modals/chats");
const { getHome, deleteChat, getChat, postChat } = require("../controllers");
var router = express.Router();

/* GET home page. */
router.get("/", getHome);

router.post("/chat", postChat);

router.get("/chat", getChat);

router.post("/chat/delete/:chatId", deleteChat);

module.exports = router;
