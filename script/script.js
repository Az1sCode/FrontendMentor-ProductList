// import { addProduct } from "./displayProduct.mjs";
const cartList = [];
const cartState = "CART_STATE";
const productList = document.querySelector(".product-list");

document.addEventListener("DOMContentLoaded", () => {
  getDesserts();
  document.dispatchEvent(new Event(cartState));
});

async function hitAPI() {
  const dataUrl = "../data.json";
  return fetch(dataUrl);
}

async function getDesserts() {
  hitAPI()
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mendapatkan API");
      }
      const json = response.json();
      return json;
    })
    .then((data) => {
      if (data.length === 0) {
        const containerEmpty = document.createElement("p");
        containerEmpty.innerHTML = "Desserts Empty";
        productList.append(containerEmpty);
      } else {
        data.forEach((menu) => {
          let order = 0;

          const imgProduct = document.createElement("img");
          imgProduct.src = menu.image.desktop;
          imgProduct.alt = "Gambar Product";

          const productCategory = document.createElement("span");
          productCategory.textContent = menu.category;

          const productName = document.createElement("p");
          productName.textContent = menu.name;

          const productPrice = document.createElement("p");
          productPrice.textContent = `$${menu.price.toFixed(2)}`;

          const productDetail = document.createElement("div");
          productDetail.classList = "product-detail";

          const buttonState = document.createElement("div");
          buttonState.classList = "button-state";

          const btnOrderAmount = document.createElement("div");
          btnOrderAmount.classList = "btn-productAmount";

          const productOrder = document.createElement("p");

          const btnSubstract = document.createElement("button");
          btnSubstract.classList = "btn-addSubstract";
          btnSubstract.textContent = "-";

          const btnAdd = document.createElement("button");
          btnAdd.classList = "btn-addSubstract";
          btnAdd.textContent = "+";

          const btnAddToCart = document.createElement("button");
          btnAddToCart.classList = "btn-addToCart";
          btnAddToCart.textContent = "Add to Cart";

          const iconCart = document.createElement("img");
          iconCart.src = "./assets/images/icon-add-to-cart.svg";
          iconCart.alt = "Icon Add to Cart";

          productDetail.append(
            imgProduct,
            productCategory,
            productName,
            productPrice,
            buttonState
          );
          productList.append(productDetail);

          btnAddToCart.appendChild(iconCart);
          buttonState.appendChild(btnAddToCart);
          btnOrderAmount.append(btnSubstract, productOrder, btnAdd);
          buttonState.appendChild(btnOrderAmount);

          btnAddToCart.addEventListener("click", () => {
            order += 1;
            let totalProduct = menu.price * order;
            productOrder.textContent = order;
            btnAddToCart.style.display = "none";
            btnOrderAmount.style.display = "flex";

            const product = putInCart(
              menu.name,
              order,
              menu.price,
              totalProduct
            );
            cartList.push(product);
            displayToCart(product);
            document.dispatchEvent(new Event(cartState));
          });

          btnSubstract.addEventListener("click", (e) => {
            let cart = getCart(menu);
            cart.orderAmount -= 1;
            cart.totalProduct = (cart.totalProduct - cart.priceProduct).toFixed(
              2
            );
            productOrder.textContent = order;
            substractOrder(cart);
            if (cart.orderAmount < 1) {
              btnAddToCart.style.display = "inline";
              btnOrderAmount.style.display = "none";
              removeCart(cart);
            }
            document.dispatchEvent(new Event(cartState));
          });

          btnAdd.addEventListener("click", (e) => {
            let cart = getCart(menu);
            cart.orderAmount += 1;
            cart.totalProduct = (cart.priceProduct * cart.orderAmount).toFixed(2);
            productOrder.textContent = cart.orderAmount;
            addOrder(cart);
            document.dispatchEvent(new Event(cartState));
          });
        });
      }
    })
    .catch((error) => console.log(error));
}

document.addEventListener(cartState, (e) => {
  let total = 0;
  let amount = 0;
  for (let cart of cartList) {
    total += parseFloat(cart.totalProduct);
    amount += parseFloat(cart.orderAmount);
  };

  const amountCart = document.getElementById('amount-cart');
  amountCart.textContent = amount;

  const totalPrice = document.getElementById('total-price');
  totalPrice.textContent = `$${total.toFixed(2)}`;

  const emptyCart = document.querySelector('.empty-cart')
  const displayCart = document.querySelector('.display-cart');
  if (cartList.length === 0) {
    displayCart.style.display = 'none';
    emptyCart.style.display = 'flex'
  } else {
    displayCart.style.display = 'flex';
    emptyCart.style.display = 'none'
  }
})

const displayToCart = (product) => {
  const listCart = document.querySelector(".list-cart");

  const productCart = document.createElement("div");
  productCart.classList = "product-cart";

  const detailCartProduct = document.createElement("div");
  detailCartProduct.classList = "detail-cart-product";

  const nameDessert = document.createElement("h3");
  nameDessert.textContent = product.nameDessert;

  const amountPrice = document.createElement("div");
  amountPrice.classList = "amount-price";

  const amountOrder = document.createElement("p");
  amountOrder.classList = "amount-order";
  amountOrder.textContent = `${product.orderAmount}x`;

  const priceProduct = document.createElement("p");
  priceProduct.classList = "price-product";
  priceProduct.textContent = `$${product.priceProduct} $${product.totalProduct}`;

  const btnClose = document.createElement("button");
  btnClose.classList = "button-close";

  const imgClose = document.createElement("img");
  imgClose.src = "./assets/images/icon-remove-item.svg";
  imgClose.alt = "Remove Icon";
  btnClose.appendChild(imgClose);

  btnClose.addEventListener("click", (e) => {
    // let index = getIndex(product);
    removeCart(product)
  });

  amountPrice.append(amountOrder, priceProduct);
  detailCartProduct.append(nameDessert, amountPrice);
  productCart.append(detailCartProduct, btnClose);
  listCart.append(productCart);
};

const putInCart = (nameDessert, orderAmount, priceProduct, totalProduct) => {
  return {
    nameDessert: nameDessert,
    orderAmount: orderAmount,
    priceProduct: priceProduct.toFixed(2),
    totalProduct: totalProduct.toFixed(2),
  };
};

const getIndex = (cart) => {
  for (let i = 0; i < cartList.length; i++) {
    if (cart.nameDessert === cartList[i].nameDessert) {
      return i;
    }
  }
};

const getCart = (menu) => {
  for (let cart of cartList) {
    if (menu.name === cart.nameDessert) {
      return cart;
    }
  }
};

const addOrder = (cart) => {
  const index = getIndex(cart);
  const amountOrder = document.querySelectorAll(".amount-order");
  amountOrder[index].textContent = `${cart.orderAmount}x`;

  const priceProduct = document.querySelectorAll(".price-product");
  priceProduct[
    index
  ].textContent = `$${cart.priceProduct} $${cart.totalProduct}`;
};

const substractOrder = (cart) => {
  const index = getIndex(cart);
  const amountOrder = document.querySelectorAll(".amount-order");
  amountOrder[index].textContent = `${cart.orderAmount}x`;

  const priceProduct = document.querySelectorAll(".price-product");
  priceProduct[
    index
  ].textContent = `$${cart.priceProduct} $${cart.totalProduct}`;
};

const removeCart = (cart) => {
  let index = getIndex(cart);

  if (index === null) return;

  cartList.splice(index, 1);
  const productCart = document.querySelector(".product-cart");
  productCart.remove();
};
