function loadCart() {
    fetch("/cart")
        .then(res => res.json())
        .then(cart => {
            renderCart(cart);
        });
}

function renderCart(cart) {
    const container = document.getElementById("cartItemsContainer");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p class="emptyCart">Your cart is empty.</p>`;
        document.getElementById("cartTotal").textContent = "0.000 KD";
        return;
    }

    let total = 0;

    // A new div gets created for each cart item (sort of same idea as plant cards) 
    cart.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement("div");
        row.classList.add("cartItem");
        row.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cartItemImg">
    <div class="cartItemInfo">
        <p class="cartItemName">${item.name}</p>
        <p class="cartItemPrice">${item.price.toFixed(3)} KD</p>
    </div>
    <div class="quantityControls">
<button class="qtyBtn" onclick="updateQuantity('${item.name}', 'minus')">-</button>
<span class="qtyDisplay">${item.quantity}</span>
<button class="qtyBtn" onclick="updateQuantity('${item.name}', 'plus')">+</button>
    </div>
    <p class="cartItemSubtotal">${(item.price * item.quantity).toFixed(3)} KD</p>
    <button class="removeBtn" onclick="removeItem('${item.name}')">✕</button>
`;
        container.appendChild(row);
    });

    document.getElementById("cartTotal").textContent = total.toFixed(3) + " KD";
}

function removeItem(name) {
    fetch(`/cart/${encodeURIComponent(name)}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(cart => renderCart(cart));
}

function completePurchase() {
    fetch("/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            renderCart([]);
            document.getElementById("thankYouPopup").classList.remove("hidden");
        }
    });
}

function closePopup() {
    document.getElementById("thankYouPopup").classList.add("hidden");
}


function updateQuantity(name, direction) {
    fetch("/cart/" + name, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction: direction })
    })
    .then(res => res.json())
    .then(cart => renderCart(cart));
}

loadCart();