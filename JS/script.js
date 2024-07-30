// Traer productos desde el archivo JSON y mostrarlos
fetch("JSON/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  })
  .catch((error) => console.error("Error al traer productos", error));

// Iniciar un array de productos vacío
let products = [];

// Iniciar el carrito desde el localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Mostrar todos los productos provenientes del array de productos. También se muestra el botón para agregar un producto el carrito
function displayProducts(productsToDisplay) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";
  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${
              product.id
            }">Agregar al carrito</button>
        `;
    productContainer.appendChild(productDiv);
  });

  // Agregar EventListener al botón de 'Agregar al carrito'
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      addToCart(parseInt(event.target.dataset.id));
    });
  });
}

// Añadir un producto al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  displayCart();
}

// Mostrar los productos en el carrito y el precio total. También se muestra el botón para quitar un producto del carrito
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)} x 
                <input type="number" value="${
                  item.quantity
                }" min="1" data-id="${item.id}" class="update-quantity">
            </p>
            <button class="remove-from-cart" data-id="${
              item.id
            }">Quitar</button>
        `;
    cartContainer.appendChild(cartItemDiv);
  });
  cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;

  // Agrega Event Listener al botón para quitar un producto del carrito
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      removeFromCart(parseInt(event.target.dataset.id));
    });
  });
  // Agrega Event Listeners a los inputs de cantidad
  document.querySelectorAll(".update-quantity").forEach((input) => {
    input.addEventListener("change", (event) => {
      updateCartItemQuantity(
        parseInt(event.target.dataset.id, 10),
        event.target.value
      );
    });
  });
}

// Sacar un producto del carrito o disminuir sus unidades
function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex((item) => item.id === productId);
  if (cart[cartItemIndex].quantity > 1) {
    cart[cartItemIndex].quantity--;
  } else {
    cart.splice(cartItemIndex, 1);
  }
  saveCart();
  displayCart();
}

// Actualizar la cantidad de un producto del carrito
function updateCartItemQuantity(productId, quantity) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = parseInt(quantity);
    saveCart();
    displayCart();
  }
}

// Guardar el carrito en el LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Borrar todos los items en el carrito
function clearCart() {
  cart = [];
  saveCart();
  displayCart();
}

// Gestionar el checkout
function handleCheckout(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const card = document.getElementById("card").value;
  if (name && address && card) {
    alert("¡La orden fue realizada con éxito, gracias por su compra!");
    cart = [];
    saveCart();
    displayCart();
    document.getElementById("checkout-form").reset();
  } else {
    alert("Por favor llenar todos los campos");
  }
}

// Filtrar los productos a traves de la barra de búsqueda
function filterProducts() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
}

// Filtrar los productos con los botones de categorías
function filterByCategory(category) {
  if (category === "Todos") {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    displayProducts(filteredProducts);
  }
}
// Agregar Event Listeners a los botones de categorías
document
  .getElementById("Todos")
  .addEventListener("click", () => filterByCategory("Todos"));
document
  .getElementById("Proteinas")
  .addEventListener("click", () => filterByCategory("Proteinas"));
document
  .getElementById("Creatinas")
  .addEventListener("click", () => filterByCategory("Creatinas"));

// Agregar Event Listeners a la barra de búsqueda
document.getElementById("search-bar").addEventListener("input", filterProducts);

// Agregar Event Listeners para confirmar el checkout
document
  .getElementById("checkout-form")
  .addEventListener("submit", handleCheckout);

// Agrega Event Listener al botón de 'Vaciar carrito'
document.getElementById("clear-cart").addEventListener("click", clearCart);

// Mostrar los productos del carrito al cargar la página
displayCart();
