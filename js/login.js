sessionStorage.setItem("boolean", false);

// Si no tine ningun dato la variable es de tipo array
if (localStorage.getItem("arrayUsers") == null) {
    localStorage.setItem("arrayUsers", '[]')
}

function ingresarHomePage(){
localStorage.setItem("email", document.getElementById("emailLogin").value)
localStorage.setItem("boolean", true);
sessionStorage.setItem("loginGoogle", false);

newUser();
}

function newUser(){
    
    // Paso los datos del localStorge que estan en strig a una lista de objetos
    let arrayUsers = JSON.parse(localStorage.getItem("arrayUsers"));
    
    let bandera;
    // Obtengo el mail que ingresan en el login
    let userEmail = document.getElementById("emailLogin").value;
    
    for (let i = 0; i < arrayUsers.length; i++) {
        if (userEmail == arrayUsers[i].email) {
            bandera = true;
            break;
        }

    }
    // Si la bandera es diferente de True ingreso un nuevo usuario
    if (bandera !== true) {
        arrayUsers.push({
            nombre: "",
            email: userEmail,
            edad: "",
            telefono: "",
            imgURL: "img/Avatar2.png"
    
        });

        localStorage.setItem("arrayUsers", JSON.stringify(arrayUsers));
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});