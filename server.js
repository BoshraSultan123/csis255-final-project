// self explanatory, Stores items in cart
let cart = [];

// server  
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "homepage", "index.html"));
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
