// import displayProduct from "./displayProduct.mjs";
import {dessertsMenu} from "./dataProduct.mjs";

document.addEventListener('DOMContentLoaded', (e) => {
    if (dessertsMenu.length !== 0) {
        console.log('Ada menu')
        loadProduct();
    } else {
        console.log('tidak ada')
    }
});

const loadProduct = () => {
    for (let menu of dessertsMenu) {
        console.log(menu.id);
    }
}