const modalproveedores = document.getElementById("modal");
const instanciamodalproveedores = new bootstrap.Modal(modalproveedores);

const modalproveedores2 = document.getElementById("modal2");
const instanciamodalproveedores2 = new bootstrap.Modal(modalproveedores2);
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

listacompras();
function listacompras() {
  // localStorage.clear()
  let tabla = document.querySelector("#tablacompras tbody ");
  let filas = "";

  for (let i = 0; i < proveedores.length; i++) {
    filas += `<tr ${proveedores[i].estado ? " " : "class='table-danger'"}>
          <td>${i + 1}</td>
          <td>${proveedores[i].nombre} ${proveedores[i].apellido}</td>
           <td>${proveedores[i].contacto}</td> 
          <td>${proveedores[i].total}</td>
          <td>
          <div >
          <span class="badge bg-${proveedores[i].estado ? "success" : "danger"
      }" >${proveedores[i].estado ? "Activo" : "Inactivo"}</span><br>
          <button type="button" class="btn btn-lg" onclick="estadocolor(${i})"">${proveedores[i].estado
        ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
        : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
      }</button>
          </div>
          </td>
          <td>
            <div class="btn-group d-flex justify-content-center">
            <div class="btn-group d-flex text-center">
                <button type="button" class="btn btn-${proveedores[i].estado ? "success " : "secondary"
      }  btn-sm" ${proveedores[i].estado ? `onclick='agregarproducto(${i})'` : " "
      }"><i class="fa-solid fa-plus"></i></button>
                <button type="button" class="btn btn-${proveedores[i].estado ? "light " : "secondary"
      }  btn-sm" ${proveedores[i].estado ? `onclick='mostrarproveedores(${i})'` : " "
      }"><i class="fa-solid fa-eye"></i></button>
                <button type="button" class="btn btn-${proveedores[i].estado ? "warning " : "secondary"
      }  btn-sm"  ${proveedores[i].estado ? `onclick='editarproducto(${i})'` : " "
      }" ><i class="fa-solid fa-pencil"></i></button>
            </div>
            </div>
          </td>
        </tr>`;
  }

  tabla.innerHTML = filas;
}

function estadocolor(dato) {
  proveedores[dato].estado = !proveedores[dato].estado;
  localStorage.setItem("proveedores", JSON.stringify(proveedores));
  listacompras();
}

function vernombre() {
  let compara = document.getElementById("busquedanombre").value;
  let tabla = document.querySelector("#tablacompras tbody ");
  let filas = "";
  let nombrestring = ''
  if (compara != "") {
    for (let i = 0; i < compara.length; i++) {
      for (let j = 0; j < proveedores.length; j++) {
        nombrestring = proveedores[j].nombre;
        if (i == compara.length - 1) {
          if (compara[i].toLowerCase() == nombrestring[i].toLowerCase()) {
            filas += `<tr ${proveedores[j].estado ? " " : "class='table-danger'"}>
          <td>${j + 1}</td>
          <td>${proveedores[j].nombre} ${proveedores[j].apellido}</td>
           <td>${proveedores[j].contacto}</td> 
          <td>${proveedores[j].total}</td>
          <td>
          <div >
          <span class="badge bg-${proveedores[j].estado ? "success" : "danger"
              }" >${proveedores[j].estado ? "Activo" : "Inactivo"}</span><br>
          <button type="button" class="btn btn-lg" onclick="estadocolor(${j})"">${proveedores[j].estado
                ? '<i class="fas fa-toggle-on" style="color: #0d5e12;"></i>'
                : '<i class="fas fa-toggle-off" style="color: #de0d0d;"></i>'
              }</button>
          </div>
          </td>
          <td>
           
            <div class="btn-group d-flex text-center">
                <button type="button" class="btn btn-${proveedores[j].estado ? "success " : "secondary"
              }  btn-sm" ${proveedores[j].estado ? `onclick='agregarproducto(${j})'` : " "
              }"><i class="fa-solid fa-plus"></i></button>
                <button type="button" class="btn btn-${proveedores[j].estado ? "light " : "secondary"
              }  btn-sm" ${proveedores[j].estado ? `onclick='mostrarproveedores(${j})'` : " "
              }"><i class="fa-solid fa-eye"></i></button>
                <button type="button" class="btn btn-${proveedores[j].estado ? "warning " : "secondary"
              }  btn-sm"  ${proveedores[j].estado ? `onclick="editarproducto(${j})"` : " "
              }" ><i class="fa-solid fa-pencil"></i></button>
            </div>
      
          </td>
        </tr>`;
          }
        }
        tabla.innerHTML = filas;
      }
    }
  } else {
    listacompras();
  }
}

