const plants = [
    // Indoor Plants
    {
        name: "Snake Plant",
        category: "Indoor Plant",
        careLevel: "Medium",
        price: 6.000,
        sunlight: "Low to bright indirect light",
        water: "Every 2 weeks",
        image: "/assets/plants/snake-plant.jpeg",
        inStock: true
    },
    {
        name: "Monstera",
        category: "Indoor Plant",
        careLevel: "Hard",
        price: 9.500,
        sunlight: "Bright indirect light",
        water: "Once a week",
        image: "/assets/plants/monstera-plant.jpeg",
        inStock: true
    },
    {
        name: "Peace Lily",
        category: "Indoor Plant",
        careLevel: "Medium",
        price: 7.250,
        sunlight: "Low to medium indirect light",
        water: "Once a week",
        image: "/assets/plants/peace-lilly.jpeg",
        inStock: true
    },

    // Outdoor Plants
    {
        name: "Lavender",
        category: "Outdoor Plant",
        careLevel: "Easy",
        price: 4.750,
        sunlight: "Full sun",
        water: "When soil feels dry",
        image: "/assets/plants/lavender.jpeg",
        inStock: true
    },
    {
        name: "Hibiscus",
        category: "Outdoor Plant",
        careLevel: "Hard",
        price: 8.000,
        sunlight: "Full sun",
        water: "Regular watering",
        image: "/assets/plants/hibiscus.jpeg",
        inStock: true
    },
    {
        name: "Rosemary",
        category: "Outdoor Plant",
        careLevel: "Easy",
        price: 3.500,
        sunlight: "Full sun",
        water: "When soil feels dry",
        image: "/assets/plants/rosemary.jpeg",
        inStock: true
    },

    // Succulents & Cacti
    {
        name: "Aloe Vera",
        category: "Succulent",
        careLevel: "Easy",
        price: 4.500,
        sunlight: "Bright indirect light",
        water: "Every 2-3 weeks",
        image: "/assets/plants/Aloe-Vera.jpeg",
        inStock: true
    },
    {
        name: "Echeveria",
        category: "Succulent",
        careLevel: "Medium",
        price: 3.750,
        sunlight: "Bright light",
        water: "Every 2 weeks",
        image: "/assets/plants/echeveria.jpeg",
        inStock: true
    },
    {
        name: "Golden Barrel Cactus",
        category: "Cactus",
        careLevel: "Easy",
        price: 5.250,
        sunlight: "Full sun",
        water: "Every 3-4 weeks",
        image: "/assets/plants/golden-barrel-cactus.jpeg",
        inStock: true
    },
    {
        name: "Spider Plant",
        category: "Indoor Plant",
        careLevel: "Easy",
        price: 3.500,
        sunlight: "Bright indirect light",
        water: "Every 1-2 weeks",
        image: "/assets/plants/spiderPlant.png",
        inStock: true
    }
];

// This code here basically generates a card that displays each plant in shop when
//  that new plant object is added to the plants list above
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
            <p> Price: ${plant.price.toFixed(3)} KD</p>
            <p> Needs: ${plant.sunlight}</p>
            <p> Water ${plant.water}</p>
        </div>
        <button class="addToCart">ADD TO CART</button>
    `;
    cardsContainer.appendChild(card);
}

plants.forEach(function (plant) {
    createPlantCard(plant);
});





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