const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "homepage", "index.html"));
});


// read form data sent from HTML formns
// app.use(express.urlencoded({ extended: false })); // only works with html
app.use(express.json());

const msgsFilePath = path.join(__dirname, "messages.json");

//Writing file:
app.post("/contact", (req, res) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#:~:text=constructing%20the%20JavaScript%20value%20or%20object%20described%20by%20the%20string.
  const obj = JSON.parse(fs.readFileSync(msgsFilePath, 'utf8'));

  const formData = {
    messageNumber: Math.floor(Math.random() * 1000000).toString(),
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    message: req.body.message
  }

  obj.push(formData);
  fs.writeFileSync(msgsFilePath, JSON.stringify(obj, null,2));
  res.json({
    success: true,
    message: "Message sent sucessfully"
  });

});


//Reading file:
// const text = fs.readFileSync(msgsFilePath);
// console.log(text)

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});