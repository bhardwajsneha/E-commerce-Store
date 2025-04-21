
document.addEventListener('DOMContentLoaded', function() {
    const productSection = document.getElementById('product-section');
    const featuredSection = document.getElementById('featured-section');
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    const cartCountBottom = document.getElementById('cart-count-bottom');
    const backToTop = document.getElementById('back-to-top');
    let cart = [];
    let products = [];

    // Fetch 50 random products from an API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data.slice(0, 50); // Get 50 products
            displayProducts(products);
            displayFeaturedProducts(products);
        });

    function displayProducts(products) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹${(product.price * 83).toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productSection.appendChild(productCard);
        });
    }

    function displayFeaturedProducts(products) {
        const featuredProducts = products.slice(0, 5);
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹${(product.price * 83).toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            featuredSection.appendChild(productCard);
        });
    }

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        cart.push(product);
        updateCart();
        showNotification();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1); // Remove the item from the cart array
        updateCart();
    };

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((product, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${product.title} - ₹${(product.price * 83).toFixed(2)}
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            `;
            cartList.appendChild(cartItem);
            total += product.price * 83;
        });
        totalPrice.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        cartCountBottom.textContent = cart.length;
    }

    function showNotification() {
        const notification = document.getElementById('cart-notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
});
