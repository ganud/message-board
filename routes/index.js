const express = require("express");
const router = express.Router();

const pool = require("../db/pool");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const messages = await pool.query("SELECT * FROM messages;");
  res.render("index", { messages: messages.rows, title: "Message Board" });
});

/* GET home page. */
router.get("/messages/:id", async (req, res, next) => {
  const message = await pool.query(
    `SELECT * FROM messages WHERE id = ${req.params.id};`
  );
  console.log(message.rows);
  res.render("message", { message: message.rows[0], title: "Message Board" });
});

router.get("/new", (req, res, next) => {
  res.render("form", { title: "Add a message" });
});

router.post("/new", async (req, res, next) => {
  await pool.query(
    `INSERT INTO messages (username, value, date) VALUES ('${
      req.body.author
    }', '${req.body.message}', '${new Date().toLocaleString("en-US", {
      timeZoneName: "short",
      timeZone: "UTC",
    })}');`
  );

  res.redirect("/");
});

module.exports = router;
