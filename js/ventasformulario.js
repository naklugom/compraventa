
proveedores =localStorage.getItem("clientes") != null? JSON.parse(localStorage.getItem("clientes")): [];
productos =
    localStorage.getItem("productos") != null
        ? JSON.parse(localStorage.getItem("productos"))
        : [];

historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : [];
clientes =
    localStorage.getItem("clientes") != null
        ? JSON.parse(localStorage.getItem("clientes"))
        : [];
let ver = -1;

aclientesselect()

function aclientesselect() {
    //localStorage.clear()
    let texto = "";
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].estado == true) {
            texto += `<option value="${i}" onchange="listacompras1( )">${clientes[i].nombre}</option>`;
            ver++;
        }
    }
    clientesselect.innerHTML = texto;

}
let sumatoriolistaa = 0;
let sumatoriolistab = 0;
let pos = 0;
let asd2 = parseInt(0);
let aver = productos;
let aver2 = clientes;
averdo();
function averdo() {
    ////localStorage.clear();
    for (let j = 0; j < productos.length; j++) {
        productos[j].cantidad = 0

    }
    for (let j = 0; j < clientes.length; j++) {
        for (let k = 0; k < clientes[j].detalle.length; k++) {
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
            title: "Error clientes",
            text: "No se encontraron clientes",
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
        let dato = document.getElementById("clientesselect").value;
        let tabla = document.querySelector("#tablaventa tbody ");
        let filas = "";
        let suma = 0;
        let x = 0;
        for (let i = 0; i < productos.length; i++) {

            filas += `<tr ${productos[i].estado ? " " : "class='table-danger'"}>
          <td>${productos[i].nombre} </td>
          <td>${productos[i].codigo} </td>
          <td>${productos[i].marca} </td>
            <td><span class="badge bg-primary">${productos[i].stock}</span></td>
          <td>
          <div class="btn-group d-flex text-center">
            <button type="button"  ${productos[i].estado ? `class="btn btn-sm btn-danger" onclick="suma(${i},-1)"` : `class="btn btn-sm btn-secondary"  `} ">➖</button>
            <button type="button" class="btn btn-sm btn-ligth" >${aver2[dato].detalle[i].cantidad} </button>
 
             <button type="button"${productos[i].estado ? `class="btn btn-sm btn-success" onclick="suma(${i},1)"` : `class="btn btn-sm btn-secondary"  `} >➕</button>
          </div>
          </td>
          <td>${productos[i].pedidoventa} </td>
          <td>${x = parseInt(aver2[dato].detalle[i].cantidad) * parseInt(productos[i].pedidoventa)} </td>
          <td>
         
            <div class="btn-group d-flex text-center">
            <button type="button" class="btn btn-danger btn-sm " onclick="eliminarproducto(${i})">🚫</button>
            </div>
          </td>
        </tr>`;
            suma = suma + x
        }

        listacompras2()
        clientes[dato].total = suma;
        document.getElementById("taotalcarrito").value = suma;
        pos = dato;
        tabla.innerHTML = filas;
    }
}


function suma(a, b) {
    let v = null
    if (b != 2) {
        aver2[pos].detalle[a].cantidad = parseInt(aver2[pos].detalle[a].cantidad) + parseInt(b);
        if (aver2[pos].detalle[a].cantidad < 0) {
            aver2[pos].detalle[a].cantidad = 0;
        }
        if (aver2[pos].detalle[a].cantidad >= aver[a].stock) {
            aver2[pos].detalle[a].cantidad = aver[a].stock;
        }

        clientes[pos].detalle[a].cantidad = aver2[pos].detalle[a].cantidad;


        for (let j = 0; j < productos.length; j++) {


            if (productos[j].nombre == clientes[pos].detalle[a].nombreproducto) {

                productos[j].stock = parseInt(productos[j].stock) - parseInt(b);

                if (productos[j].stock > aver[j].stock) {

                    productos[j].stock = aver[j].stock;
                }
                if (productos[j].stock <= 0) {

                    productos[j].stock = 0;
                }
            }
        }

    } else {
        for (let j = 0; j < clientes.length; j++) {
            for (let k = 0; k < clientes[j].detalle.length; k++) {
                if (productos[a].nombre == clientes[j].detalle[k].nombreproducto) {

                    clientes[j].detalle[k].cantidad = 0;
                    aver2[j].detalle[k].cantidad = 0
                    productos[a].stock = aver[a].stock;
                }
            }
        }
    }


    listacompras1(); listacompras2();
}





function listacompras2() {

    let dato = document.getElementById("clientesselect").value;
    let tabla = document.querySelector("#productosregistrados tbody");
    let filas = "";
    let suma = 0;
    for (let i = 0; i < clientes[dato].detalle.length; i++) {
        if (clientes[dato].detalle[i].cantidad >= 1) {
        filas += `
            <tr ${productos[i].estado ? " " : `class='table-danger'`}>
                <td>${clientes[dato].detalle[i].nombreproducto} </td>
                <td>${clientes[dato].detalle[i].codigo} </td>
                <td>${clientes[dato].detalle[i].marca} </td>
               <td><span class="badge bg-primary">${clientes[dato].detalle[i].cantidad}</span></td>
                <td>${clientes[dato].detalle[i].precio_unitario} </td>
                <td>
                    <div class="btn-group d-flex text-center">
                        <button type="button" ${productos[i].estado ? `class="btn btn-danger btn-sm " onclick="eliminarproducto(${i})"` : `class="btn btn-secondary btn-sm "  `} >🚫</button>
                    </div>
                </td>
            </tr>`;
        suma = suma + (parseInt(clientes[dato].detalle[i].cantidad) * parseInt(clientes[dato].detalle[i].precio_unitario))
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

    for (let i = 0; i < clientes.length; i++) {
        let suma = 0;
        for (let j = 0; j < clientes[i].detalle.length; j++) {
            for (let k = 0; k < productos.length; k++) {
                clientes[i].detalle[j].cantidad = productos[k].stock;


                suma = suma + parseInt(clientes[i].detalle[j].cantidad) * parseInt(clientes[i].detalle[j].precio_unitario);

                clientes[i].detalle[j].subtotal = parseInt(clientes[i].detalle[j].cantidad) * parseInt(clientes[i].detalle[j].precio_unitario);

                clientes[i].total = suma;
            }
        }
    }

    productos.forEach((element, i) => {

        if ((parseInt(aver[i].stock) - parseInt(productos[i].stock)) > 0) {
            let historial1 = {
                nombre: productos[i].nombre,
                stock: aver[i].stock,
                estado: productos[i].estado,
                accion: "vende",
                cantidad: (parseInt(aver[i].stock) - parseInt(productos[i].stock)),
            };
            console.log(historial1)
            historial.push(historial1);

            localStorage.setItem("historial", JSON.stringify(historial));
        }

    });
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("productos", JSON.stringify(productos));
    Swal.fire({
        title: "Compra!",
        text: "Se realizó la compra!",
        icon: "success"
    });
    setTimeout(() => {
        window.location.href = 'ventas-lista.html';
    }, 1000);

} function cancelar() {
    window.location.href = 'ventas-lista.html';
}