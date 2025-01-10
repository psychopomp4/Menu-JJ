const cart = [];
const favorites = [];

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += itemPrice;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1, totalPrice: itemPrice });
    }
    updateCartDisplay();
    updateCartCount();
    showNotification("Item added to cart!");
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - Rp ${item.totalPrice.toLocaleString()}`;
        cartItems.appendChild(listItem);
        total += item.totalPrice;
    });

    cartTotal.textContent = `Total: Rp ${total.toLocaleString()}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function openCart() {
    document.getElementById('cart').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart.length = 0; // Clear the cart
    updateCartDisplay();
    updateCartCount();
    closeCart();
    showNotification("Checkout successful!");
}

function filterMenu() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.getAttribute('data-name').toLowerCase();
        if (itemName.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function addToFavorites(itemName, itemImage) {
    if (!favorites.some(item => item.name === itemName)) {
        favorites.push({ name: itemName, image: itemImage });
        updateFavoritesCount(); // Perbarui penghitung favorit
        showNotification("Item added to favorites!"); // Tampilkan notifikasi
    } else {
        showNotification("Item is already in favorites!");
    }
    updateFavoritesDisplay();
}

function removeFromFavorites(itemName) {
    const index = favorites.findIndex(item => item.name === itemName);
    if (index !== -1) {
        favorites.splice(index, 1); // Hapus item dari array
        updateFavoritesCount(); // Perbarui penghitung favorit
        updateFavoritesDisplay(); // Perbarui tampilan favorit
        showNotification("Item removed from favorites!");
    }
}

function updateFavoritesDisplay() {
    const favoriteItems = document.getElementById('favoriteItems');
    favoriteItems.innerHTML = '';

    favorites.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;"> ${item.name}`;
        favoriteItems.appendChild(listItem);
    });
}

function openFavorites() {
    document.getElementById('favorites').style.display = 'flex';
}

function closeFavorites() {
    document.getElementById('favorites').style.display = 'none';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function updateFavoritesCount() {
    const favoriteCount = document.getElementById('favoriteCount');
    favoriteCount.textContent = favorites.length; // Hitung jumlah item dalam array favorites
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Membuat pesan checkout yang berisi daftar item dari keranjang
    let checkoutMessage = 'Hello, I would like to order:\n\n';
    cart.forEach(item => {
        checkoutMessage += `${item.name} x${item.quantity} - Rp ${item.totalPrice.toLocaleString()}\n`;
    });

    let totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    checkoutMessage += `\nTotal: Rp ${totalAmount.toLocaleString()}`;

    // Nomor WhatsApp kasir (gunakan nomor dengan format internasional)
    const phoneNumber = '628988143220'; // Ganti dengan nomor WhatsApp kasir yang sebenarnya
    const encodedMessage = encodeURIComponent(checkoutMessage);

    // Membuat link WhatsApp untuk mengirimkan pesan
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Membuka WhatsApp dengan pesan checkout
    window.open(whatsappLink, '_blank');

    // Menampilkan notifikasi bahwa checkout berhasil
    alert('Thank you for your purchase!');
    cart.length = 0; // Clear the cart
    updateCartDisplay();
    updateCartCount();
    closeCart();
    showNotification("Checkout successful!");
}

