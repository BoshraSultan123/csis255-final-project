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

//Writing file (forms with messages FROM contactus.html) :
app.post("/contact", (req, res) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#:~:text=constructing%20the%20JavaScript%20value%20or%20object%20described%20by%20the%20string.
  const objArray = JSON.parse(fs.readFileSync(msgsFilePath, 'utf8'));
  let newMsgNo;

  do { newMsgNo = Math.floor(Math.random() * 1000000).toString();
  } while (objArray.some(obj => obj.messageNumber === newMsgNo)); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

  const formData = {
    messageNumber: newMsgNo,
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    message: req.body.message
  }

  objArray.push(formData);

  fs.writeFileSync(msgsFilePath, JSON.stringify(obj, null, 2));
  // cant send js object through HTTP without converting to json text, then parse into js object on client side using response.json()
  res.json({
    success: true,
    message: "Message sent sucessfully"
  });

});



// Cart 
// GET cart items
app.get("/cart", function (req, res) {
    res.json(cart);
});

// POST (to add item to cart)
app.post("/cart", function (req, res) {
    const plant = req.body;
    const existing = cart.find(item => item.name === plant.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...plant, quantity: 1 });
    }
    res.json(cart);
});


// DELETE (to remove item from cart)
app.delete("/cart/:name", function (req, res) {
    const name = req.params.name;
    cart = cart.filter(item => item.name !== name);
    res.json(cart);
});

// POST (clears cart)
app.post("/cart/checkout", function (req, res) {
    cart = [];
    res.json({ success: true });
});

// PUT (to update item quantity)
app.put("/cart/:name", function (req, res) {
    const name = req.params.name;
    const { direction } = req.body;
    const item = cart.find(item => item.name === name);
    if (item) {
        if (direction === "plus") {
            item.quantity += 1;
        } else if (direction === "minus") {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(i => i.name !== name);
            }
        }
    }
    res.json(cart);
});




app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});