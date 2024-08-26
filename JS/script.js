// Traer productos desde el archivo JSON y mostrarlos
async function fetchProducts() {
  try {
    const response = await fetch("JSON/products.json");
    if (!response.ok) {
      throw new Error("Error al traer productos: " + response.statusText);
    }
    const data = await response.json();
    products = data;
    displayProducts(products);
  } catch (error) {
    console.error("Error al traer productos:", error);
    displayError(
      "No se pudieron cargar los productos. Por favor, intente nuevamente más tarde."
    );
  }
}

// Iniciar un array de productos vacío
let products = [];

// Iniciar el carrito desde el localStorage
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (error) {
  console.error("Error al cargar el carrito del localStorage:", error);
  displayError(
    "Hubo un problema al cargar el carrito. Por favor, intente nuevamente."
  );
}

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
      try {
        addToCart(parseInt(event.target.dataset.id));
      } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        alert("Hubo un problema al agregar el producto al carrito.");
      }
    });
  });
}

// Añadir un producto al carrito
function addToCart(productId) {
  try {
    const product = findProductById(products, productId);
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    displayCart();
  } catch (error) {
    console.error("Error al añadir un producto al carrito:", error);
    alert("Hubo un problema al añadir el producto al carrito.");
  }
}

// Mostrar los productos en el carrito y el precio total. También se muestra el botón para quitar un producto del carrito
function displayCart() {
  try {
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
        try {
          removeFromCart(parseInt(event.target.dataset.id));
        } catch (error) {
          console.error("Error al quitar un producto del carrito:", error);
          alert("Hubo un problema al quitar el producto del carrito.");
        }
      });
    });

    // Agrega Event Listeners a los inputs de cantidad
    document.querySelectorAll(".update-quantity").forEach((input) => {
      input.addEventListener("change", (event) => {
        try {
          updateCartItemQuantity(
            parseInt(event.target.dataset.id, 10),
            event.target.value
          );
        } catch (error) {
          console.error("Error al actualizar la cantidad del producto:", error);
          alert("Hubo un problema al actualizar la cantidad del producto.");
        }
      });
    });
  } catch (error) {
    console.error("Error al mostrar los productos del carrito:", error);
    displayError(
      "Hubo un problema al mostrar el carrito. Por favor, intente nuevamente."
    );
  }
}

// Sacar un producto del carrito o disminuir sus unidades
function removeFromCart(productId) {
  try {
    const cartItemIndex = cart.findIndex((item) => item.id === productId);
    if (cartItemIndex === -1)
      throw new Error("Producto no encontrado en el carrito");

    if (cart[cartItemIndex].quantity > 1) {
      cart[cartItemIndex].quantity--;
    } else {
      cart.splice(cartItemIndex, 1);
    }
    saveCart();
    displayCart();
  } catch (error) {
    console.error("Error al quitar un producto del carrito:", error);
    alert("Hubo un problema al quitar un producto del carrito.");
  }
}

// Actualizar la cantidad de un producto del carrito
function updateCartItemQuantity(productId, quantity) {
  try {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) throw new Error("Producto no encontrado en el carrito");

    cartItem.quantity = parseInt(quantity);
    saveCart();
    displayCart();
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto:", error);
    alert("Hubo un problema al actualizar la cantidad del producto.");
  }
}

// Guardar el carrito en el LocalStorage
function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
    alert(
      "Hubo un problema al guardar el carrito. Por favor, intente nuevamente."
    );
  }
}

// Borrar todos los items en el carrito
function clearCart() {
  try {
    cart = [];
    saveCart();
    displayCart();
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    alert(
      "Hubo un problema al vaciar el carrito. Por favor, intente nuevamente."
    );
  }
}

// Gestionar el checkout
function handleCheckout(event) {
  event.preventDefault();
  try {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const card = document.getElementById("card").value;

    if (!name || !address || !card) {
      alert("Por favor llenar todos los campos");
      return;
    }

    alert("¡La orden fue realizada con éxito, gracias por su compra!");
    cart = [];
    saveCart();
    displayCart();
    document.getElementById("checkout-form").reset();
  } catch (error) {
    console.error("Error al procesar el checkout:", error);
    alert(
      "Hubo un problema al procesar su orden. Por favor, intente nuevamente."
    );
  }
}

// Filtrar los productos a través de la barra de búsqueda
function filterProducts() {
  try {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error al filtrar los productos:", error);
    displayError(
      "Hubo un problema al filtrar los productos. Por favor, intente nuevamente."
    );
  }
}
// Event listener para ordenar los productos por precio
document.getElementById("sort-options").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  const sortedProducts = sortProductsByPrice(products, sortOrder);
  displayProducts(sortedProducts);
});

// Filtrar los productos con los botones de categorías
function filterByCategory(category) {
  try {
    const filteredProducts = filterProductsByCategory(products, category);
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error al filtrar los productos por categoría:", error);
    displayError(
      "Hubo un problema al filtrar los productos por categoría. Por favor, intente nuevamente."
    );
  }
}

// Mostrar un mensaje de error en la página
function displayError(message) {
  const errorContainer = document.createElement("div");
  errorContainer.classList.add("error");
  errorContainer.textContent = message;
  document.body.appendChild(errorContainer);
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

// Traer los productos del JSON al cargar la pagina
fetchProducts();
