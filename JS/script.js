
const proteinas = ["proteina Star", "proteina Sun", "proteina Moon"];
const creatinas = ["creatina Star", "creatina Sun", "creatina Moon"];

function mostrarProductos() {
  let respuesta = prompt(
    "Elige qué producto deseas consultar: Proteína, Creatina"
  );
  switch (respuesta) {
    case "proteina":
      console.log(mostrarProteinas());
      break;
    case "creatina":
      console.log(mostrarCreatinas());
      break;
    default:
      alert("Dicha opción no es válida");
      break;
  }
}

mostrarProductos();

function mostrarProteinas() {
  let marcaProteina = prompt("¿Qué marca deseas consultar: Star, Sun o Moon");
  switch (marcaProteina) {
    case "star":
      let agregarAlCarrito1 = confirm(
        "El precio es de $20.000 ¿Desea agregarlo al carrito?"
      );
      if (agregarAlCarrito1 == true) {
        alert("su producto ha sido agregado");
        console.log(mostrarProductos());
      } else {
        console.log(mostrarProteinas());
      }
      break;
    case "sun":
      let agregarAlCarrito2 = confirm(
        "El precio es de $25.000 ¿Desea agregarlo al carrito?"
      );
      if (agregarAlCarrito2 == true) {
        alert("su producto ha sido agregado");
        console.log(mostrarProductos());
      } else {
        console.log(mostrarProteinas());
      }
      break;
    case "moon":
      let agregarAlCarrito3 = confirm(
        "El precio es de $30.000 ¿Desea agregarlo al carrito?"
      );
      if (agregarAlCarrito3 == true) {
        alert("su producto ha sido agregado");
        console.log(mostrarProductos());
      } else {
        console.log(mostrarProteinas());
      }
      break;
    default:
      alert("Dicha opción no es válida");
      console.log(mostrarProteinas());
      break;
  }
}

function mostrarCreatinas() {
  console.log(creatinas);
}
