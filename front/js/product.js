// Déclaration des variables nécessaires au produit
let image = document.querySelector(".item__img");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let color = document.querySelector("#colors");

// Récupérer chaîne de requête dans l'URL (ce qui apparaît après "?")
const queryString_url_id = document.location.search;

// Extraire ID produit
const urlSeachParams = new URLSearchParams(queryString_url_id);
const productId = urlSeachParams.get("id");
console.log(productId);

// let selectedProduct = fetch('http://localhost:3000/api/products'+productId);
// console.log(selectedProduct);

// Fonction affichage du produit
function displaySelectedProduct(){

    fetch('http://localhost:3000/api/products' + productId)
        .then(response => 
                response.json()
            )

        .then(data => {
            image.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            imageUrl = `${data.imageUrl}`;
            altTxt = `${data.altTxt}`;
            title.innerHTML += `<h1 id="title">${data.name}</h1>`;
            price.innerHTML += `<p>Prix : <span id="price">${data.price}</span>€</p>`;
            description.innerHTML += `<p id="description">${data.description}</p>`
        })
};