function mostrarproveedores(index) {
  let tabla = document.querySelector("#tablamodal tbody ");
  let filas = "";

  for (let i = 0; i < proveedores[index].detalle.length; i++) {


    filas += `<tr ${estadoproducto(index, i) ? " " : "class='table-danger'"}>
          
          <td>${proveedores[index].detalle[i].nombreproducto}  </td>
           <td>${proveedores[index].detalle[i].codigo} </td> 
           <td>${proveedores[index].detalle[i].marca} </td> 
           <td>${proveedores[index].detalle[i].cantidad} </td> 
           <td>${proveedores[index].detalle[i].precio_unitario} </td> 
           <td>${proveedores[index].detalle[i].subtotal} </td> 
           
        </tr>`;
  }
  document.getElementById("sumatotal").value = proveedores[index].total;
  tabla.innerHTML = filas;
  instanciamodalproveedores.show();
}
function estadoproducto(pos, detalle) {
  for (let j = 0; j < productos.length; j++) {
    if (productos[j].nombre == proveedores[pos].detalle[detalle].nombreproducto) {

      return (productos[j].estado)
    }

  }
}
let agregaposproducto = null;
function agregarproducto(dato) {
  document.getElementById("agregarpnombre").textContent =
    proveedores[dato].nombre;
  document.getElementById("agregartext").textContent = "Agregar productos a: ";
  agregaposproducto = dato;
  limpiar();
  document.getElementById("showselect").classList.add("d-none");
  document.getElementById("modverdeguardar").classList.remove("d-none");
  document.getElementById("modamaeditar").classList.add("d-none");
  document.getElementById("modeliprod").classList.add("d-none");
  instanciamodalproveedores2.show();
}
function limpiar() {
  document.getElementById("agregarpnombreprod").value = "";
  document.getElementById("agregarcodigoprod").value = "";
  document.getElementById("agregarmarcaprod").value = "";
  document.getElementById("agregarprecioprod").value = "";
}

