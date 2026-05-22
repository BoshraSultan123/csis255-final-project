// This code here basically generates a card that displays each plant in shop when
//  that new plant object is added to the plants list in plantinfo.js
const cardsContainer = document.getElementById("cardsContainer");
function createPlantCard(plant) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="plntName">${plant.name}</div>
        <div class="plntImg">
            <img src="${plant.image}" alt="${plant.name}">
        </div>
        <div class="plntDtls">
            <p>Price: ${plant.price.toFixed(3)} KD</p>
            <p>Needs: ${plant.sunlight}</p>
            <p>Water: ${plant.water}</p>
        </div>
        <button class="addToCart" onclick="addToCart(${JSON.stringify(plant).replace(/"/g, '&quot;')})">ADD TO CART</button>
    `;
    cardsContainer.appendChild(card);
}

function showAddedMessage() {
    const msg = document.getElementById("addedMsg");
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 2000);
}


//This calls the createPlantCard function, without it no plant cards would display
plants.forEach(function(plant) {
    createPlantCard(plant);
});

//To add selected plant to cart
function addToCart(plant) {
    fetch("/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plant)
    })
    .then(res => res.json())
    .then(data => {
        showAddedMessage();
    });
}




// To make the filter/sorting button in the shop work
// updates the plants to whatever was clicked in the filters

let activeFilters = {
    type: null,
    price: null,
    care: null
};

function filterAndRender() {
    let filtered = [...plants]; // copy the plants array

    // filter by type
    if (activeFilters.type === "indoor") {
        filtered = filtered.filter(p => p.category === "Indoor Plant");
    } else if (activeFilters.type === "outdoor") {
        filtered = filtered.filter(p => p.category === "Outdoor Plant");
    }

    // filter by care level
    if (activeFilters.care) {
        filtered = filtered.filter(p => p.careLevel.toLowerCase() === activeFilters.care);
    }

    // sort by price
    if (activeFilters.price === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (activeFilters.price === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    }

    // clear and re-render
    cardsContainer.innerHTML = "";
    filtered.forEach(plant => createPlantCard(plant));
}



// the function that will be used in the html buttons

function setFilter(type, value, btn) {
    if (activeFilters[type] === value) {
        activeFilters[type] = null;
        btn.classList.remove('active');
    } else {

        // this is the line that allows the user to only click one filter per row
        // So if INDOOR is active and you click OUTDOOR,
        //  it clears all type buttons then highlights only OUTDOOR
        document.querySelectorAll(`[onclick*="'${type}'"]`).forEach(b => b.classList.remove('active'));
        activeFilters[type] = value;
        btn.classList.add('active');
    }
    filterAndRender();
}