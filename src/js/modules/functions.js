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



const products = document.querySelectorAll('.catalog__product-item');
const sidebarMenu = document.querySelectorAll('.sidebar__menu-item');

// массовое удаление класса
function deleteClass(arr, clasItem) {
    arr.forEach(item => {
        item.classList.remove(clasItem);
    })
}

// массовое добавление класса 
function addClass(arr, clasItem) {
    arr.forEach(item => {
        item.classList.add(clasItem);
    })
}


// функция фильтрации товаров

export function productFilter(productList, data) {
    productList = products;
    document.addEventListener('click', (event) => {
        deleteClass(sidebarMenu, 'active');
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
                }
            })
        }
        if (event.target.classList.contains('product__favorites')) {
            event.target.parentNode.classList.toggle('product-like');
        }
    });
}

