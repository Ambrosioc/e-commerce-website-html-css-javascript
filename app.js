// Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// Open
cartIcon.onclick = () => {
	cart.classList.add("active");
};
// close
closeCart.onclick = () => {
	cart.classList.remove("active");
};

//  Cart Working JS
if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

// Making Function
function ready() {
	//Remove Items from Cart
	const removeCartButton = document.getElementsByClassName("cart-remove");
	for (let i = 0; i < removeCartButton.length; i++) {
		const button = removeCartButton[i];
		button.addEventListener("click", removeCartItem);
	}
	// Quantity Changes
	const quantityInput = document.getElementsByClassName("cart-quantity");
	for (let i = 0; i < quantityInput.length; i++) {
		const input = quantityInput[i];
		input.addEventListener("change", quantityChange);
	}
	// Add To Cart
	const addCart = document.getElementsByClassName("add-cart");
	for (let i = 0; i < addCart.length; i++) {
		const button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}
	//Buy Button Work
	document
		.getElementsByClassName("btn-buy")[0]
		.addEventListener("click", buyButtonClicked);
}

//
function buyButtonClicked() {
	alert("Your Order is placed");
	const cartContent = document.getElementsByClassName("cart-content")[0];
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updateTotal();
}

// Remove Item from Cart
function removeCartItem(event) {
	const buttonCliked = event.target;
	buttonCliked.parentElement.remove();
	updateTotal();
}

// Quantity Change
function quantityChange(event) {
	const input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal();
}
// Add to cart
function addCartClicked(event) {
	const button = event.target;
	const shopProducts = button.parentElement;
	const title =
		shopProducts.getElementsByClassName("product-title")[0].innerText;
	const price = shopProducts.getElementsByClassName("price")[0].innerText;
	const productImg = shopProducts.getElementsByClassName("product-img")[0].src;
	addProductToCart(title, price, productImg);
	updateTotal();
}

function addProductToCart(title, price, productImg) {
	const cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	const cartItems = document.getElementsByClassName("cart-content")[0];
	const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
	for (let i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText == title) {
			alert("You have already add this item");
			return;
		}
	}
	const cartBoxContent = `<img src=${productImg} alt="" class="cart-img" />
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity" />
    </div>
    <!-- Remove CArt -->
    <i class="bx bx-trash-alt cart-remove"></i>`;
	cartShopBox.innerHTML = cartBoxContent;
	cartItems.append(cartShopBox);
	cartShopBox
		.getElementsByClassName("cart-remove")[0]
		.addEventListener("click", removeCartItem);
	cartShopBox
		.getElementsByClassName("cart-quantity")[0]
		.addEventListener("change", quantityChange);
}
//  Update Total
function updateTotal() {
	const cartContent = document.querySelectorAll(".cart-content")[0];
	const cartBoxes = cartContent.getElementsByClassName("cart-box");
	let total = 0;
	for (let i = 0; i < cartBoxes.length; i++) {
		const cartBoxe = cartBoxes[i];
		const priceElement = cartBoxe.getElementsByClassName("cart-price")[0];
		let quantityElement = cartBoxe.getElementsByClassName("cart-quantity")[0];

		const price = parseFloat(priceElement.innerText.replace("$", ""));
		let quantity = quantityElement.value;
		console.log(quantity);
		total += price * quantity;
	}
	// If price Content some Cents value
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("total-price")[0].innerText = "$" + total;

	console.log(total);
}
