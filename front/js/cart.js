let customerCart = JSON.parse(localStorage.getItem("product"));
console.log(customerCart);

// Fonction d'affichage des produits dans le panier

function displayProductsInCart() {
    
    // Si le panier est vide : Erreur
    if(customerCart === null) {
        alert("Il n'y a aucun article dans votre panier !")
    }else {
        for (i = 0; i < customerCart.length; i++ ) {
            document.querySelector("#cart__items").innerHTML += 
            `<article class="cart__item" data-id="${customerCart[i].id}" data-color="${customerCart[i].color}">
                <div class="cart__item__img">
                  <img src="${customerCart[i].image}" alt="${customerCart[i].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${customerCart[i].name}</h2>
                    <p>${customerCart[i].color}</p>
                    <p>${customerCart[i].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${customerCart[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        }
    }
}

displayProductsInCart();