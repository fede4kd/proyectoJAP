var shippingPercentage = 0.15;

function shipping() {
    //Seleccionas todos los elementos con clase radio
    var input = document.getElementsByClassName("radio");

    //Recorro la cantidad de radioButtons
    for (var i=0; i< input.length; i++) {
        //Se Añade un evento a cada elemento
        input[i].addEventListener("click",function() {
            idRadioButton = this.id
            shippingPercentage = document.getElementById(idRadioButton).value
            modifyPurchaseData();
        });
    }

}

function showProductsCart() {
    
    let productCart ="";
    for (let i = 0; i < cart.articles.length; i++) {

        subTotal = cart.articles[i].unitCost * cart.articles[i].count 

        productCart +=`
            
        <tr Id="tr`+ i +`"> 
        <td class="text-center" id="nomProduct"> 
            <img src= `+cart.articles[i].src+`> 
        </td>
        <td>
            <h5>`+cart.articles[i].name+`</h5>
        </td>
        <td class="text-center precio">
            <h4 id="precio`+ i +`">`+cart.articles[i].currency+` `+ cart.articles[i].unitCost +`</h4>
        </td>
        <td class="cant">
            <input class="form-control cantidad" type="number" id="cant`+ i +`" min="1" value="`+ cart.articles[i].count +`">
        </td>
        <td class="text-center">
            <h4 id="productSubtotal`+ i +`">`+cart.articles[i].currency+` `+ subTotal +`</h4>
        </td>
        <td class="text-center">
            <button id="remove`+ i +`" class="btn btn-sm btn-outline-danger" onclick="removeProducts(this)"><i class="fas fa-times remove"></i></button>
        </td>
      </tr>`
            
          document.getElementById("TableProductsCart").innerHTML = productCart;
    } 
}

function subTotalProduct() {
        //Seleccionas todos los elementos con clase cantidad
        var input = document.getElementsByClassName("cantidad");
    
        //Recorro la cantidad de productos en el carrito
        for (var i=0; i< input.length; i++) {
            //Se Añade un evento a cada elemento
            input[i].addEventListener("change",function() {
                idCantidad = this.id
                let cantidad = document.getElementById(idCantidad).value;
                let idPrecio;
                let precio ="";
                let arrPrecio = []; 
                let comparacion = "";
                let idSubTotal = ""; 
                // recorro la cantidad de productos para usar el id correcto
                for (let b = 0; b < input.length; b++) {
                    comparacion = "cant"+b;
                    idSubTotal = "productSubtotal"+b
                    if (idCantidad === comparacion) {
                        idPrecio = "precio"+b;
                        valorPrecio = document.getElementById(idPrecio).textContent;
                        arrPrecio = valorPrecio.split(" ")
                        precio = arrPrecio[1]
                        break;
                    }
                }
                let subTotal =   precio * cantidad ;
                document.getElementById(idSubTotal).innerHTML = `<h4 id="`+ idSubTotal+`">`+ arrPrecio[0] + " "+subTotal +`</h4>`

                modifyPurchaseData()
            });
        }

}

function modifyPurchaseData() {
    // listo todos los elementos que que tienen id precio
    let producto= document.querySelectorAll(".precio");
    let txtPrecio = "";
    let total = 0;
    let subTotal = 0;
    let arrPrecio= [];
    let shippingCost = 0;

     for (let i = 0; i < producto.length; i++) {
        // busco el h4 que tiene que tiene el id del subtotal 
        let h4 = producto[i].nextElementSibling.nextElementSibling.children
        // obtengo el id del subtotal
        let idSubtotal = h4[0].id
        txtPrecio = document.getElementById(idSubtotal).outerText
        // paso el texto del subtotal a un array y lo separo por un espacio
        arrPrecio = txtPrecio.split(" ")
        // agarro la divisa del producto
        precio = parseInt(arrPrecio[1]);
        //si la moneda del producto es igual a USD lo multiplico por 40
        if (arrPrecio[0] === "USD"){
            precio = precio * 40;
        }

        subTotal = subTotal + precio;
    }   

    shippingCost = subTotal * shippingPercentage
    shippingCost = parseInt(shippingCost);
    total = subTotal + shippingCost
   
    document.getElementById("productSubTotal").innerHTML = subTotal;
    document.getElementById("shippingCost").innerHTML = shippingCost;
    document.getElementById("totalCost").innerHTML = total

}


function removeProducts( b ){

    let tbody = document.getElementById("TableProductsCart");
    let trId = "";
    trId=b.parentNode.parentNode.id;
    let idButton = b.id;
    trId=b.parentNode.parentNode.id;
    let tr = document.getElementById(trId);

    if(idButton === "borrarTodo"){
        let productos = document.querySelectorAll("#TableProductsCart tr");
        for (let i = 0; i < productos.length; i++) {
            tbody.removeChild(productos[i]);
        }    
    }else{
        tbody.removeChild(tr); 
    }
    modifyPurchaseData();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("http://localhost:3000/Cart").then(function(resultObj){ //Llamo al json PRODUCTOS_URL
        if (resultObj.status === "ok") {
            cart = resultObj.data;

            showProductsCart();
            subTotalProduct();
            modifyPurchaseData();
            shipping();
        }
    });

});

const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
      yearExpiracion = document.querySelector('#tarjeta .year');
      ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '')
    // Ponemos espacio cada cuatro numeros
    .replace(/([0-9]{4})/g, '$1 ')
    // Elimina el ultimo espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    } else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Volteamos la tarjeta para que el usuario vea el frente.
    mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = '________ _______';
    }

    mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;
});
