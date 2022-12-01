let stickyHeader = document.querySelector(".header-container");


window.addEventListener("scroll", stickUp);

function stickUp() {
  if (window.scrollY > 70) {
    stickyHeader.style.cssText = "margin-top: 0; width: 100%;";
  } else {
    stickyHeader.style.cssText = "margin-top: 40px; width: fit-content;"
  }
}

// Shopping Cart

let cartIcon = document.querySelector(".header-container .cart-icon");
let shoppingCart = document.querySelector(".shopping-cart");
let removeIcon = document.querySelector(".remove .close-icon");
// let addToCartIcon = document.querySelectorAll(".products-area .bag i");




cartIcon.addEventListener("click", showCart);

function showCart() {
  shoppingCart.style.transition = ".3s";
  shoppingCart.style.right = "0";
}

removeIcon.addEventListener("click", closeCart);

function closeCart() {
  shoppingCart.style.transition = "1s";
  shoppingCart.style.right = "-100%";
}

//

let trashIcon = document.querySelectorAll(".shopping-cart .remove-icon");


for (let i = 0; i < trashIcon.length; i++) {
  let btn = trashIcon[i]
  btn.addEventListener("click", removeFromCart);
}
function removeFromCart(event) {
  let btnClicked = event.target
  btnClicked.parentElement.remove();
  updateCartTotal();
}



let quantityInputs = document.querySelectorAll(".quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", updateCartTotal);
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".shopping-cart");
  let cartBoxes = cartItemContainer.querySelectorAll(".cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector(".price");
    let quantityElement = cartBox.querySelector(".quantity");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  console.log(total);
  document.querySelector(".cart-total-price").innerText = "$" + total;
}


// 


let productBoxes = document.querySelectorAll(".products-area .box");

let addBtns = document.querySelectorAll(".products-area .box .bag");

for (let i = 0; i < addBtns.length; i++) {
  let addBtn = addBtns[i];
  addBtn.addEventListener("click", addNewCartBox);
}

function addNewCartBox(event) {
  let addBtn = event.target;
  let productBox = addBtn.parentElement.parentElement.parentElement;
  
  let imageSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector("h4").innerText;
  let price = productBox.querySelector(".current-price").innerText;
  console.log(imageSrc, title, price);
  addProductsToCart(imageSrc, title, price);
  updateCartTotal();
}
function addProductsToCart(imageSrc, title, price) {
  let productTitles = document.querySelectorAll(".name");
  console.log(productTitles);
  for (let i = 0; i < productTitles.length; i++) {
    if (productTitles[i].innerText === title) {
      let quantityInputs = document.querySelectorAll(".quantity");
      quantityInputs[i].value++
      return
    }
    console.log(productTitles[i] === title);
  }
  let newBox = document.createElement("div");
  newBox.classList.add("cart-box");
  shoppingCart.prepend(newBox);
  console.log(shoppingCart);
  let newBoxContent = `
  <img src="${imageSrc}" alt="">
  <div class="txt">
  <h3 class="name">${title}</h3>
    <span class="price">${price}</span>
  </div>
  <input type="number" min="1" value="1" class="quantity">
  <i class="fa-solid fa-trash-can remove-icon"></i>
    `
    newBox.innerHTML = newBoxContent;
    newBox.querySelector(".remove-icon").addEventListener("click", removeFromCart);
    newBox.querySelector(".quantity").addEventListener("change", updateCartTotal);
  }
