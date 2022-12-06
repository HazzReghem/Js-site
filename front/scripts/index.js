fetch('http://localhost:3000/api/products')
// Promesse qui récupère la réponse et la converti en Json
    .then(res =>
        res.json()
    )

    .then(data => {
        displayProducts(data)

        // FONCTION DAFFICHAGE DES PRODUITS

        function displayProducts(data) {

        // Boucle for pour affichage dynamique

            for (product of data) {
                let products = document.querySelector('#items').innerHTML +=
                `<a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`;
            }
        }
    })
    
    .catch(error => {
        alert("Oops, une erreur s'est produite ! Veuillez recharger la page.")
    })
