/*let palabre = "Dividamos como muestra"
console.log(palabre);
let conteoletras = palabre.length
console.log(conteoletras)
let pabuscar=[];
for(let i = 0;i<palabre.length;i++){
    pabuscar[i]=palabre[i]
    console.log(pabuscar[i])
}
*/
let productos = [
    {
        producto: 0,
        nombre: "Samsung S24+",
        codigo: "cel - 001",
        marca: "Samsung",
        categoria: "Celular",
        stock: 5,
        pedidocompra: 7000,
        pedidoventa: 8000,
        unidadmedida: "Unidad",
        estado: true,


    },
    {
        producto: 1,
        nombre: "Samsung S23+",
        codigo: "cel - 002",
        marca: "Samsung",
        categoria: "Celular",
        stock: 2,
        pedidocompra: 5500,
        pedidoventa: 6000,
        unidadmedida: "Unidad",
        estado: true,

    },
    {
        producto: 2,
        nombre: "Samsung 23 pulgadas",
        codigo: "tv - 001",
        marca: "Samsung",
        categoria: "Tv",
        stock: 2,
        pedidocompra: 1400,
        pedidoventa: 1800,
        unidadmedida: "Unidad",
        estado: true,

    },
    {
        producto: 3,
        nombre: "lg 12 pulgadas",
        codigo: "tv - 002",
        marca: "lg",
        categoria: "Pantalla",
        stock: 5,
        pedidocompra: 1600,
        pedidoventa: 2000,
        unidadmedida: "Unidad",
        estado: true,

    },

];

let compara = 'Lg'
let x = 0;
let nombrestring = ''
console.log(nombrestring[0])
if (compara != "") {
    for (let i = 0; i < compara.length; i++) {
        console.log(compara.length);
        for (let j = 0; j < productos.length; j++) {
            console.log(productos.length);
            nombrestring = productos[j].nombre;
            console.log(nombrestring);
            if (compara[i].toLowerCase() == nombrestring[i].toLowerCase()) {
                console.log("nombrestring");
                console.log(nombrestring);
            }
        }

    }
} else {
    listaproductos();
}

function vernombre() {
    let compara = document.getElementById('busquedanombre').value;
    let tabla = document.querySelector("#tablaproductos tbody ");
    let filas = "";
    if (compara != "") {
        for (let i = 0; i < productos.length; i++) {
            if (compara.toLowerCase() == productos[i].nombre.toLowerCase()) {
                filas += `<tr${productos[i].estado ? " " : "class='table-danger'"}>
            <td>${i + 1}</td>
            <td>${productos[i].nombre}</td>
          <td>${productos[i].codigo}</td>
          <td>${productos[i].marca}</td>
          <td>${productos[i].categoria}</td>
          <td>${productos[i].stock}</td>
          <td>${productos[i].pedidocompra}</td>
          <td>${productos[i].pedidoventa}</td>
          <td>${productos[i].unidadmedida}</td>
          <td>
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
              <div class="btn-group d-flex justify-content-center">
              <div class="btn-group d-flex text-center">
                  <button type="button" class="btn btn-warning btn-sm" onclick="mostrarproductos(${i})">✏</button>
                  <button type="button" class="btn btn-danger btn-sm ${productos[i].estado ? "d-none" : ""}" onclick="eliminarproductos(${i})">🚫</button>
              </div>
            </td>
          </tr>`;
            }
            tabla.innerHTML = filas;
        }
    } else {
        listaproductos();
    }
}