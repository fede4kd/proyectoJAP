const ORDER_ASC_BY_COST = "$UP";
const ORDER_DESC_BY_COST = "$DW";
const ORDER_BY_PROD_SOLDCOUNT = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var cadena = "";
var listaProductos = document.getElementById("lista-productos")


//Filtro Productos
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList() {

    let articulo = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        let nombreProd = product.name.toLowerCase();        //toma el nombre del preducto y lo paso a minusculas
        let descProd = product.description.toLowerCase();   //toma el contenidod e la descripcion y lo paso a minusculas

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
            ((descProd.indexOf(cadena) !== -1 || (nombreProd.indexOf(cadena) !== -1)) )){   //si el indexOf devuelve -1 no existe el procuto con ese nombre o desc, con el or indicamos que si existe alguno de los dos muestro el procuto 
                
                articulo += `
                <div class="col-sm-6 col-md-4 col-xl-12">
                    <div class="d-xl-flex list-group-item mproduct">
                    <a class="border-right col-xl-3" href="product-info.html"><div class="imgProduct"><img src="` + product.imgSrc + `"></div></a>
                        <div class="col-xl-9">
                            <div class="d-lg-flex w-100 justify-content-between ">
                            <a href="product-info.html"><h4 class="mb-1">` + product.name + `</h4></a>
                                <small class="text-muted">` + product.soldCount + ` Vendidos</small>
                            </div>
                            <div class="productDesc">` + product.description + `</div>
                            <h4>`+ product.currency + ` ` + product.cost +`</h4>
                            <div class="product-buttons">
                                <button class="btn btn-primary btn-sm"><i class="fas fa-shopping-cart"></i> Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
         }

         listaProductos.innerHTML = articulo;
    }

}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){ //Llamo al json PRODUCTOS_URL
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    var txtBusqueda = document.getElementById("txtBusqueda"); //Capturo por id el imput para buscar
    txtBusqueda.addEventListener("keyup", function() {       // Ejecuto mi funcion cada vez que presiona una tecla 
        cadena = txtBusqueda.value.toLowerCase();            // convierto al texto de la busqueda en minusculas   
        showProductsList(currentProductsArray);              // Muestro los productos
        document.getElementById("prodNoEncontrado").innerHTML = '' //Dejo vacio el div de id = prodNoEncontrado para que no se repita el mensaje si se escriben varias letras y no las encuentra.

        if (listaProductos.innerHTML === "") { //si no hay ninguna lista de productos muestro un mensaje
            document.getElementById("prodNoEncontrado").innerHTML += "Producto no encontrado..."
        }

    });


}); 