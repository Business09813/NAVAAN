// ==========================================
// NAVAAN CLOTHING STORE
// ==========================================

// WhatsApp ordering number
const whatsappNumber = "923121106924";

// Cart
let cart = [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(name, price, button) {

    const productCard = button.closest(".product-card");

    if (!productCard) {
        alert("Product could not be added.");
        return;
    }

    const sizeSelect = productCard.querySelector(".size-select");
    const quantityInput = productCard.querySelector(".quantity-input");

    const size = sizeSelect.value;
    const quantity = parseInt(quantityInput.value, 10);


    // Check size
    if (size === "") {
        alert("Please select a size first.");
        return;
    }


    // Check quantity
    if (!quantity || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }


    // Add product
    cart.push({
        name: name,
        price: price,
        size: size,
        quantity: quantity
    });


    updateCart();

    // Open cart
    openCart();
}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");


    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "0";

        return;
    }


    let html = "";
    let total = 0;
    let itemCount = 0;


    cart.forEach(function(item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;


        html += `
            <div class="cart-item">

                <div class="cart-item-top">

                    <h4>${item.name}</h4>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        ✕
                    </button>

                </div>

                <p>Size: ${item.size}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>
                    Rs. ${itemTotal.toLocaleString()}
                </p>

            </div>
        `;
    });


    cartItems.innerHTML = html;

    cartCount.textContent = itemCount;

    cartTotal.textContent =
        total.toLocaleString();
}


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

function removeFromCart(index) {

    if (index < 0 || index >= cart.length) {
        return;
    }

    cart.splice(index, 1);

    updateCart();
}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    const cartElement = document.getElementById("cart");
    const overlay = document.getElementById("cartOverlay");


    if (cartElement) {
        cartElement.classList.add("active");
    }

    if (overlay) {
        overlay.classList.add("active");
    }
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    const cartElement = document.getElementById("cart");
    const overlay = document.getElementById("cartOverlay");


    if (cartElement) {
        cartElement.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }
}


// ==========================================
// OPEN CHECKOUT
// ==========================================

function openCheckout() {

    // Make sure cart has products
    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    closeCart();


    const checkout = document.getElementById("checkout");

    if (checkout) {
        checkout.classList.add("active");

        // Scroll to checkout
        checkout.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// ==========================================
// CLOSE CHECKOUT
// ==========================================

function closeCheckout() {

    const checkout = document.getElementById("checkout");

    if (checkout) {
        checkout.classList.remove("active");
    }
}


// ==========================================
// SEND ORDER TO WHATSAPP
// ==========================================

function sendOrderToWhatsApp() {

    // Make sure cart is not empty
    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    // Get customer information
    const nameInput =
        document.getElementById("customerName");

    const phoneInput =
        document.getElementById("customerPhone");

    const addressInput =
        document.getElementById("customerAddress");


    const name =
        nameInput ? nameInput.value.trim() : "";

    const phone =
        phoneInput ? phoneInput.value.trim() : "";

    const address =
        addressInput ? addressInput.value.trim() : "";


    // Check name
    if (name === "") {

        alert("Please enter your name.");

        if (nameInput) {
            nameInput.focus();
        }

        return;
    }


    // Check phone
    if (phone === "") {

        alert("Please enter your phone number.");

        if (phoneInput) {
            phoneInput.focus();
        }

        return;
    }


    // Check address
    if (address === "") {

        alert("Please enter your delivery address.");

        if (addressInput) {
            addressInput.focus();
        }

        return;
    }


    // ==========================================
    // CREATE WHATSAPP MESSAGE
    // ==========================================

    let message =
        "🛍️ *NEW NAVAAN CLOTHING ORDER* 🛍️\n\n";


    let total = 0;


    // Add products
    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            (index + 1) +
            ". " +
            item.name +
            "\n";

        message +=
            "   Size: " +
            item.size +
            "\n";

        message +=
            "   Quantity: " +
            item.quantity +
            "\n";

        message +=
            "   Price: Rs. " +
            itemTotal.toLocaleString() +
            "\n\n";
    });


    // Total
    message +=
        "💰 *TOTAL: Rs. " +
        total.toLocaleString() +
        "*\n\n";


    // Customer details
    message +=
        "👤 Name: " +
        name +
        "\n";

    message +=
        "📞 Phone: " +
        phone +
        "\n";

    message +=
        "📍 Address: " +
        address +
        "\n\n";


    message +=
        "Thank you for your order! ❤️";


    // ==========================================
    // CREATE WHATSAPP LINK
    // ==========================================

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    // ==========================================
    // OPEN WHATSAPP
    // ==========================================

    // Using location instead of window.open
    // helps avoid popup blockers.
    window.location.href = whatsappURL;
}


// ==========================================
// INITIALIZE CART
// ==========================================

updateCart();