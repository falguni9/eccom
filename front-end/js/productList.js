const categoryList = document.getElementById("categoryList");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const clear  = document.getElementById("clear");

let query = '';
//get all cetegories list function
function loadCategories() {
    
    fetch(BASE_URL + '/ecomm/api/v1/categories', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
                renderCategories(data.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function renderCategories(categories) {
    let categoryListHtml = '';
    for(i = 0; i < categories.length; i++) {
        categoryListHtml += '<a class="d-flex text-decoration-none" href="productList.html?categoryId=' + categories[i].id + '">' + categories[i].name + '</a>';
    }

    categoryList.innerHTML = categoryListHtml;
}
//load all product function

function loadProducts() {
    const data = {};
    if(window.location.search) {
        // console.log( window.location.search.split("=")[1])
        data.id = window.location.search.split("=")[1];
        // console.log(data.id)
    }
    let URI = '/ecomm/api/v1/products'
    if(data.id){
        //get product by product id URL
        URI = `/ecomm/api/v1/products/${data.id}`         
    }
    fetch(BASE_URL + URI, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data)
                renderProducts(data.data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



function renderProducts(products) {
    let productListHtml = '';
    for(i = 0; i < products.length; i++) {
        productListHtml += '<a class="product-item text-decoration-none d-inline-block" href="productDetails.html?productId=' + products[i].id + '">'
        + '<div class="product-img">'
        + '<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg">'
        + '</div>'
        + '<div class="product-name text-center">' + products[i].name + '</div>'
        + '<div class="product-price text-center">&#8377; ' + products[i].cost + '</div>'
        + '</a>';
    }

    productList.innerHTML = productListHtml;
}

loadCategories();
loadProducts();

function searchProduct(e) {
    const data = {
        name: searchInput.value,
        minCost: minPrice.value,
        maxCost: maxPrice.value

    };
    
    // if(window.location.search) {
    //     data.id = window.location.search.split("=")[1];
    // }

    let URI = '/ecomm/api/v1/productsByCostRange/?'
        console.log(BASE_URL + URI + new URLSearchParams(data))
    fetch(BASE_URL + URI + new URLSearchParams(data)
    , {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        
    })
    .then(response => response.json())
    .then(data => {
            console.log(data.data)
            renderProducts(data.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function clearAllFilter(e){
    window.location.href = 'productList.html'
    // URI = '/ecomm/api/v1/products'
    // loadProducts();
    // // window.location.reload();
}
searchInput.addEventListener("keyup", searchProduct);
minPrice.addEventListener("change", searchProduct);
maxPrice.addEventListener("change", searchProduct);
clear.addEventListener("click",clearAllFilter);