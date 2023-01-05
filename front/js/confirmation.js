// Récupération de l'id dans l'URL
const id = new URLSearchParams(document.location.search);

// Afficher l'id 
const orderId = id.get("orderId");
document.querySelector("#orderId").textContent +=`${orderId}`;

// Vider le local storage
localStorage.clear();