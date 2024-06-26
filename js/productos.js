const modalproductos = document.getElementById("modalrproductos");
const instanciamodalproductos = new bootstrap.Modal(modalproductos);
productos =
    localStorage.getItem("productos") != null
        ? JSON.parse(localStorage.getItem("productos"))
        : [];
historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : [];
let pos = null;
listaproductos();
function listaproductos() {
    let tabla = document.querySelector("#tablaproductos tbody ");
    let filas = "";

    for (let i = 0; i < productos.length; i++) {

        const esMayorQueCero = x => x > 0;

        filas += `<tr ${productos[i].estado ? " " : `class='table-danger'`} ${esMayorQueCero(productos[i].stock) ? " " : `class='table-warning'`}>
          <td>${i + 1}</td >
          <td>${productos[i].nombre}</td>
          <td>${productos[i].codigo}</td>
          <td>${productos[i].marca}</td>
          <td>${productos[i].categoria}</td>
          <td>${productos[i].stock}</td>
          <td>${productos[i].pedidocompra}</td>
          <td>${productos[i].pedidoventa}</td>
          <td>${productos[i].unidadmedida}</td>
          <td>
          <div >
          <span class="badge bg-${productos[i].estado ? "success" : "danger"}" >${productos[i].estado ? "Activo" : "Inactivo"}</span><br>
          <button type="button" class="btn btn-lg" onclick="estadocolor(${i})"">${productos[i].estado
                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
            }</button>
          </div>
          </td>
          <td>
             
            <div class="btn-group d-flex text-center">
                <button type="button" class="btn btn-warning btn-sm" onclick="mostrarproductos(${i})">✏</button>
                <button type="button" class="btn btn-danger btn-sm ${productos[i].estado ? "d-none" : ""}" onclick="eliminarproductos(${i})">🚫</button>
            </div>
          </td>
        </tr>`;
    }
    tabla.innerHTML = filas;
}

function mostrarproductos(dato) {
    document.getElementById("modnombreproductos").value = productos[dato].nombre;
    document.getElementById("modapellidoproductos").value = productos[dato].codigo;
    document.getElementById("modamarca").value = productos[dato].marca;
    document.getElementById("modcategoria").value = productos[dato].categoria;
    document.getElementById("mostock").value = productos[dato].stock;
    document.getElementById("modpreciocompra").value = productos[dato].pedidocompra;
    document.getElementById("modprecioventa").value = productos[dato].pedidoventa;
    document.getElementById("modunidadmedida").value = productos[dato].unidadmedida;
    document.getElementById("modestadoproductosok").checked = true;
    document.getElementById("modestadoproductosof").checked = false;
    pos = dato;
    instanciamodalproductos.show();

}
function editarproductos() {
    const nombre = document.getElementById("modnombreproductos").value;
    const codigo = document.getElementById("modapellidoproductos").value;
    const marca = document.getElementById("modamarca").value;
    const categoria = document.getElementById("modcategoria").value;
    const stock = document.getElementById("mostock").value;
    const preciocompra = document.getElementById("modpreciocompra").value;
    const precioventa = document.getElementById("modprecioventa").value;
    const unidad = document.getElementById("modunidadmedida").value;



    const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";



    if (nombre !== "" && codigo !== "" && marca !== "" && categoria !== "" && stock !== "" && preciocompra !== "" && precioventa !== "" && unidad !== "") {


        productos[pos].nombre = nombre;
        productos[pos].codigo = codigo;
        productos[pos].marca = marca;
        productos[pos].categoria = categoria;
        productos[pos].stock = stock;
        productos[pos].pedidocompra = preciocompra;
        productos[pos].pedidoventa = precioventa;
        productos[pos].unidadmedida = unidad;
        productos[pos].estado = estado;

        console.log(historial);
        console.log(pos);
        console.log(nombre);
        historial[pos].nombre = nombre;

        localStorage.setItem('productos', JSON.stringify(productos));
        let historial1 = {
            nombre: productos[pos].nombre,
            stock: productos[pos].stock,
            estado: productos[pos].estado,
            accion: "edita",
            cantidad: 0
        };

        historial.push(historial1);

        localStorage.setItem("historial", JSON.stringify(historial));




        listaproductos();
        instanciamodalproductos.hide();
        Swal.fire({
            title: "Editado!!!",
            text: "Registro Exitoso",
            icon: "success",
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "No se puede registrar datos vacíos.",
            icon: "error",
        });
    }
}
function estadocolor(dato) {
    productos[dato].estado = !productos[dato].estado;
    localStorage.setItem('productos', JSON.stringify(productos));
    listaproductos();
}

function vernombre() {
    let compara = document.getElementById('busquedanombre').value;
    let tabla = document.querySelector("#tablaproductos tbody ");
    let filas = "";
    let nombrestring = ''
    if (compara != "") {
        for (let i = 0; i < compara.length; i++) {
            for (let j = 0; j < productos.length; j++) {
                nombrestring = productos[j].nombre;
                if (i == compara.length - 1) {
                    if (compara[i].toLowerCase() == nombrestring[i].toLowerCase()) {
                        filas += `<tr${productos[j].estado ? " " : "class='table-danger'"}>
            <td>${j+1}</td>
            <td>${productos[j].nombre}</td>
          <td>${productos[j].codigo}</td>
          <td>${productos[j].marca}</td>
          <td>${productos[j].categoria}</td>
          <td>${productos[j].stock}</td>
          <td>${productos[j].pedidocompra}</td>
          <td>${productos[j].pedidoventa}</td>
          <td>${productos[j].unidadmedida}</td>
          <td>
            <td>
            <div >
            <span class="badge bg-${productos[j].estado ? "success" : "danger"}" >${productos[j].estado ? "Activo" : "Inactivo"}</span><br>
            <button type="button" class="btn btn-lg" onclick="estadocolor(${j})"">${productos[j].estado
                                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
                            }</button>
            </div>
            </td>
            <td>
              <div class="btn-group d-flex justify-content-center">
              <div class="btn-group d-flex text-center">
                  <button type="button" class="btn btn-warning btn-sm" onclick="mostrarproductos(${j})">✏</button>
                  <button type="button" class="btn btn-danger btn-sm ${productos[j].estado ? "d-none" : ""}" onclick="eliminarproductos(${j})">🚫</button>
              </div>
            </td>
          </tr>`;
                    }
                }
                tabla.innerHTML = filas;
            }
        }
    } else {
        listaproductos();
    }
}

function eliminarproductos(index) {
    let a = productos[index].nombre;

    Swal.fire({
        title: "¿Está seguro de eliminar este registro?",
        text: `Se borrará "${productos[index].nombre}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
        cancelButtonText: "No!",

    }).then((result) => {
        if (result.isConfirmed) {

            listaproductos();
            Swal.fire({
                title: "Eliminado!",
                text: "El registro fue eliminado.",
                icon: "success",
            });
            let historial1 = {
                nombre: a,
                stock: 0,
                estado: productos[index].estado,
                accion: "elimina",
                cantidad: 0
            };

            historial.push(historial1);
            localStorage.setItem("historial", JSON.stringify(historial));
            productos.splice(index, 1);
            localStorage.setItem('productos', JSON.stringify(productos));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "El registro está a salvo :)",
                icon: "error",
            });
        }
    });
}