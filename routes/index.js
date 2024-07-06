var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: messages });
});

router.get("/new", function (req, res, next) {
  res.render("form", { title: "Express" });
});

router.post("/new", function (req, res, next) {
  messages.push({
    text: req.body.message,
    user: req.body.author,
    added: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
  });
  res.redirect("/");
});

module.exports = router;
