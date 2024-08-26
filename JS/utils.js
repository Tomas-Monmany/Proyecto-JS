// Función para encontrar los productos por ID
function findProductById(products, productId) {
  return _.find(products, { id: productId });
}

// Función para filtrar los productos por categoría
function filterProductsByCategory(products, category) {
  if (category === "Todos") {
    return products;
  }
  return _.filter(products, { category: category });
}

// Función para ordenar los productos por precio
function sortProductsByPrice(products, order = "asc") {
  return _.orderBy(products, ["price"], [order]);
}

//Todas las funciones utilizan la librería Lodash
