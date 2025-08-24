// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');
const filterBtns = document.querySelectorAll('.filter-btn');
const scrollAnimationElements = document.querySelectorAll('.section-title, .products-container, .custom-container, .about-content, .contact-container, .footer-content');

// Custom T-shirt elements
const tshirtBase = document.getElementById('tshirt-base');
const customText = document.getElementById('custom-text');
const customTextPreview = document.getElementById('custom-text-preview');
const textColor = document.getElementById('text-color');
const textSize = document.getElementById('text-size');
const colorOptions = document.querySelectorAll('.color-option');
const customTotalPrice = document.getElementById('custom-total-price');
const addCustomToCartBtn = document.getElementById('add-custom-to-cart');

// Cart data
let cart = [];

// WhatsApp number (placeholder)
const WHATSAPP_NUMBER = '917397792752';

// Notification system
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const messageElement = document.createElement('div');
    messageElement.className = 'notification-message';
    messageElement.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    });
    
    // Append elements
    notification.appendChild(icon);
    notification.appendChild(messageElement);
    notification.appendChild(closeBtn);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Scroll animation handler
function handleScrollAnimations() {
    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    
    scrollAnimations.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add scroll-animation class to elements
    scrollAnimationElements.forEach((element, index) => {
        element.classList.add('scroll-animation');
        // Stagger the animation delay
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add animation order to product cards for staggered effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Display products
    displayProducts('all');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Setup event listeners
function setupEventListeners() {
    // Product filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayProducts(filter);
        });
    });
    
    // Cart modal
    cartIcon.addEventListener('click', toggleCartModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    // Close buttons for modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });
    
    // Cart actions
    checkoutBtn.addEventListener('click', openCheckoutModal);
    clearCartBtn.addEventListener('click', clearCart);
    
    // Checkout form
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Custom T-shirt
    customText.addEventListener('input', updateCustomPreview);
    textColor.addEventListener('input', updateCustomPreview);
    textSize.addEventListener('change', updateCustomPreview);
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            tshirtBase.style.filter = `drop-shadow(0 0 0 ${color}) brightness(0.8)`;
            updateCustomPreview();
        });
    });
    
    // Add custom t-shirt to cart
    addCustomToCartBtn.addEventListener('click', addCustomTshirtToCart);
}

// Display products based on category filter
function displayProducts(category) {
    const filteredProducts = getProductsByCategory(category);
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-id', product.id);
        // Set animation order for staggered effect
        productCard.style.setProperty('--animation-order', index);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        // Add event listener to the Add to Cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => addToCart(product.id));
    });
}

// Add product to cart
function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            colors: product.colors,
            sizes: product.sizes
        });
    }
    
    // Update cart UI
    updateCart();
    
    // Show notification with enhanced animation
    showNotification(`${product.name} added to cart!`, 'success');
}

// Add custom t-shirt to cart
function addCustomTshirtToCart() {
    const text = customText.value.trim();
    if (!text) {
        showNotification('Please add some text to your custom t-shirt', 'error');
        return;
    }
    
    // Get selected color
    let selectedColor = 'white';
    colorOptions.forEach(option => {
        if (option.classList.contains('active')) {
            selectedColor = option.getAttribute('data-color');
        }
    });
    
    // Create custom product
    const customProduct = {
        id: `custom-${Date.now()}`,
        name: 'Custom T-Shirt',
        price: customTshirtBasePrice,
        image: 'images/tshirt-template.png',
        quantity: 1,
        colors: ['White', 'Black', 'Navy', 'Red', 'Green'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        customization: {
            text: text,
            textColor: textColor.value,
            textSize: textSize.value,
            shirtColor: selectedColor
        }
    };
    
    // Add to cart
    cart.push(customProduct);
    
    // Update cart UI
    updateCart();
    
    // Show enhanced notification with animation
    showNotification('Custom t-shirt added to cart!', 'success');
    
    // Reset custom form
    customText.value = '';
    updateCustomPreview();
}

// Update custom t-shirt preview
function updateCustomPreview() {
    const text = customText.value;
    customTextPreview.textContent = text;
    customTextPreview.style.color = textColor.value;
    
    // Update text size
    switch(textSize.value) {
        case 'small':
            customTextPreview.style.fontSize = '14px';
            break;
        case 'medium':
            customTextPreview.style.fontSize = '18px';
            break;
        case 'large':
            customTextPreview.style.fontSize = '24px';
            break;
    }
    
    // Update price (base price only for now)
    customTotalPrice.textContent = formatPrice(customTshirtBasePrice);
}

// Update cart UI
function updateCart() {
    // Save cart to localStorage
    saveCart();
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = formatPrice(0);
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                ${item.customization ? `<p><small>Custom: ${item.customization.text}</small></p>` : ''}
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10">
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-item">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listeners for quantity buttons
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', () => updateItemQuantity(item.id, item.quantity - 1));
        increaseBtn.addEventListener('click', () => updateItemQuantity(item.id, item.quantity + 1));
        quantityInput.addEventListener('change', () => updateItemQuantity(item.id, parseInt(quantityInput.value)));
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
    });
    
    // Update total price
    cartTotal.textContent = formatPrice(totalPrice);
}

