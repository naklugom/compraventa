clientes =
    localStorage.getItem("clientes") != null
        ? JSON.parse(localStorage.getItem("clientes"))
        : [];

productos =
    localStorage.getItem("productos") != null
        ? JSON.parse(localStorage.getItem("productos"))
        : [];
historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : [];


mostrar()
function mostrar() {
    //localStorage.clear();
    document.getElementById("totalclientes").textContent = clientes.length;
    document.getElementById("totalproductos").textContent = productos.length;
    document.getElementById("totalventas").textContent = ventasycompras(1);
    document.getElementById("totalcompras").textContent = ventasycompras(2);
    let tabla = document.querySelector("#lista   ");
    let filas = `<li class="list-group-item  list-group-item-info list-group-item-action bg-dark text-center text-white">
                                <i class="fas fa-shopping-cart me-2"></i> Productos Vendidos
                            </li>`;



    for (let i = 0; i < historial.length; i++) {
        if (historial[i].accion == "vende") {

            filas += `
            <li
            class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
            ${historial[i].nombre}
                                <span class="badge text-bg-primary rounded-pill">${historial[i].cantidad}</span>
            </li>`
        }


        tabla.innerHTML = filas;


    }
}


function ventasycompras(dato) {
    let suma = 0;
    if (dato == 1) {
        for (let i = 0; i < historial.length; i++) {
            if (historial[i].accion == "vende") {
                console.log("entraaa")
                suma++;
            }
        }
        return suma;
    } else {
        for (let i = 0; i < historial.length; i++) {
            if (historial[i].accion == "compra") {
                suma++;
            }
        }
        return suma;
    }

}