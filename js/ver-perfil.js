 usuarios =
    localStorage.getItem("usuarios") != null
        ? JSON.parse(localStorage.getItem("usuarios"))
        : crearusuarios();
let ubicacion = -1;
ubicar();
function ubicar() {
    if (ubicacion < 0) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].estado == true) {
                ubicacion = i;
            }
        } if (ubicacion < 0) {
            Swal.fire({
                title: "Error",
                text: "No estás logueado",
                icon: "error"
            });
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
    document.getElementById("nameusuario").innerHTML = `<i class="fa-solid fa-user"></i> ${usuarios[ubicacion].nombreusuarios}`
}
function cerrarses() {
    usuarios[ubicacion].estado = false;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.location.href = 'index.html';
}
mostrar();
function mostrar() {
    ubicar();
    document.getElementById("nameusuario").innerHTML = `<i class="fa-solid fa-user"></i> ${usuarios[ubicacion].nombreusuarios}`
    document.getElementById("nombre").value = usuarios[ubicacion].nombre;
    document.getElementById("apellido").value = usuarios[ubicacion].apellido;
    document.getElementById("nombre-usuario").value = usuarios[ubicacion].nombreusuarios;
    document.getElementById("email").value = usuarios[ubicacion].email;
    document.getElementById("imagen-perfil").value = usuarios[ubicacion].imagen;
    document.getElementById("acerca-de-ti").value = usuarios[ubicacion].acercademi;
    document.getElementById("nombre-usuario2").value = usuarios[ubicacion].nombreusuarios;
}
function actualizar() {
    if (document.getElementById("nombre").value != '' && document.getElementById("apellido").value != '' && document.getElementById("nombre-usuario").value != '' && document.getElementById("email").value != '' && document.getElementById("acerca-de-ti").value != '') {
        usuarios[ubicacion].nombre = document.getElementById("nombre").value;
        usuarios[ubicacion].apellido = document.getElementById("apellido").value;
        usuarios[ubicacion].nombreusuarios = document.getElementById("nombre-usuario").value;
        usuarios[ubicacion].email = document.getElementById("email").value;
        //usuarios[ubicacion].imagen = document.getElementById("imagen-perfil").value;
        usuarios[ubicacion].acercademi = document.getElementById("acerca-de-ti").value;
        Swal.fire({
            title: "Actualizado",
            text: "Se actualizaron los datos correctamente!",
            icon: "success"
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }else{
        Swal.fire({
            title: "Error",
            text: "No pueden haber datos vacíos",
            icon: "error"
        });
    }
    mostrar();
}
function actualizarcontras() {
    let ver = document.getElementById("contraseña-actual").value;
    let nuevo = document.getElementById("nueva-contraseña").value;
    let repnuevo = document.getElementById("repita-contraseña").value;

    if (nuevo != "" || ver != "" || repnuevo != "") {
        if (ver == usuarios[ubicacion].contrasena) {
            if (nuevo == repnuevo) {
                usuarios[ubicacion].contrasena = nuevo;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                Swal.fire({
                    title: "Actualizado",
                    text: "Se actualizó la contraseña!",
                    icon: "success"
                });
                document.getElementById("contraseña-actual").value = "";
                document.getElementById("nueva-contraseña").value = "";
                document.getElementById("repita-contraseña").value = "";

            } else {
                Swal.fire({
                    title: "Error",
                    text: "No ingresó la misma contraseña",
                    icon: "error"
                });

            }
        } else {
            Swal.fire({
                title: "Error",
                text: "La contraseña incorrecta!",
                icon: "error"
            });
        }
    } else {
        Swal.fire({
            title: "Error",
            text: "No pueden haber datos vacíos",
            icon: "error"
        });
    }
}