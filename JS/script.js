const productos = {
  proteinas: {
    star: 20000,
    sun: 25000,
    moon: 30000,
  },
  creatinas: {
    star: 30000,
    sun: 35000,
    moon: 40000,
  },
};

function mostrarProductos() {
  let producto = "";
  while (true) {
    producto = prompt(
      "Elige qué producto deseas consultar: Proteínas o Creatinas"
    ).toLowerCase();
    switch (producto) {
      case "proteinas":
      case "creatinas":
        mostrarMarca(producto);
        return;
      default:
        alert("Opción no válida. Inténtalo de nuevo.");
    }
  }
}

function mostrarMarca(tipo) {
  let marca = "";
  while (true) {
    marca = prompt(
      `¿Qué marca deseas consultar: Star, Sun o Moon?`
    ).toLowerCase();
    if (productos[tipo][marca]) {
      agregarAlCarrito(tipo, marca);
      return;
    } else {
      alert("Dicha opción no es válida. Inténtalo de nuevo.");
    }
  }
}

function agregarAlCarrito(tipo, marca) {
  let precio = productos[tipo][marca];
  let agregar = confirm(
    `El precio es de $${precio}. ¿Desea agregarlo al carrito?`
  );

  if (agregar) {
    alert("Su producto ha sido agregado");
  } else {
    mostrarMarca(tipo);
  }
}

mostrarProductos();
