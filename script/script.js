import { addProduct } from "./displayProduct.mjs";

const productList = document.querySelector(".product-list");

document.addEventListener("DOMContentLoaded", () => {
  getDesserts();
});

async function hitAPI() {
  const dataUrl = "../data.json";
  return fetch(dataUrl);
};

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
          const getProduct = addProduct(menu);
          const productDetail = document.createElement("div");
          productDetail.classList = "product-detail";
          productDetail.innerHTML = getProduct;

          const buttonState = document.createElement("div");
          buttonState.classList = "button-state";
          buttonAddToCart(buttonState);
          productDetail.append(buttonState);

          productList.append(productDetail);
        });
      }
    })
    .catch((error) => console.log(error));
}

const buttonAddToCart = (buttonState) => {
  let amount = 0;

  const btnAddToCart = document.createElement("button");
  btnAddToCart.classList = "btn-addToCart";
  btnAddToCart.textContent = "Add to Cart";

  const iconCart = document.createElement("img");
  iconCart.src = "./assets/images/icon-add-to-cart.svg";
  iconCart.alt = "Icon Cart";
  btnAddToCart.append(iconCart);

  const btnProductAmount = document.createElement("div");
  btnProductAmount.classList = "btn-productAmount";

  const productAmount = document.createElement("p");

  const btnSubstract = document.createElement("button");
  btnSubstract.classList = "btn-addSubstract";
  btnSubstract.textContent = "-";

  const btnAdd = document.createElement("button");
  btnAdd.classList = "btn-addSubstract";
  btnAdd.textContent = "+";

  btnProductAmount.append(btnSubstract, productAmount, btnAdd);
  buttonState.append(btnAddToCart, btnProductAmount);

  btnAddToCart.addEventListener("click", (e) => {
    amount++;
    productAmount.textContent = amount;
    if (amount >= 1) {
      btnProductAmount.style.display = "flex";
      btnAddToCart.style.display = "none";
    }
  });

  btnAdd.addEventListener("click", (e) => {
    amount++;
    productAmount.textContent = amount;
  });

  btnSubstract.addEventListener("click", (e) => {
    amount--;
    productAmount.textContent = amount;
    if (amount < 1) {
      btnProductAmount.style.display = "none";
      btnAddToCart.style.display = "inline";
    }
  });
};