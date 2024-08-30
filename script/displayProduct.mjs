export const displayProduct = (menu) => {
    return `<div class="product-detail" id="${menu.id}">
            <img
              src="${menu.productImage}"
              alt="Gambar Product"
            />
            <span>${menu.productName}</span>
            <p>${menu.productTitle}</p>
            <p>${menu.price}</p>
            <div class="button-state">
              <button id="btn-addToCart">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt="Icon Add to Cart"
                />
                Add to Cart
              </button>
              <!-- <div class="btn-productAmount">
                <button class="btn-addSubstract" id="btn-substract">-</button>
                1
                <button class="btn-addSubstract" id="btn-add">+</button>
                </button>
              </div> -->
            </div>
          </div>`
}