const modalproveedores = document.getElementById("modalrproveedores");
const instanciamodalproveedores = new bootstrap.Modal(modalproveedores);

proveedores =
    localStorage.getItem("proveedores") != null
        ? JSON.parse(localStorage.getItem("proveedores"))
        : [];
productos =
    localStorage.getItem("productos") != null
        ? JSON.parse(localStorage.getItem("productos"))
        : [];
historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : [];

let pos = null;
listaproveedores();
function listaproveedores() {
    let tabla = document.querySelector("#tablaproveedores tbody ");
    let filas = "";

    for (let i = 0; i < proveedores.length; i++) {
        filas += `<tr ${proveedores[i].estado ? " " : "class='table-danger'"}>
          <td>${i + 1}</td >
          <td>${proveedores[i].nombre}</td>
          <td>${proveedores[i].apellido}</td>
          <td>${proveedores[i].numeroidentificacion}</td>
          <td>${proveedores[i].contacto}</td>
          <td>
          <div >
          <span class="badge bg-${proveedores[i].estado ? "success" : "danger"}" >${proveedores[i].estado ? "Activo" : "Inactivo"}</span><br>
          <button type="button" class="btn btn-lg" onclick="estadocolor(${i})"">${proveedores[i].estado
                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
            }</button>
          </div>
          </td>
          <td>
             
            <div class="btn-group d-flex text-center">
                <button type="button" class="btn btn-warning btn-sm" onclick="mostrarproveedores(${i})">✏</button>
                <button type="button" class="btn btn-danger btn-sm ${proveedores[i].estado ? "d-none" : ""}" onclick="eliminarproveedores(${i})">🚫</button>
            </div>
          </td>
        </tr>`;
    }
    tabla.innerHTML = filas;
}

function mostrarproveedores(dato) {
    document.getElementById("modnombreproveedores").value = proveedores[dato].nombre;
    document.getElementById("modapellidoproveedores").value = proveedores[dato].apellido;
    document.getElementById("modnidenproveedores").value = proveedores[dato].numeroidentificacion;
    document.getElementById("modcontactoproveedores").value = proveedores[dato].contacto;
    document.getElementById("modestadoproveedoresok").checked = true;
    document.getElementById("modestadoproveedoresof").checked = false;
    pos = dato;
    instanciamodalproveedores.show();

}
function editarproveedores() {
    const nombre = document.getElementById("modnombreproveedores").value;
    const apellido = document.getElementById("modapellidoproveedores").value;
    const numeroidentificacion = document.getElementById("modnidenproveedores").value;
    const contacto = document.getElementById("modcontactoproveedores").value;


    const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";



    if (nombre !== "" && apellido !== "" && numeroidentificacion !== "" && contacto !== "") {

        proveedores[pos].nombre = nombre;
        proveedores[pos].apellido = apellido;
        proveedores[pos].numeroidentificacion = numeroidentificacion;
        proveedores[pos].contacto = contacto;
        proveedores[pos].estado = estado;

        localStorage.setItem('proveedores', JSON.stringify(proveedores));
        listaproveedores();
        instanciamodalproveedores.hide();
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
    proveedores[dato].estado = !proveedores[dato].estado;
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
    listaproveedores();
}

function vernombre() {
    let compara = document.getElementById('busquedanombre').value;
    let tabla = document.querySelector("#tablaproveedores tbody ");
    let filas = "";
    let nombrestring = ''
    if (compara != "") {
        for (let i = 0; i < compara.length; i++) {
            for (let j = 0; j < proveedores.length; j++) {
                nombrestring = proveedores[j].nombre;
                if (i == compara.length - 1) {
                    if (compara[i].toLowerCase() == nombrestring[i].toLowerCase()) {
                        filas += `<tr${proveedores[j].estado ? " " : "class='table-danger'"}>
            <td>${j + 1}</td>
            <td>${proveedores[j].nombre}</td>
            <td>${proveedores[j].apellido}</td>
            <td>${proveedores[j].numeroidentificacion}</td>
            <td>${proveedores[j].contacto}</td>
            <td>
            <div >
            <span class="badge bg-${proveedores[j].estado ? "success" : "danger"}" >${proveedores[j].estado ? "Activo" : "Inactivo"}</span><br>
            <button type="button" class="btn btn-lg" onclick="estadocolor(${j})"">${proveedores[j].estado
                                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
                            }</button>
            </div>
            </td>
            <td>
              <div class="btn-group d-flex justify-content-center">
              <div class="btn-group d-flex text-center">
                  <button type="button" class="btn btn-warning btn-sm" onclick="mostrarproveedores(${j})">✏</button>
                  <button type="button" class="btn btn-danger btn-sm ${proveedores[j].estado ? "d-none" : ""}" onclick="eliminarproveedores(${j})">🚫</button>
              </div>
            </td>
          </tr>`;
                    }
                }
                tabla.innerHTML = filas;
            }
        }
    } else {
        listaproveedores();
    }
}

function eliminarproveedores(index) {
    Swal.fire({
        title: "¿Está seguro de eliminar este registro?",
        text: `Se borrará "${proveedores[index].nombre}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
        cancelButtonText: "No!",
    }).then((result) => {
        if (result.isConfirmed) {
            proveedores.splice(index, 1);
            listaproveedores();
            Swal.fire({
                title: "Eliminado!",
                text: "El registro fue eliminado.",
                icon: "success",
            });
            localStorage.setItem('proveedores', JSON.stringify(proveedores));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelado",
                text: "El registro está a salvo :)",
                icon: "error",
            });
        }
    });
}