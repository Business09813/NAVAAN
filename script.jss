// ==========================================
// NOIRWEAR CLOTHING STORE
// ==========================================

// Your WhatsApp number
const whatsappNumber = "923121106924";


// Cart
let cart = [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(name, price, button) {

    const productCard = button.closest(".product-card");

    const size = productCard.querySelector(".size-select").value;

    const quantityInput =
        productCard.querySelector(".quantity-input");

    const quantity = parseInt(quantityInput.value);


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


    // Add item
    cart.push({
        name: name,
        price: price,
        size: size,
        quantity: quantity
    });


    updateCart();

    openCart();
}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


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

        const itemTotal =
            item.price * item.quantity;

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

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

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
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// ==========================================
// OPEN CHECKOUT
// ==========================================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add a product first.");

        return;
    }


    closeCart();

    document
        .getElementById("checkout")
        .classList.add("active");
}


// ==========================================
// CLOSE CHECKOUT
// ==========================================

function closeCheckout() {

    document
        .getElementById("checkout")
        .classList.remove("active");
}


// ==========================================
// SEND ORDER TO WHATSAPP
// ==========================================

function sendOrderToWhatsApp() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    // Check customer name
    if (name === "") {

        alert("Please enter your name.");

        return;
    }


    // Check phone
    if (phone === "") {

        alert("Please enter your phone number.");

        return;
    }


    // Check address
    if (address === "") {

        alert("Please enter your delivery address.");

        return;
    }


    let message =
        "🛍️ *NEW CLOTHING ORDER* 🛍️\n\n";


    let total = 0;


    // Products
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


    // Customer details
    message +=
        "💰 *TOTAL: Rs. " +
        total.toLocaleString() +
        "*\n\n";


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


    // WhatsApp URL
    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    // Open WhatsApp
    window.open(
        whatsappURL,
        "_blank"
    );
}


// ==========================================
// INITIAL CART
// ==========================================

updateCart();