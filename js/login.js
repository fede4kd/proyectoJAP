localStorage.setItem("boolean", false);


function ingresarHomePage(){
localStorage.setItem("email", document.getElementById("emailLogin").value)
localStorage.setItem("boolean", true);
}


function onSignIn2(googleUser) {
var profile = googleUser.getBasicProfile();

localStorage.setItem("email", profile.getEmail());


console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
localStorage.setItem("boolean", true);
window.location.href="index.html";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});