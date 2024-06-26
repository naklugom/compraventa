const modalclientes = document.getElementById("modal");
const instanciamodalclientes = new bootstrap.Modal(modalclientes);

const modalclientes2 = document.getElementById("modal2");
const instanciamodalclientes2 = new bootstrap.Modal(modalclientes2);
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
let pos = null;


aclientesselect()

function aclientesselect() {
    // //localStorage.clear()
    let texto = "";
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].detalle.length != productos.length) {
            for (let j = 0; j < productos.length; j++) {
                let producto = {
                    nombreproducto: productos[j].nombre,
                    codigo: productos[j].codigo,
                    marca: productos[j].marca,
                    cantidad: 0,
                    precio_unitario: productos[j].pedidoventa,
                    subtotal: 0,
                };
                clientes[i].detalle.push(producto);
            }
        }
    }
    localStorage.setItem("clientes", JSON.stringify(clientes));

}

listaventas();
function listaventas() {

    let tabla = document.querySelector("#tablaventas tbody ");
    let filas = "";

    for (let i = 0; i < clientes.length; i++) {

        filas += `<tr ${clientes[i].estado ? " " : "class='table-danger'"}>
          <td>${i + 1}</td>
          <td>${clientes[i].nombre} ${clientes[i].apellido}</td>
           
          <td>${clientes[i].total}</td>
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
            <div class="btn-group d-flex justify-content-center">
            <div class="btn-group d-flex text-center">
               
                <button type="button" class="btn btn-${clientes[i].estado ? "light " : "secondary"}  btn-sm" ${clientes[i].estado ? `onclick='mostrarclientes(${i})'` : " "}"><i class="fa-solid fa-eye"></i></button>
               
            </div>
            </div>
          </td>
        </tr>`;
    }

    tabla.innerHTML = filas;
}

function estadocolor(dato) {
    clientes[dato].estado = !clientes[dato].estado;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listaventas();
}

function vernombre() {
    let compara = document.getElementById('busquedanombre').value;
    let tabla = document.querySelector("#tablaventas tbody ");
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
          <td>${clientes[j].nombre} ${clientes[j].apellido}</td>
    
          <td>${clientes[j].total}</td>
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
           
            <div class="btn-group d-flex text-center">
               
                <button type="button" class="btn btn-${clientes[j].estado ? "light " : "secondary"}  btn-sm" ${clientes[j].estado ? `onclick='mostrarclientes(${j})'` : " "}"><i class="fa-solid fa-eye"></i></button>
                
            </div>
      
          </td>
        </tr>`;
                    }
                }
                tabla.innerHTML = filas;
            }
        }
    } else {
        listaventas();
    }
}

function mostrarclientes(index) {
    let tabla = document.querySelector("#tablamodal tbody ");
    let filas = "";

    for (let i = 0; i < clientes[index].detalle.length; i++) {
        if (clientes[index].detalle[i].cantidad > 0) {
            filas += `<tr>
          
          <td>${clientes[index].detalle[i].nombreproducto}  </td>
           <td>${clientes[index].detalle[i].codigo} </td> 
           <td>${clientes[index].detalle[i].marca} </td> 
           <td>${clientes[index].detalle[i].cantidad} </td> 
           <td>${clientes[index].detalle[i].precio_unitario} </td> 
           <td>${clientes[index].detalle[i].subtotal} </td> 
           
        </tr>`;
        }
    }
    document.getElementById("sumatotal").value = clientes[index].total;
    tabla.innerHTML = filas;
    instanciamodalclientes.show();
}
