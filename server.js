const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "homepage", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});