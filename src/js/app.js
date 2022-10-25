
import * as flsFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';

flsFunctions.isWebp();
flsFunctions.productFilter();
const products = document.querySelectorAll('.catalog__product-item');

const swiper = new Swiper();



const url = 'https://zsline.github.io/iliinsky/src/js/products.json';
const request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.send();
request.onload = function() {
    const productCategory = request.response;
    const jsonProduct = JSON.parse(productCategory);
    // console.log(jsonProduct);
    // console.log(jsonProduct.market['name-menu']);
    categoryName(jsonProduct);
  }
function categoryName (jsObj){
    let category = jsObj;
    console.log(category);
    for (let i = 0; i < category.length; i++){
        let a = i['name-menu'];
        console.log(a);
    }
}

