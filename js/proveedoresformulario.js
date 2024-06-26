
proveedores =
    localStorage.getItem("proveedores") != null
        ? JSON.parse(localStorage.getItem("proveedores"))
        : []; 

function guardarproveedores() {
    const nombre = document.getElementById("modnombreproveedores").value;
    const apellido = document.getElementById("modapellidoproveedores").value;
    const numeroidentificacion = document.getElementById("modnidenproveedores").value;
    const contacto = document.getElementById("modcontactoproveedores").value;


    const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";

    let pos = proveedores.length;

    if (nombre !== "" && apellido !== "" && numeroidentificacion !== "" && contacto !== "") {
        let subprov =
        {
            proveedor: pos,
            nombre: nombre,
            apellido: apellido,
            numeroidentificacion: numeroidentificacion,
            contacto: contacto,
            total: "",
            estado: estado,
            detalle: []
        };
        proveedores.push(subprov);

        localStorage.setItem('proveedores', JSON.stringify(proveedores));

        Swal.fire({
            title: "Guardado!!!",
            text: "Registro Exitoso",
            icon: "success",
        });volver();
    } else {
        Swal.fire({
            title: "Error",
            text: "No se puede registrar datos vacíos.",
            icon: "error",
        });
    }
}
function volver() {
    window.location.href = 'proveedores-lista.html';
}