// Update item quantity
function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
    showNotification('Cart cleared');
}

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Populate checkout items
    populateCheckoutItems();
    
    // Show checkout modal
    checkoutModal.style.display = 'block';
    cartModal.style.display = 'none';
}

// Populate checkout items
function populateCheckoutItems() {
    checkoutItems.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.style.cssText = 'border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px;';
        
        checkoutItem.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 15px;">
                <div>
                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                    <p style="margin: 0; color: #666;">Quantity: ${item.quantity} | Price: ${formatPrice(item.price)}</p>
                    ${item.customization ? `<p style="margin: 5px 0 0 0; font-size: 0.9em; color: #888;">Custom: ${item.customization.text}</p>` : ''}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <div class="form-group" style="margin-bottom: 0;">
                    <label for="size-${index}" style="font-size: 0.9em;">Size *</label>
                    <select id="size-${index}" name="size-${index}" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <option value="">Select Size</option>
                        ${item.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label for="color-${index}" style="font-size: 0.9em;">Color *</label>
                    <select id="color-${index}" name="color-${index}" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <option value="">Select Color</option>
                        ${item.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            ${item.customization ? `
                <div class="form-group" style="margin-bottom: 10px;">
                    <label for="custom-notes-${index}" style="font-size: 0.9em;">Custom Text Notes</label>
                    <input type="text" id="custom-notes-${index}" name="custom-notes-${index}" placeholder="Any special instructions for custom text" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            ` : ''}
            
            <div class="form-group" style="margin-bottom: 0;">
                <label for="notes-${index}" style="font-size: 0.9em;">Additional Notes</label>
                <input type="text" id="notes-${index}" name="notes-${index}" placeholder="Any special requests or notes" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    checkoutTotal.textContent = formatPrice(totalPrice);
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Get customer details
    const customerName = document.getElementById('customer-name').value.trim();
    const customerWhatsapp = document.getElementById('customer-whatsapp').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    
    if (!customerName || !customerWhatsapp || !customerAddress) {
        showNotification('Please fill in all required customer details', 'error');
        return;
    }
    
    // Collect order details
    const orderDetails = [];
    let allFieldsValid = true;
    
    cart.forEach((item, index) => {
        const size = document.getElementById(`size-${index}`).value;
        const color = document.getElementById(`color-${index}`).value;
        const notes = document.getElementById(`notes-${index}`).value;
        const customNotes = item.customization ? document.getElementById(`custom-notes-${index}`).value : '';
        
        if (!size || !color) {
            allFieldsValid = false;
            return;
        }
        
        orderDetails.push({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: size,
            color: color,
            notes: notes,
            customization: item.customization,
            customNotes: customNotes
        });
    });
    
    if (!allFieldsValid) {
        showNotification('Please select size and color for all items', 'error');
        return;
    }
    
    // Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage(customerName, customerWhatsapp, customerAddress, orderDetails);
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close modals
    cart = [];
    updateCart();
    checkoutModal.style.display = 'none';
    
    showNotification('Order sent via WhatsApp! We will contact you soon.', 'success');
}

// Generate WhatsApp message
function generateWhatsAppMessage(name, whatsapp, address, orderDetails) {
    let message = `🛍️ *NEW ORDER*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${name}\n`;
    message += `WhatsApp: ${whatsapp}\n`;
    message += `Address: ${address}\n\n`;
    
    message += `📦 *Order Details:*\n`;
    
    let totalAmount = 0;
    orderDetails.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        message += `\n${index + 1}. *${item.name}*\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Color: ${item.color}\n`;
        message += `   Price: $${item.price.toFixed(2)} each\n`;
        message += `   Subtotal: $${itemTotal.toFixed(2)}\n`;
        
        if (item.customization) {
            message += `   🎨 Custom Text: "${item.customization.text}"\n`;
            message += `   Text Color: ${item.customization.textColor}\n`;
            message += `   Text Size: ${item.customization.textSize}\n`;
            message += `   Shirt Color: ${item.customization.shirtColor}\n`;
            if (item.customNotes) {
                message += `   Custom Notes: ${item.customNotes}\n`;
            }
        }
        
        if (item.notes) {
            message += `   📝 Notes: ${item.notes}\n`;
        }
    });
    
    message += `\n💰 *Total Amount: $${totalAmount.toFixed(2)}*\n\n`;
    message += `Thank you for your order! We will process it and get back to you soon. 🙏`;
    
    return message;
}

// Toggle cart modal
function toggleCartModal() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    if (cartModal.style.display === 'block') {
        updateCart();
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background-color: var(--success);
    }
    
    .notification.error {
        background-color: var(--error);
    }
    
    .notification i {
        margin-right: 10px;
        font-size: 1.2em;
    }
    
    .notification-message {
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    }
    
    .checkout-item {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

document.head.appendChild(notificationStyles);