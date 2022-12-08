const productDetails = document.getElementById("productDetails");
const addToCartBtn = document.getElementById("addToCartBtn");
const goToCartBtn = document.getElementById("goToCartBtn");



function loadProductDetails() {
    const productId = window.location.search.split("=")[1];
    console.log(productId)
    fetch(BASE_URL + `/ecomm/api/v1/product/${productId}`, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data) {
                renderProductDetails(data.data[0]);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function renderProductDetails(data) {
    // console.log(data[0].name);
    const productDetailsHtml = '<div class="product-name">' + data.name + '</div>'
        + '<div class="product-price fw-bold">&#8377; ' + data.cost + '</div>'
        + '<div class="product-description">'
        + '<div class="product-description-title fw-bold">Description</div>'
        + '<div class="product-description-data">' + data.description + '</div>'
        + '</div>';

    productDetails.innerHTML = productDetailsHtml;

    if(data.addedToCart == 1) {
        goToCartBtn.classList.remove('d-none');
	    addToCartBtn.classList.add('d-none');
    }
}

function addToCartFn() {
console.log(window.location.search.split("=")[1])
    const productIds = window.location.search.split("=")[1];

    const cartId = localStorage.getItem("cartId");
    const token = localStorage.getItem("token");
    const headers = { 
		'Content-Type': 'application/json',
		'x-access-token': `${token}` };
    const data = {productId:productIds};
    
    fetch(`http://localhost:3000/ecomm/api/v1/addProduct`, {
        method: 'POST', 
        headers: headers,
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data) {
                goToCartBtn.classList.remove('d-none');
	            addToCartBtn.classList.add('d-none');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

addToCartBtn.addEventListener("click", addToCartFn);

loadProductDetails();