function guardarproducto() {
  let nombre = document.getElementById("agregarpnombreprod").value;
  let codigo = document.getElementById("agregarcodigoprod").value;
  let marca = document.getElementById("agregarmarcaprod").value;
  let precio = document.getElementById("agregarprecioprod").value;
  if (nombre != "" && codigo != "" && marca != "" && precio != "") {
    let producto = {
      nombreproducto: nombre,
      codigo: codigo,
      marca: marca,
      cantidad: 0,
      precio_unitario: precio,
      subtotal: 0,
    };
    proveedores[agregaposproducto].detalle.push(producto);
    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    let productobase = {
      producto: productos.length,
      nombre: nombre,
      codigo: codigo,
      marca: marca,
      categoria: "Agregar",
      stock: 0,
      pedidocompra: precio,
      pedidoventa: 0,
      unidadmedida: "Agregar",
      estado: true,
    };
    console.log(producto);
    productos.push(productobase);
    console.log("agrega producto");
    console.log(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    let historial1 = {
      nombre: nombre,
      stock: 0,
      estado: true,
      accion: "agrega",
    };

    historial.push(historial1);

    localStorage.setItem("historial", JSON.stringify(historial));

    Swal.fire({
      title: "Guardado!!!",
      text: "Registro Exitoso",
      icon: "success",
    });
    instanciamodalproveedores2.hide();
  } else {
    Swal.fire({
      title: "Error",
      text: "No se puede registrar datos vacíos.",
      icon: "error",
    });
  }
}
let ubiprod = null;
function editarproducto(dato) {
  ubiprod = dato;
  document.getElementById("modverdeguardar").classList.add("d-none");
  document.getElementById("modamaeditar").classList.remove("d-none");
  document.getElementById("showselect").classList.remove("d-none");
  document.getElementById("modeliprod").classList.remove("d-none");

  aproveedoresselect(dato);

  cargaproductos();


}
function cargaproductos() {

  let x = document.getElementById("productosselect").value;

  for (let k = 0; k < productos.length; k++) {
    if (productos[k].nombre == proveedores[ubiprod].detalle[x].nombreproducto) {
      if (productos[k].estado) {

        document.getElementById("modestadoproductosok").checked = true;
        document.getElementById("modestadoproductosof").checked = false;
      } else {
        document.getElementById("modestadoproductosok").checked = false;
        document.getElementById("modestadoproductosof").checked = true;
      }

      console.log(productos[k].estado)

    }
  }

  if (proveedores[ubiprod].detalle.length != 0) {
    instanciamodalproveedores2.show();

    document.getElementById("agregarpnombre").textContent =
      proveedores[ubiprod].nombre;
    document.getElementById("agregarpnombreprod").value =
      proveedores[ubiprod].detalle[x].nombreproducto;
    document.getElementById("agregarcodigoprod").value =
      proveedores[ubiprod].detalle[x].codigo;
    document.getElementById("agregarmarcaprod").value =
      proveedores[ubiprod].detalle[x].marca;
    document.getElementById("agregarprecioprod").value =
      proveedores[ubiprod].detalle[x].precio_unitario;
  } else {
    Swal.fire({
      title: "Error",
      text: "No tiene productos para editar",
      icon: "error"
    });

  }
}

function aproveedoresselect(dato) {
  const select = document.querySelector("productosselect");
  let texto = "";
  for (let i = 0; i < proveedores[dato].detalle.length; i++) {
    texto += `<option value="${i}">${proveedores[dato].detalle[i].nombreproducto}</option>`;
  }

  productosselect.innerHTML = texto;
}
function modeditarproducto() {
  let x = document.getElementById("productosselect").value;
  let nombre = document.getElementById("agregarpnombreprod").value;
  let codigo = document.getElementById("agregarcodigoprod").value;
  let marca = document.getElementById("agregarmarcaprod").value;
  let precio = document.getElementById("agregarprecioprod").value;
  const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";
  if (nombre != "" && codigo != "" && marca != "" && precio != "") {
    for (let i = 0; i < productos.length; i++) {
      if (
        proveedores[ubiprod].detalle[x].nombreproducto == productos[i].nombre
      ) {
        console.log("editar");
        productos[i].nombre = nombre;
        productos[i].codigo = codigo;
        productos[i].marca = marca;
        productos[i].pedidocompra = precio;
        productos[i].estado = estado;
        localStorage.setItem("productos", JSON.stringify(productos));
      }
    }

    proveedores[ubiprod].detalle[x].nombreproducto = nombre;
    proveedores[ubiprod].detalle[x].codigo = codigo;
    proveedores[ubiprod].detalle[x].marca = marca;
    proveedores[ubiprod].detalle[x].precio_unitario = precio;
    proveedores[ubiprod].detalle[x].estado = estado;
    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    let historial1 = {
      nombre: nombre,
      stock: 5,
      estado: true,
      accion: "edita",
    };

    historial.push(historial1);

    localStorage.setItem("historial", JSON.stringify(historial));

    Swal.fire({
      title: "Guardado!!!",
      text: "Registro Exitoso",
      icon: "success",
    });
    instanciamodalproveedores2.hide();
  } else {
    Swal.fire({
      title: "Error",
      text: "No se puede registrar datos vacíos.",
      icon: "error",
    });
  }
}

function eliminarproducto() {
  let x = document.getElementById("productosselect").value;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: `${proveedores[ubiprod].detalle[x].nombreproducto}`,
      text: `Estás seguro de eliminar este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Bórralo!",
      cancelButtonText: "No, cancela!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El producto fué eliminado.",
          icon: "error",
        });
        instanciamodalproveedores2.hide();
        let historial1 = {
          nombre: proveedores[ubiprod].detalle[x].nombreproducto,
          stock: 0,
          estado: true,
          accion: "elimina",
        };
        historial.push(historial1);
        localStorage.setItem("historial", JSON.stringify(historial));
        for (let i = 0; i < productos.length; i++) {
          if (
            proveedores[ubiprod].detalle[x].nombreproducto ==
            productos[i].nombre
          ) {
            productos.splice(i, 1);

            localStorage.setItem("productos", JSON.stringify(productos));
          }
        }
        instanciamodalproveedores2.hide();
        proveedores[ubiprod].detalle.splice(x, 1);
        localStorage.setItem("proveedores", JSON.stringify(proveedores));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El producto se mantiene",
          icon: "success",
        });
        instanciamodalproveedores2.hide();
      }
    });
}
