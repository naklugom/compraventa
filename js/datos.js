let usuarios =
    localStorage.getItem("usuarios") != null
        ? JSON.parse(localStorage.getItem("usuarios"))
        : crearusuarios();
function crearusuarios() {
    let primerusuarios = [
        {
            nombre: "Pablo",
            apellido: "Omonte",
            nombreusuarios: "Pabs",
            email: "pabs@gmail.com",
            imagen: "pngegg.png",
            acercademi: "Rico Chango",
            contrasena: "12345678",
            estado: false,
        },
    ];
    localStorage.setItem("usuarios", JSON.stringify(primerusuarios));
}
let proveedores =
    localStorage.getItem("proveedores") != null
        ? JSON.parse(localStorage.getItem("proveedores"))
        : crearproveedores();
function crearproveedores() {
    let compras = [
        {
            proveedor: 0,
            nombre: "Pablo",
            apellido: "Omonte",
            numeroidentificacion: "00001",
            contacto: 72007128,
            total: 46000,
            estado: true,
            detalle: [
                {
                    nombreproducto: "Samsung S24+",
                    codigo: "cel - 001",
                    marca: "Samsung",
                    cantidad: 5,
                    precio_unitario: 7000,
                    subtotal: 35000,
                },
                {
                    nombreproducto: "Samsung S23+",
                    codigo: "cel - 002",
                    marca: "Samsung",
                    cantidad: 2,
                    precio_unitario: 5500,
                    subtotal: 1100,
                }
            ]
        },
        {
            proveedor: 1,
            nombre: "Pabluuu",
            apellido: "Omont",
            numeroidentificacion: "00001",
            contacto: 72007126,
            total: 10800,
            estado: true,
            detalle: [
                {
                    nombreproducto: "Samsung 23 pulgadas",
                    codigo: "tv - 001",
                    marca: "Samsung",
                    cantidad: 2,
                    precio_unitario: 1400,
                    subtotal: 2800,
                },
                {
                    nombreproducto: "lg 12 pulgadas",
                    codigo: "tv - 002",
                    marca: "lg",
                    cantidad: 5,
                    precio_unitario: 1600,
                    subtotal: 8000,
                }
            ]
        },
    ];
    localStorage.setItem("proveedores", JSON.stringify(compras));
}
let clientes =
    localStorage.getItem("clientes") != null
        ? JSON.parse(localStorage.getItem("clientes"))
        : crearclientes();
function crearclientes() {
    let ventas = [
        {
            cliente: 0,
            nombre: "Tico",
            apellido: "Alanoca",
            numeroidentificacion: "00001",

            total: 0,
            estado: true,
            detalle: [ 
            ]
        },
        {
            cliente: 0,
            nombre: "Guty",
            apellido: "Alanoca",
            numeroidentificacion: "00002",

            total: 0,
            estado: true,
            detalle: [ 
            ]
        },
    ];
    localStorage.setItem("clientes", JSON.stringify(ventas));
}

let productos =
    localStorage.getItem("productos") != null
        ? JSON.parse(localStorage.getItem("productos"))
        : crearproductos();
function crearproductos() {
    let compras = [
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
    localStorage.setItem("productos", JSON.stringify(compras));
}
let historial =
    localStorage.getItem("historial") != null
        ? JSON.parse(localStorage.getItem("historial"))
        : crearhistorial();
function crearhistorial() {
    //agrega, edita,elimina,compra,vende
    let compras = [
        {
            nombre: "Samsung S24+",
            stock: 5,
            estado: true,
            accion: "agrega",
            cantidad: 0,
        },
        {
            nombre: "Samsung S23+",
            stock: 2,
            estado: true,
            accion: "agrega",
            cantidad: 0,
        },
        {
            nombre: "Samsung 23 pulgadas",
            stock: 2,
            estado: true,
            accion: "agrega",
            cantidad: 0,
        },
        {
            nombre: "lg 12 pulgadas",
            stock: 5,
            estado: true,
            accion: "agrega",
            cantidad: 0,
        },
        /*let historial1 = {
                nombre: productos[i].nombre,
                stock: aver[i],
                estado: productos[i].estado,
                accion: "compra",
                cantidad:(parseInt(productos[i].stock)-parseInt(aver[i]))
            };

            historial.push(historial1);

            localStorage.setItem("historial", JSON.stringify(historial));*/

    ];
    localStorage.setItem("historial", JSON.stringify(compras));
}
ubicacion = -1;
ubicar();
function ubicar() {
    if (ubicacion < 0) {

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].estado == true) {
                ubicacion = i;
            }

        } if (ubicacion < 0) {


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-danger",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "No estás logueado",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Salir",
                cancelButtonText: "",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'index.html';
                }
            });

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        }
    }
    document.getElementById("nameusuario").innerHTML = `<i class="fa-solid fa-user"></i> ${usuarios[ubicacion].nombreusuarios}`
}
function cerrarses() {
    usuarios[ubicacion].estado = false;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.location.href = 'index.html';
}