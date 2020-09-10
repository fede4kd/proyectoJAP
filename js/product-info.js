var images = [];
var currentCommentsArray = [];

var productInfo = {};

function showProductInfo() {

    let dataProd = "";

    dataProd += `
    <!-- Poduct Gallery-->
    <div class="col-6">
        <div class="product-gallery">
            <div class="gallery-wrapper border" data-pswp-uid="1">
            </div>

            <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" id="imgCarouselProduct">
                    <div class="carousel-item active" data-interval="10000">
                        <img src="img/prod1_1.jpg" class="d-block w-100" alt="...">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleInterval" role="button"
                    data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleInterval" role="button"
                    data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <!-- img products-->
            <div>
                <div class="product-thumbnails" id="imgProdMin"">

                </div>
            </div>
        </div>
    </div>
    <!-- Product Info-->
    <div class="col-6">
        <div class="padding-top-2x mt-2 hidden-md-up"></div>
        <!-- Nombre -->
        <h2 class="padding-top-1x text-normal">` + productInfo.name + `</h2>
        <hr class="mb-3">
        <!-- Precio -->
        <h5>Precio:</h5>
        <h4>` + productInfo.currency + `  ` + productInfo.cost + `</h4>
        <!-- descripcion -->
        <h5 class="mb-3 mt-3">Descripcion:</h5>
        <p>` + productInfo.description + `</p>
        <h5>Cantidad Vendidos: ` + productInfo.soldCount + `</h5>
        <div class="mt-5">
        <i class="fas fa-tag"></i><a href="category-info.html" class="badge badge-primary ml-1"><h6">` + productInfo.category + `</h6></a>
        </div>
        <hr class="mb-3">
        <div class="sp-buttons mt-2 mb-2">
            <button class="btn btn-primary" data-toast="" data-toast-type="success"
                data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Product"
                data-toast-message="successfuly added to cart!"><i class="fas fa-shopping-cart"></i> Añadir al carrito</button>
        </div>
    </div>
        `

    document.getElementById("descProd").innerHTML = dataProd;
}

function showImagesProducts() {

    images = productInfo.images;

    let imgProdMin = "";

    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        imgProdMin += ` <a href="#` + i + `"><img class="border rounded" src="` + img + `" alt="Product"></a>`

        document.getElementById("imgProdMin").innerHTML = imgProdMin;
    }

    let imgCarousel = "";

    for (let i = 0; i < images.length; i++) {
        let img = images[i];

        if(i === 0 ){ 
            imgCarousel += `
        <div class="carousel-item active" data-interval="10000">
         <img src="` + img + `" class="d-block w-100" >
        </div>`
        }else{
            imgCarousel += `
        <div class="carousel-item" data-interval="10000">
         <img src="` + img + `" class="d-block w-100" >
        </div>`
        }

        document.getElementById("imgCarouselProduct").innerHTML = imgCarousel;
    }

}

function showRelatedProducts(){

    let relatedProdArray = productInfo.relatedProducts;
    
    let relatedProd ="";
    for (let i = 0; i < relatedProdArray.length; i++) {

            relatedProd +=`
            
            <div class="col-3 product-card border">
            <div><a class="product-thumb" href="#"><img class="imgRelated" src="`+ product[i].imgSrc +`"
                  alt="Product"></a></div>
            <p class="product-description">
            `+ product[i].description +`
            </p>
            <button class="btn btn-link" data-toast="" data-toast-type="success"
              data-toast-message="successfuly added to cart!">Ver</button>
          </div>`
            
          document.getElementById("relatedProducts").innerHTML = relatedProd;
    } 

    
}

function showComments() {

    let dataComments = "";
    for (let i = 0; i < currentCommentsArray.length; i++) {
        let com = currentCommentsArray[i];
        
        
        let score = com.score - 1;
        let star = "";
        for (let i = 0; i < 5; i++) {
    
            if(i <= score){
                star += `<i class="fas fa-star checked"></i> `;
            }else{
                star += `<i class="fas fa-star"></i> `;
            }
            
        }  
         
        dataComments += `
        
    <div class="d-flex comment" id="comment">
        <div class="comment-author-ava"><img src="img/Avatar2.png" alt="Review author"></div>
        <i class="fas fa-caret-left fa-3x"></i>
        <div class="col-11 comment-body">
            <div class="comment-header d-flex flex-wrap justify-content-between">
            <span>` + com.user + `</span>
            <p>` + com.dateTime + `</p>
            </div>
            <p>` + com.description + `</p>
            <!-- Estrellas -->
            <div class="rating-stars mb-2" id="rating` + i + `">` + star + `</div>
        </div>
        </div>
        `

        document.getElementById("commentProduct").innerHTML = dataComments;

    }

    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;

            showProductInfo();
            showImagesProducts();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;

            showComments();
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){ //Llamo al json PRODUCTOS_URL
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showRelatedProducts()
        }
    });
});