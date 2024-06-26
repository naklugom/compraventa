const modalclientes = document.getElementById("modalrclientes");
const instanciamodalclientes = new bootstrap.Modal(modalclientes);
clientes =
    localStorage.getItem("clientes") != null
        ? JSON.parse(localStorage.getItem("clientes"))
        : [];
let pos = null;
listaclientes();

function listaclientes() {

    let tabla = document.querySelector("#tablaclientes tbody ");
    let filas = "";

    for (let i = 0; i < clientes.length; i++) {
        filas += `<tr ${clientes[i].estado ? " " : "class='table-danger'"}>
          <td>${i + 1}</td>
          <td>${clientes[i].nombre}</td>
          <td>${clientes[i].apellido}</td>
          <td>${clientes[i].numeroidentificacion}</td>
       
          <td>
          <div >
          <span class="badge bg-${clientes[i].estado ? "success" : "danger"}" >${clientes[i].estado ? "Activo" : "Inactivo"}</span><br>
          <button type="button" class="btn btn-lg" onclick="estadocolor(${i})"">${clientes[i].estado
                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
            }</button>
          </div>
          </td>
          <td>
             
            <div class="btn-group d-flex text-center">
                <button type="button" class="btn btn-warning btn-sm" onclick="mostrarclientes(${i})">✏</button>
                <button type="button" class="btn btn-danger btn-sm ${clientes[i].estado ? "d-none" : ""}" onclick="eliminarclientes(${i})">🚫</button>
            </div>
          </td>
        </tr>`;
    }
    tabla.innerHTML = filas;
}

function mostrarclientes(dato) {
    document.getElementById("modnombreclientes").value = clientes[dato].nombre;
    document.getElementById("modapellidoclientes").value = clientes[dato].apellido;
    document.getElementById("modnidenclientes").value = clientes[dato].numeroidentificacion;

    document.getElementById("modestadoclientesok").checked = true;
    document.getElementById("modestadoclientesof").checked = false;
    pos = dato;
    instanciamodalclientes.show();

}
function editarclientes() {
    const nombre = document.getElementById("modnombreclientes").value;
    const apellido = document.getElementById("modapellidoclientes").value;
    const numeroidentificacion = document.getElementById("modnidenclientes").value;



    const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";



    if (nombre !== "" && apellido !== "" && numeroidentificacion !== "") {

        clientes[pos].nombre = nombre;
        clientes[pos].apellido = apellido;
        clientes[pos].numeroidentificacion = numeroidentificacion;

        clientes[pos].estado = estado;

        localStorage.setItem('clientes', JSON.stringify(clientes));
        listaclientes();
        instanciamodalclientes.hide();
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
    clientes[dato].estado = !clientes[dato].estado;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listaclientes();
}

function vernombre() {
    let compara = document.getElementById('busquedanombre').value;
    let tabla = document.querySelector("#tablaclientes tbody ");
    let filas = "";
    let nombrestring = ''
    if (compara != "") {
        for (let i = 0; i < compara.length; i++) {
            for (let j = 0; j < clientes.length; j++) {
                nombrestring = clientes[j].nombre;
                if (i == compara.length - 1) {
                    if (compara[i].toLowerCase() == nombrestring[i].toLowerCase()) {
                        filas += `<tr ${clientes[j].estado ? " " : "class='table-danger'"}>
            <td>${j + 1}</td>
            <td>${clientes[j].nombre}</td>
            <td>${clientes[j].apellido}</td>
            <td>${clientes[j].numeroidentificacion}</td>
           
            <td>
            <div >
            <span class="badge bg-${clientes[j].estado ? "success" : "danger"}" >${clientes[j].estado ? "Activo" : "Inactivo"}</span><br>
            <button type="button" class="btn btn-lg" onclick="estadocolor(${j})"">${clientes[j].estado
                                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
                            }</button>
            </div>
            </td>
            <td>
              <div class="btn-group d-flex justify-content-center">
              <div class="btn-group d-flex text-center">
                  <button type="button" class="btn btn-warning btn-sm" onclick="mostrarclientes(${j})">✏</button>
                  <button type="button" class="btn btn-danger btn-sm ${clientes[j].estado ? "d-none" : ""}" onclick="eliminarclientes(${j})">🚫</button>
              </div>
            </td>
          </tr>`;
                    }
                }
                tabla.innerHTML = filas;
            }
        } 
    } else {
        listaclientes();
    }
}

function eliminarclientes(index) {
    Swal.fire({
        title: "¿Está seguro de eliminar este registro?",
        text: `Se borrará "${clientes[index].nombre}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
        cancelButtonText: "No!",
    }).then((result) => {
        if (result.isConfirmed) {
            clientes.splice(index, 1);
            listaclientes();
            Swal.fire({
                title: "Eliminado!",
                text: "El registro fue eliminado.",
                icon: "success",
            });
            localStorage.setItem('clientes', JSON.stringify(clientes));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "El registro está a salvo :)",
                icon: "error",
            });
        }
    });
}