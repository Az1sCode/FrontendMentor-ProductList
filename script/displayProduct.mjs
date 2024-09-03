export function addProduct(menu) {
  return `<img
            src="${menu.image.desktop}"
            alt="Gambar Product"
          />
          <span>${menu.category}</span>
          <p>${menu.name}</p>
          <p>$${menu.price.toFixed(2)}</p>
          `
}