var arrayUsers = JSON.parse(localStorage.getItem("arrayUsers")); // covierto la variable de formato JSON a un array de objetos

var emailUser = localStorage.getItem("email"); // esta variable obtiene el mail que se ingresa el imput del login cuando se hace click en el boton ingresar
var imgAvatar = "";
var imgProfile;


function showDataUser() {

  // recorro los usuarios que estan guardados y los guardo en una variable para mostrarlos luego.
  for (let i = 0; i < arrayUsers.length; i++) {
    
    // se compara el mail que se ingresa en el imput del login con los mails de los usuarios guardados, si un email es igual se muestran los datos del usuario.
    if (emailUser == arrayUsers[i].email) {
      email = arrayUsers[i].email
      imgProfile = arrayUsers[i].imgURL
      name = arrayUsers[i].nombre
      age = arrayUsers[i].edad
      phone = arrayUsers[i].telefono
      break;
    } 
  
}


var datosCuenta = `

<div class="col-12">
      <hr class="mt-2 mb-3">
      <div class="col-12 text-center" id="imgPerfil">
        <img src="`+imgProfile+`" class="avatar-perfil">
      </div>
      <div class="padding-top-2x mt-2 hidden-lg-up"></div>
      <div class="col-6 mb-4">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#uploadIMG">
      Subir imagen de perfil
      </button>
      </div>
      <form class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="account-fn">Nombre y Apellido</label>
            <input class="form-control" type="text" id="account-name" value="`+ name +`" required="">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="account-age">edad</label>
            <input class="form-control" type="text" id="account-age" value="`+ age +`" required="">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="account-email">Email</label>
            <input class="form-control" type="email" id="account-email" value="`+ email +`" readonly>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="account-phone">Telefono</label>
            <input class="form-control" type="text" id="account-phone" value="`+ phone +`" required="">
          </div>
        </div>
        <div class="col-12">
          <hr class="mt-2 mb-3">
          <div class="d-flex">
          <div class="col-12 text-right">
            <button class="btn btn-primary" type="button" onclick="saveDataUser()">Guardar datos</button>
          </div>
          </div>
        </div>
      </form>
    </div>`

    
    document.getElementById("account").innerHTML = datosCuenta; // agrego los datos del usuario
    document.getElementById("imgPerfilModal").innerHTML = `<img src="`+ imgProfile +`" class="avatar-perfil-modal">` // agrego la imagen del usuario en la pagina de mi perfil
    document.getElementById("user").innerHTML = `<img src= "` + imgProfile + `" height="46px" width="46px" style="border-radius: 50%"></img>`  //agrego la imagen del usuario en menu de navegacion
}

function uploadIMG() {
  let img;

  // recorro los usuarios que estan guardados
  for (let i = 0; i < arrayUsers.length; i++) {
    
    // se compara el mail que se ingresa en el imput del login con los mails de los usuarios guardados, si es igual se obtiene el valor del imput que tiene la URL de la imagen y se guarda
    if (emailUser == arrayUsers[i].email) {
      img = document.getElementById("URL-imagen").value;
      arrayUsers[i].imgURL = img;
      showDataUser();
      break;
    } 
  
  }

}

function showAlert(){
  let alert = `
  
  <div class="alert alert-success alert-dismissible fade show" role="alert">
  Los datos se guardaron correctamente
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`

document.getElementById("alert").innerHTML  = alert;
  

}

function saveDataUser(){

  // recorro los usuarios que estan guardados
  for (let i = 0; i < arrayUsers.length; i++) {
    // se compara el mail que se ingresa en el imput del login con los mails de los usuarios guardados, si es igual guardo los nuevos datos en el objeto correspondiente al usuario
    if (emailUser == arrayUsers[i].email) {
      arrayUsers[i].nombre = document.getElementById("account-name").value;
      arrayUsers[i].edad = document.getElementById("account-age").value;
      arrayUsers[i].telefono = document.getElementById("account-phone").value;
      break;
    } 
  } 
  localStorage.setItem("arrayUsers", JSON.stringify(arrayUsers)); // paso el array de objetos a formato JSON y lo guardo en el LocalStorage
  showAlert();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  
    showDataUser();
});