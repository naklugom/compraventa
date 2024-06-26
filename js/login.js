
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");

});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});





 usuarios =
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
            estado: false

        }
    ];
    localStorage.setItem('usuarios', JSON.stringify(primerusuarios));
}



function loguear() {

    let estadolog = false;
    let email = document.getElementById("emailiniciar").value;
    let contrasena = document.getElementById("contrasenainiciar").value;
    if (email != '' && contrasena != '') {
        for (let i = 0; i < usuarios.length; i++) {

            if (email == usuarios[i].email && contrasena == usuarios[i].contrasena) {


                usuarios[i].estado = true;


                estadolog = true;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
 
                    window.location.href = 'bienvenido.html';
             


                
            }
        }
        if (estadolog == false) {

            Swal.fire({
                title: "Error",
                text: "Error en usuario o contraseña",
                icon: "error"
            });
        }

    } else {
        Swal.fire({
            title: "Vacío",
            text: "No se encontraron datos",
            icon: "error"
        });
    }

}

function crearcuentanueva() {
    console.log(usuarios.length)
    let nombren = document.getElementById("nuevonombre").value;
    let emailn = document.getElementById("nuevoemail").value;
    let contran = document.getElementById("nuevocontra").value;



    if (nombren != "" && emailn != '' && contran != "") {
        let agregarusuario =
        {
            nombre: nombren,
            apellido: "Agregar",
            nombreusuarios: "Agregar",
            email: emailn,
            imagen: "pngegg.png",
            acercademi: "Agregar",
            contrasena: contran,
            estado: false
        }

        usuarios.push(agregarusuario);
        console.log(usuarios);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));



    } else {
        Swal.fire({
            title: "Vacío",
            text: "Faltan Datos",
            icon: "error"
        });
    }
     
}