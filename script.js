// ====== গ্লোবাল কার্ট ভেরিয়েবল ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== প্রোডাক্ট অ্যাড করার ফাংশন ======
function addToCart(name, price) {
    console.log("Adding to cart:", name, price);
    
    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("✅ " + name + " কার্টে যোগ করা হয়েছে!");
    console.log("Current Cart:", cart);
}

// ====== নেভবারে কাউন্ট আপডেট ======
function updateCartCount() {
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerText = totalCount;
    }
    console.log("Cart Count Updated:", totalCount);
}

// ====== কার্ট ডিসপ্লে ফাংশন (সবচেয়ে গুরুত্বপূর্ণ) ======
function displayCart() {
    console.log("Displaying Cart...");
    
    let cartBox = document.getElementById("cart-items");
    let totalDisplay = document.getElementById("total");
    
    if (!cartBox) {
        console.log("ERROR: cart-items element not found!");
        return;
    }
    
    // localStorage থেকে কার্ট ডেটা রিলোড করুন
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Data from localStorage:", cart);
    
    if (cart.length === 0) {
        cartBox.innerHTML = `
            <div class="alert alert-info text-center">
                <i class="bi bi-cart-x"></i> আপনার কার্ট খালি! <br>
                <a href="index.html" class="btn btn-primary mt-2">কেনাকাটা শুরু করুন</a>
            </div>
        `;
        if (totalDisplay) totalDisplay.innerText = "0";
        return;
    }

    let total = 0;
    let html = '';
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="card p-3 mb-3 shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5><i class="bi bi-bag"></i> ${item.name}</h5>
                        <p class="mb-1">💰 দাম: ${item.price} BDT</p>
                        <p class="mb-1">📦 পরিমাণ: ${item.quantity}</p>
                        <p class="mb-2">📊 মোট: ${itemTotal} BDT</p>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                        <i class="bi bi-trash"></i> সরান
                    </button>
                </div>
            </div>
        `;
    });

    cartBox.innerHTML = html;
    if (totalDisplay) totalDisplay.innerText = total;
    console.log("Total Items:", cart.length, "Total Price:", total);
}

// ====== আইটেম রিমুভ ======
function removeItem(index) {
    if (confirm("আপনি কি এই আইটেমটি সরাতে চান?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// ====== চেকআউট ======
function checkout() {
    if (cart.length === 0) {
        alert("🛒 আপনার কার্ট খালি!");
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (confirm(`আপনার অর্ডারের মোট টাকা: ${total} BDT\n\nআপনি কি অর্ডার কনফর্ম করতে চান?`)) {
        alert("🎉 অর্ডার সফলভাবে সম্পন্ন হয়েছে! ধন্যবাদ কেনাকাটার জন্য।");
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
        updateCartCount();
    }
}

// ====== পেজ লোড হলে ======
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page Loaded! Path:", window.location.pathname);
    
    // কার্ট রিলোড
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
    
    // কার্ট পেজ চেক
    if (window.location.pathname.includes("cart.html")) {
        console.log("On Cart Page!");
        displayCart();
    }
});

console.log("🛒 Fashion Aura Cart System Loaded!");
console.log("📦 Current Cart:", cart);