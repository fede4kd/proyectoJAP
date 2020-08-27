sessionStorage.setItem("boolean", false);


function ingresarHomePage(){
sessionStorage.setItem("email", document.getElementById("emailLogin").value)
sessionStorage.setItem("boolean", true);
sessionStorage.setItem("loginGoogle", false);
}


function onSignIn2(googleUser) {
var profile = googleUser.getBasicProfile();

sessionStorage.setItem("email", profile.getEmail());
sessionStorage.setItem("imageProfile", profile.getImageUrl());
sessionStorage.setItem("loginGoogle", true);

console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
sessionStorage.setItem("boolean", true);
window.location.href="index.html";

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});