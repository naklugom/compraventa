
historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : [];

let pos = null;
listaproductos();
function listaproductos() {
    let tabla = document.querySelector("#lista   ");
    let filas = "";
    const esMayorQueCero = x => x > 0;
    for (let i = historial.length - 1; i >= 0; i--) {
        switch (historial[i].accion) {
            case "agrega":
                filas += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-info">Se ${historial[i].accion} el producto ${historial[i].nombre} </a>`;
                break;
            case "edita":
                filas += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-warning">Se ${historial[i].accion} el producto ${historial[i].nombre} </a>`;
                break;
            case "elimina":
                filas += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-danger">Se ${historial[i].accion} el producto ${historial[i].nombre} </a>`;
                break;
            case "compra":
                filas += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-primary">Se ${historial[i].accion} ${historial[i].cantidad} unidades del producto ${historial[i].nombre} </a>`;
                break;
                case "vende":
                filas += `
            <a href="#" class="list-group-item list-group-item-action list-group-item-success">Se ${historial[i].accion} ${historial[i].cantidad} unidades del producto ${historial[i].nombre} </a>`;
                break;
        }
    }
    tabla.innerHTML = filas;
}
