var productsArray = [];

function showProductsList(array) {

    let articulo = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        articulo += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                        <small class="text-muted">Vendidos `+ product.soldCount + `</small>
                    </div>
                    <div>` + product.description + `</div>
                    
                </div>
            </div>
            <div class="row col-9 float-right">
                <div class=""><b>`+ product.currency + ` ` + product.cost +`</b></div>
            </div>
        </div>
        `
        document.getElementById("lista-productos").innerHTML = articulo;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});