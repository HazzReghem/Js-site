let customerCart = JSON.parse(localStorage.getItem("product"));
console.log(customerCart);

let totalPrice = [];
let totalQuantity = [];

//--------------------------FONCTION DAFFICHAGE DES PRODUITS DANS LE PANIER----------------------------

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
            })
            
            .catch(error => {
              alert("Oops, une erreur s'est produite ! Veuillez recharger la page.")
            })
        }
    }
}
displayProductsInCart();

// --------------FONCTION DAFFICHAGE PRIX ET QUANTITE TOTAUX--------------------------------

function displayTotals () {

  if(customerCart === null) {
    alert("Il n'y a aucun article dans votre panier !")
  }else {
    for (j = 0; j < customerCart.length && j < 1; j++ ){

      fetch(`http://localhost:3000/api/products/${customerCart[j].id}`)
        .then(res => res.json ()
        )

        .then (data => {
          const total = (accumulator, currentValue) => accumulator + currentValue;

      // Additionner les quantités totales de chaque produit du panier
          const realTotalQuantity = totalQuantity.reduce(total, 0);
          console.log(realTotalQuantity)

      // Additionner les prix totaux de chaque produit du panier      
          const realTotalPrice = totalPrice.reduce(total, 0);
          console.log(realTotalPrice)

          document.querySelector('#totalPrice').innerHTML += `${realTotalPrice}`;
          document.querySelector('#totalQuantity').innerHTML += `${realTotalQuantity}`;
        })
    }
  }
}
displayTotals();

// -------------------------FONCTION MODIFICATION QUANTITE DARTICLE DANS LE PANIER---------------------

function quantityModifier() {
  let newQuantity = document.querySelectorAll(".itemQuantity");

  for (k = 0; k < newQuantity.length; k++) {
    const modifyQuantity = newQuantity[k];

    // Ecouter bouton pour modifier la quantité
    modifyQuantity.addEventListener("change", (event) => {
      event.preventDefault(event);

      // Si quantité n'est pas entre 1 et 100 : ERROR ! 
      if (modifyQuantity.value < 1 || modifyQuantity.value > 100){
        alert("Veuillez indiquer une quantité d'article(s) comprise entre 1 et 100 !")
      // Sinon : OK !
      }else {
        newQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${event.target.value}">`;

        customerCart[k].quantity = Number(modifyQuantity.value);

        localStorage.setItem("product", JSON.stringify(customerCart));
        // Message d'alerte puis reload automatique de la page
        alert("Le nombre d'article(s) a bien été mis à jour dans votre panier!");
        window.location.reload();
      }
    })
  }
}
quantityModifier();

// -----------------------FONCTION GESTION DE LA COMMANDE-------------------------

// Déclaration des REGEX
let REGEXText = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
let REGEXAddress = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]{3,30}$/;
let REGEXEmail = /^(([a-zA-z0-9])+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

// Écoute du prénom
firstName.addEventListener("input", validFirstName) 
    function validFirstName() {
        if (REGEXText.test(firstName.value) == false) {
            firstNameErrorMsg.innerHTML = "Un minimum de 3 lettres est requis, les caractères spéciaux ainsi que les chiffres ne sont pas acceptés !";
            return false;
        } else {
            firstNameErrorMsg.innerHTML = "";
            return true;
        }
    }

// Écoute du nom
lastName.addEventListener("input", validLastName)
    function validLastName() {
        if (REGEXText.test(lastName.value) == false) {
            lastNameErrorMsg.innerHTML = "Un minimum de 3 lettres est requis, les caractères spéciaux ainsi que les chiffres ne sont pas acceptés !";
            return false;
        } else {
            lastNameErrorMsg.innerHTML = "";
            return true;
        }
    }

// Écoute de l'addresse
address.addEventListener("input", validAddress) 
    function validAddress() {
        if (REGEXAddress.test(address.value) == false) {
            addressErrorMsg.innerHTML = "Un numéro de l'adresse doit comporter 1 à 3 chiffres, et être le nom de la rue !";
            return false;
        } else {
            addressErrorMsg.innerHTML = "";
            return true;
        }
    }

// Écoute de la ville
city.addEventListener("input", validCity)
    function validCity() {
        if (REGEXText.test(city.value) == false) {
            cityErrorMsg.innerHTML = "Un minimum de 3 lettres est requis, les caractères spéciaux ainsi que les chiffres ne sont pas acceptés !";
            return false;
        } else {
            cityErrorMsg.innerHTML = "";
            return true;
        }
    }

// Écoute de l'email
email.addEventListener("input", validEmail)
    function validEmail() {
        if (REGEXEmail.test(email.value) == false) {
            emailErrorMsg.innerHTML = "Veuillez renseigner une adresse e-mail valide. Exemple : prenom.nom@exemple.fr ou nomprenom@exemple.com";
            return false;
        } else {
            emailErrorMsg.innerHTML = "";
            return true;
        }
    }
