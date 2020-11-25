const CATEGORIES_URL = "http://localhost:3000/categorys";
const PRODUCTS_URL = "http://localhost:3000/Products";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/Publish";
const PRODUCT_INFO_URL = "http://localhost:3000/ProductInfo";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/Comments";
const CART_INFO_URL = "http://localhost:3000/Cart";
const CART_BUY_URL = "http://localhost:3000/CartBuy"
const CATEGORY_INFO_URL = "http://localhost:3000/CatInfo";
//const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
//const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
//const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
//const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
//const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

var urlActual = window.location.href
var pasoPorLogin = localStorage.getItem("boolean");
var emailLog = localStorage.getItem("email")


function irLogin() {
  if (pasoPorLogin != "true")
    window.location.href = "login.html";
}

irLogin();


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("imageProfile", "");
    localStorage.setItem("boolean", false);
    localStorage.setItem("email", "")
    window.location.href = "login.html";
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("dropdownMenuButtonUser").innerHTML = emailLog;

  var emailUser = localStorage.getItem("email");
  var arrayUsers = JSON.parse(localStorage.getItem("arrayUsers"));
  var imgAvatar = "";
  var imgUrl;

  for (let i = 0; i < arrayUsers.length; i++) {
    
    if (emailUser == arrayUsers[i].email) {
      var imgUrl = arrayUsers[i].imgURL
      break;
    } 
  
  }

 imgAvatar += `<img src= "` + imgUrl + `" height="46px" width="46px" style="border-radius: 50%"></img>`
  

  document.getElementById("user").innerHTML = imgAvatar;
});

app.post('/RutaFormPost', (req, res) => {
  console.log(req.body.correo);
  
  res.json(
      {
              mesage: "Se escribio",
              nombre: req.body.nombre,
              edad: req.body.edad
      }
  );
  texto += "\n" + "Nombre " + req.body.nombre + " Edad " + req.body.edad;
  fs.writeFile('nombreArchivo.txt', texto, {encoding: 'utf-8'}, function(error){
      if(error){
          console.log(`Error: ${error}`);
      }else{
          console.log('La escritura se ha realizado satisfactoriamente.');
      }
  });
});