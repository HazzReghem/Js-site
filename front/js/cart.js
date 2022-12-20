let customerCart = JSON.parse(localStorage.getItem("product"));
console.log(customerCart);

let totalPrice = [];
let totalQuantity = [];

// Fonction d'affichage des produits dans le panier

function displayProductsInCart() {
    
    // Si le panier est vide : Erreur
    if(customerCart === null) {
        alert("Il n'y a aucun article dans votre panier !")
    }else {
        for (i = 0; i < customerCart.length; i++ ) {

          let colorChoice = customerCart[i].color;

          let quantityChoice = customerCart[i].quantity;

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
                      <p>${quantityChoice * data.price}€</p>
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

              let quantityNumber = Number(quantityChoice);
              console.log(quantityNumber)
    
              let priceNumber = Number(quantityChoice * data.price);
              console.log(priceNumber)

              totalQuantity.push(quantityNumber);
              console.log(totalQuantity)

              totalPrice.push(priceNumber);
              console.log(totalPrice)

              function displayTotals () {
                const total = (accumulator, currentValue) => accumulator + currentValue;
            
                  // Additionner les quantités totales de chaque produit du panier
                      const realTotalQuantity = totalQuantity.reduce(total, 0);
                      console.log(realTotalQuantity)
            
                  // Additionner les prix totaux de chaque produit du panier      
                      const realTotalPrice = totalPrice.reduce(total, 0);
                      console.log(realTotalPrice)
            
                      document.querySelector('#totalPrice').innerHTML += `${realTotalPrice}`;
                      document.querySelector('#totalQuantity').innerHTML += `${realTotalQuantity}`;
            }
            
            displayTotals();
            })
            
            .catch(error => {
              alert("Oops, une erreur s'est produite ! Veuillez recharger la page.")
            })
        }
    }
}
displayProductsInCart();

// function displayTotals () {
//     const total = (accumulator, currentValue) => accumulator + currentValue;

//       // Additionner les quantités totales de chaque produit du panier
//           const realTotalQuantity = totalQuantity.reduce(total, 0);
//           console.log(realTotalQuantity)

//       // Additionner les prix totaux de chaque produit du panier      
//           const realTotalPrice = totalPrice.reduce(total, 0);
//           console.log(realTotalPrice)

//           document.querySelector('#totalPrice').innerHTML += `${realTotalPrice}`;
//           document.querySelector('#totalQuantity').innerHTML += `${realTotalQuantity}`;
// }

// displayTotals();