// Déclaration des variables nécessaires au produit
let image = document.querySelector(".item__img");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let color = document.querySelector("#colors");
let quantity = document.querySelector('#quantity');
let addToCart = document.querySelector('#addToCart');


// Récupérer chaîne de requête dans l'URL (ce qui apparaît après "?")
const queryString_url_id = document.location.search;

// Extraire ID produit
const urlSeachParams = new URLSearchParams(queryString_url_id);
const productId = urlSeachParams.get("id");

//--------------FONCTION DAFFICHAGE DU PRODUIT--------------------
function displaySelectedProduct(){

    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => 
                response.json()
            )

        .then(data => {
            image.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            imageUrl = `${data.imageUrl}`;
            altTxt = `${data.altTxt}`;
            title.innerHTML += `<h1 id="title">${data.name}</h1>`;
            price.innerHTML += `<span id="price">${data.price}</span>`;
            description.innerHTML += `<p id="description">${data.description}</p>`;

            // Boucle des couleurs
            for (i = 0; i < data.colors.length; i++){
                color.innerHTML += `
                <option value="${data.colors[i]}">${data.colors[i]}</option>
                `
            }
        })

        // Message en cas d'erreur
    .catch(error => {
        alert("Oops, une erreur s'est produite ! Veuillez recharger la page.")
})}

// Appel de la fonction
displaySelectedProduct()


//--------------------FONCTION STOCKAGE DU PRODUIT DANS LOCAL STORAGE------------------
function addProductToLocalStorage(){
    
    // Ecouter bouton Ajouter au Panier
    addToCart.addEventListener("click", (btn)=>{
        btn.preventDefault(btn);

        // Si quantité d'article n'est pas entre 1 et 100 ET aucune couleur de choisie : Erreur
        if (quantity.value < 1 || quantity.value > 100 && color.value === "" ){
            alert("Veuillez selectionner une couleur et indiquer une quantité d'article(s) comprise entre 1 et 100 !");

        // Ou si aucune couleur de selectionnée : Erreur
        } else if (color.value === "" ){
            alert("Veuillez selectionner une couleur pour votre article !");

        // Ou si quantité d'article n'est pas entre 1 et 100 : Erreur
        } else if (quantity.value < 1 || quantity.value > 100){
            alert("Veuillez indiquer une quantité d'article(s) comprise entre 1 et 100 !");

        // Sinon (tout est OK) : envoyer les données vers le Local Storage
        } else {
            alert(`Vous avez ajouté ${quantity.value} ${title.textContent} ${color.value} à votre panier. Cliquez sur "OK" pour consulter votre panier !`);
            window.location.href = "cart.html";

        // Données à enregistrer dans le Local Storage
            const customerSelection = {
                id: productId,
                image: imageUrl, 
                alt: altTxt,
                color: color.value,
                quantity: quantity.value,
                name: title.textContent,
            };

        // Récupérer donnée du Local Storage
            let customerCart = JSON.parse(localStorage.getItem("product"));

        // Si le panier est vide : on "push" les données customerSelection sous forme de tableau
            if (customerCart == null) {
                customerCart = [];
                customerCart.push(customerSelection);
                localStorage.setItem("product", JSON.stringify(customerCart));

        // Si le panier n'est pas vide
            }else {
        // Constante si le produit est déjà dans le panier (trouver par ID  et couleur)
        const alreadyInCart = customerCart.find(element => element.id == customerSelection.id && element.color == customerSelection.color);

        // Si produit n'est pas dnas le panier : Push les données
                if (alreadyInCart == undefined) {
                    customerCart.push(customerSelection);
                    localStorage.setItem("product", JSON.stringify(customerCart));
        
        // Sinon : incrémenter la quantité
                }else {
                    let newProductQuantityInCart = parseInt(customerSelection.quantity) + parseInt(alreadyInCart.quantity);
                    alreadyInCart.quantity = newProductQuantityInCart;
                    // localStorage.setItem("product", JSON.stringify(customerCart));
                    if (alreadyInCart.quantity > 100) {
                        alert("Votre quantité d'article dépasse la limite autorisée de 100 articles. Veuillez ajuster la quantité entre 1 et 100 articles directement dans votre panier !");
                    }
                    else if (alreadyInCart.quantity <= 100)
                    localStorage.setItem("product", JSON.stringify(customerCart));
                }
            }
        }
    }) 
}

// Appel de la fonction
addProductToLocalStorage();

