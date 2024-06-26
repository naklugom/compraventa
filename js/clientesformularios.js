
 


function guardarclientes() {
    const nombre = document.getElementById("modnombreclientes").value;
    const apellido = document.getElementById("modapellidoclientes").value;
    const numeroidentificacion = document.getElementById("modnidenclientes").value;



    const estado = document.querySelector("input[name='options-outlined']:checked").value === "true";

    let pos = clientes.length;

    if (nombre !== "" && apellido !== "" && numeroidentificacion !== "" ) {
        let subprov =
        {
            cliente: pos,
            nombre: nombre,
            apellido: apellido,
            numeroidentificacion: numeroidentificacion,
    
            total: "",
            estado: estado,
            detalle: []
        };


         


        clientes.push(subprov);

        localStorage.setItem('clientes', JSON.stringify(clientes));

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
    window.location.href = 'clientes-lista.html';
}