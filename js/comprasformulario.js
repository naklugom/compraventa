
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
let ver = -1;
aproveedoresselect()

function aproveedoresselect() {
    let texto = "";
    for (let i = 0; i < proveedores.length; i++) {
        if (proveedores[i].estado == true) {
            texto += `<option value="${i}" onchange="listacompras1( )">${proveedores[i].nombre}</option>`;
            ver++;
        }
    }
    proveedoresselect.innerHTML = texto;
}
let sumatoriolistaa = 0;
let sumatoriolistab = 0;
let pos = 0;
let asd2 = parseInt(0);
let aver = [];
let aver2 = proveedores;
averdo();
function averdo() {
    //localStorage.clear();
    for (let i = 0; i < productos.length; i++) {
        aver[i] = productos[i].stock;
    }
    console.log(aver2)
    for (let j = 0; j < proveedores.length; j++) {
        for (let k = 0; k < proveedores[j].detalle.length; k++) {
            aver2[j].detalle[k].cantidad = 0

        }
    }
}

listacompras1()

function listacompras1() {

    if (ver == -1) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Error Proveedores",
            text: "No se encontraron Proveedores",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Salir!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                window.location.href = 'compras-lista.html';
            }
        });

        setTimeout(() => {
            window.location.href = 'compras-lista.html';
        }, 2000);

    }

    else {
        let dato = document.getElementById("proveedoresselect").value;
        let tabla = document.querySelector("#tablacompras tbody ");
        let filas = "";
        let suma = 0;
        let x = 0;
        for (let i = 0; i < proveedores[dato].detalle.length; i++) {
            filas += `<tr ${estadoproducto(dato, i) ? " " : "class='table-danger'"}>
          <td>${proveedores[dato].detalle[i].nombreproducto} </td>
          <td>${proveedores[dato].detalle[i].codigo} </td>
          <td>${proveedores[dato].detalle[i].marca} </td>
 
          <td>
          <div class="btn-group d-flex text-center">
            <button type="button"  ${estadoproducto(dato, i) ? `class="btn btn-sm btn-danger" onclick="suma(${i},-1)"` : `class="btn btn-sm btn-secondary"  `} ">➖</button>
            <button type="button" class="btn btn-sm btn-ligth" >${aver2[dato].detalle[i].cantidad} </button>
 
             <button type="button"${estadoproducto(dato, i) ? `class="btn btn-sm btn-success" onclick="suma(${i},1)"` : `class="btn btn-sm btn-secondary"  `} >➕</button>
          </div>
          </td>
          <td>${proveedores[dato].detalle[i].precio_unitario} </td>
          <td>${x = parseInt(aver2[dato].detalle[i].cantidad) * parseInt(proveedores[dato].detalle[i].precio_unitario)} </td>
          <td>
         
            <div class="btn-group d-flex text-center">
            <button type="button" class="btn btn-danger btn-sm " onclick="eliminarproducto(${i})">🚫</button>
            </div>
          </td>
        </tr>`;
            suma = suma + x
        }

        listacompras2()
        proveedores[dato].total = suma;
        document.getElementById("taotalcarrito").value = suma;
        pos = dato;
        tabla.innerHTML = filas;
    }
}
function estadoproducto(pos, detalle) {
    for (let j = 0; j < productos.length; j++) {
        if (productos[j].nombre == proveedores[pos].detalle[detalle].nombreproducto) {

            return (productos[j].estado)
        }

    }
}

function suma(a, b) {
    let v = null
    if (b != 2) {
        aver2[pos].detalle[a].cantidad = parseInt(aver2[pos].detalle[a].cantidad) + parseInt(b);
        if (aver2[pos].detalle[a].cantidad < 0) {
            aver2[pos].detalle[a].cantidad = 0;
        }

        proveedores[pos].detalle[a].cantidad = aver2[pos].detalle[a].cantidad;



        for (let j = 0; j < productos.length; j++) {
            if (productos[j].nombre == proveedores[pos].detalle[a].nombreproducto) {

                productos[j].stock = parseInt(productos[j].stock) + parseInt(b);
                if (productos[j].stock < aver[j]) {
                    productos[j].stock = aver[j];
                }
            }
        }

    } else {
        for (let j = 0; j < proveedores.length; j++) {
            for (let k = 0; k < proveedores[j].detalle.length; k++) {
                if (productos[a].nombre == proveedores[j].detalle[k].nombreproducto) {

                    proveedores[j].detalle[k].cantidad = 0;
                    aver2[j].detalle[k].cantidad = 0
                    productos[a].stock = aver[a];
                }
            }
        }
    }


    listacompras1(); listacompras2();
}





function listacompras2() {

    let tabla = document.querySelector("#productosregistrados tbody");
    let filas = "";
    let suma = 0;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].stock > 0) {
            filas += `
            <tr ${productos[i].estado ? " " : `class='table-danger'`}>
                <td>${productos[i].nombre} </td>
                <td>${productos[i].codigo} </td>
                <td>${productos[i].marca} </td>
               <td><span class="badge bg-primary">${productos[i].stock}</span></td>
                <td>${productos[i].pedidocompra} </td>
                <td>
                    <div class="btn-group d-flex text-center">
                        <button type="button" ${productos[i].estado ? `class="btn btn-danger btn-sm " onclick="eliminarproducto(${i})"` : `class="btn btn-secondary btn-sm "  `} >🚫</button>
                    </div>
                </td>
            </tr>`;
            suma = suma + (parseInt(productos[i].stock) * parseInt(productos[i].pedidocompra))
        }

    }
    document.getElementById("taotalregistro").value = suma;
    tabla.innerHTML = filas;
}



function eliminarproducto(i) {


    suma(i, 2)
    listacompras2()

    listacompras1()
}
function guardar() {

    for (let i = 0; i < proveedores.length; i++) {
        let suma = 0;
        for (let j = 0; j < proveedores[i].detalle.length; j++) {
            for (let k = 0; k < productos.length; k++) {
                if (productos[k].nombre == proveedores[i].detalle[j].nombreproducto) {
                    proveedores[i].detalle[j].cantidad = productos[k].stock;
                    console.log(productos[k].stock)
                    console.log(productos[k].pedidocompra)
                    suma = suma + (parseInt(productos[k].stock) * parseInt(productos[k].pedidocompra))
                    console.log(suma)
                    proveedores[i].detalle[j].subtotal = parseInt(productos[k].stock) * parseInt(productos[k].pedidocompra);
                }
            }
            proveedores[i].total = suma;
        }
    }

    productos.forEach((element, i) => {

        if (productos[i].stock != aver[i]) {
            let historial1 = {
                nombre: productos[i].nombre,
                stock: aver[i],
                estado: productos[i].estado,
                accion: "compra",
                cantidad: (parseInt(productos[i].stock) - parseInt(aver[i]))
            };

            historial.push(historial1);

            localStorage.setItem("historial", JSON.stringify(historial));
        }

    });
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
    localStorage.setItem("productos", JSON.stringify(productos));
    Swal.fire({
        title: "Compra!",
        text: "Se realizó la compra!",
        icon: "success"
    });
    setTimeout(() => {
        window.location.href = 'compras-lista.html';
    }, 1000);

} function cancelar() {
    window.location.href = 'compras-lista.html';
}