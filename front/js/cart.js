let customerCart = JSON.parse(localStorage.getItem("product"));
console.log(customerCart);


// Fonction d'affichage des produits dans le panier

function displayProductsInCart() {
    
    // Si le panier est vide : Erreur
    if(customerCart === null) {
        alert("Il n'y a aucun article dans votre panier !")
    }else {
        for (i = 0; i < customerCart.length; i++ ) {

          const colorChoice = customerCart[i].color;
          console.log(colorChoice)

          const quantityChoice = customerCart[i].quantity;
          console.log(quantityChoice)

          fetch(`http://localhost:3000/api/products/${customerCart[i].id}`)
            .then(res => res.json()
                )

            .then(data => {
              document.querySelector("#cart__items").innerHTML += 
              `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
                  <div class="cart__item__img">
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${data.name}</h2>
                      <p>${colorChoice}</p>
                      <p>${data.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityChoice}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`
            })
            
            .catch(error => {
              alert("Oops, une erreur s'est produite ! Veuillez recharger la page.")
            })

            // document.querySelector("#cart__items").innerHTML += 
            // `<article class="cart__item" data-id="${customerCart[i].id}" data-color="${customerCart[i].color}">
            //     <div class="cart__item__img">
            //       <img src="${customerCart[i].image}" alt="${customerCart[i].alt}">
            //     </div>
            //     <div class="cart__item__content">
            //       <div class="cart__item__content__description">
            //         <h2>${customerCart[i].name}</h2>
            //         <p>${customerCart[i].color}</p>
            //         <p>${customerCart[i].price}€</p>
            //       </div>
            //       <div class="cart__item__content__settings">
            //         <div class="cart__item__content__settings__quantity">
            //           <p>Qté : </p>
            //           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${customerCart[i].quantity}">
            //         </div>
            //         <div class="cart__item__content__settings__delete">
            //           <p class="deleteItem">Supprimer</p>
            //         </div>
            //       </div>
            //     </div>
            //   </article>`
        }
    }
}

displayProductsInCart();