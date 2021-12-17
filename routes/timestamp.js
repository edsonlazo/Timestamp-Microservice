const express = require("express");
const router = express.Router();

router.get("/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

router.get("/:date?", function (req, res) {
  try {
    let date = req.params.date ?? new Date();
    date = convertToDate(date);
    if (!isValidDate(date)) {
      throw new Error("Invalid date");
    }
    let unixDate = getUnixFromDate(date);
    let formattedDate = getFormattedStringFromDate(date);
    res.json({ unix: unixDate, utc: formattedDate });
  } catch (e) {
    res.status(400).json({ error: "Invalid Date" });
  }
});

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function convertToDate(date) {
  let parsedDate = new Date(date);
  return !isValidDate(parsedDate) ? new Date(Number(date)) : parsedDate;
}

function getUnixFromDate(date) {
  return +new Date(date);
}

function getFormattedStringFromDate(date) {
  let dateString = new Date(date);
  return dateString.toUTCString();
}

module.exports = router;
