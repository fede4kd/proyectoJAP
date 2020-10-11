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
                    idSubTotal = "productSubtotal"+b;
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

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){ //Llamo al json PRODUCTOS_URL
        if (resultObj.status === "ok") {
            cart = resultObj.data;

            showProductsCart();
            subTotalProduct();
            modifyPurchaseData();
            shipping();
        }
    });

});
