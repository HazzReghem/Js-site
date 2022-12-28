// Récupération de l'id dans l'URL
const id = new URLSearchParams(document.location.search);

// Afficher l'id 
const orderId = id.get("orderId");
document.querySelector("#orderId").innerHTML +=`${orderId}`;

// Vider le local storage
localStorage.clear();