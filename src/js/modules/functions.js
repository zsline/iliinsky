/* Проверка поддержки webp, добавление класса для html */
export function isWebp() {
    //проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}






const catalogProducts = document.querySelector('.catalog__products-inner');
let products = "";

let sidebarMenu = "";
//  ПОЛУЧЕНИЕ ТОВАРОВ

//  получение товаров из файла JSON на сервере

const url = 'https://zsline.github.io/iliinsky/src/js/products.json';
const request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.send();
request.onload = function () {
    const productCategory = request.response;
    const Products = JSON.parse(productCategory);
    const sidebar = document.getElementById('sidebar__menu');
    const ulProduct = document.createElement('ul');
    ulProduct.classList.add('catalog__products-list');
    catalogProducts.appendChild(ulProduct);
    for (let key of Products) {
        const ul = document.createElement('ul');
        ul.classList.add('sidebar__menu-list')
        ul.classList.add('sidebar__block')
        let row = document.createElement('h6');
        row.innerHTML = `${key.nameMenu}`;
        ul.appendChild(row);
        sidebar.appendChild(ul);


        if (key.products !== undefined) {
            for (let item of key.products) {
                let li = document.createElement('li');
                li.classList.add('sidebar__menu-item');
                li.setAttribute('data-filter', item.nameFilter);
                li.innerHTML = `${item.nameMenu}`;
                ul.appendChild(li);
            }
            key.products.forEach((element) => {
                if (element.product !== undefined) {
                    for (let item of element.product) {
                        let productBlock = document.querySelector('.catalog__products-list');
                        if (item.name !== '' && item.img !== '') {
                            productBlock.insertAdjacentHTML('afterbegin', `
                        <li class="catalog__product-item product" data-product="${element.nameFilter}">
                        <div class="product__item">
                            <img src="img/product/${item.img}" alt="product">
                            <div class="product__current">
                                <span>В наличии 2 шт</span>
                                <span>${item.price} грн</span>
                            </div>
                            <div class="product__title">
                                ${item.name}, ${item.weight}г
                            </div>
                            <div class="product__cart">
                                <div class="product__price">
                                    <div class="product__price-current">
                                    ${item.price} грн
                                    </div>
                                    <div class="product__price-old">
                                    ${item.oldprice} грн
                                    </div>
                                </div>
                                <button class="product__cart-btn" aria-label="В корзину">В корзину</button>
                            </div>
                        </div>
                        <span class="product__sale">%</span>
                        <button class="product__favorites icon-heard" aria-label="В избранное"></button>
                        </li>
                        `)
                        }
                        if(item.oldprice > 0){
                            document.querySelector('.product').classList.add('product-sale');
                        }
                    }

                }

            })
        }
        products = document.querySelectorAll('.catalog__product-item')

    }

    productFilter();
    sidebarMenu = document.querySelectorAll('.sidebar__menu-item');
}





// функция фильтрации товаров

// массовое удаление класса
function deleteClass(arr, clasItem) {
    arr.forEach(item => {
        item.classList.remove(clasItem);
    })
}


function productFilter(productList, data) {
    productList = products;
    document.addEventListener('click', (event) => {
        deleteClass(sidebarMenu, 'active')
        if (event.target.classList.contains('catalog__btn') || event.target.classList.contains('sidebar__menu-item')) {
            data = event.target.dataset.filter;
            productList.forEach(item => {
                item.classList.add('visibility-hidden')
                event.target.classList.add('active')
                if (item.dataset.product == data) {
                    item.classList.remove('visibility-hidden')
                }
                if (event.target.dataset.filter == 'all') {
                    deleteClass(products, 'visibility-hidden')
                    deleteClass(sidebarMenu, 'active')
                }
            })
        }
        if (event.target.classList.contains('product__favorites')) {
            event.target.parentNode.classList.toggle('product-like');
        }
    });
}


