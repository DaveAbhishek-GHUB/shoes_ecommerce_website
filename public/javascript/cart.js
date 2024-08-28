// Sample array of cart items
const items = [
    { price: 19.99, quantity: 1 },
    { price: 29.99, quantity: 1 }
];

// Function to update item quantity
function updateQuantity(index, change) {
    // Update quantity, ensuring it doesn't go below 0
    items[index].quantity = Math.max(0, items[index].quantity + change);
    // Update the quantity input in the DOM
    const inputs = document.getElementsByClassName('quantity-input');
    inputs[index].value = items[index].quantity;
    // Recalculate the total
    updateTotal();
}

// Function to calculate and update the total price
function updateTotal() {
    // Calculate total price
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Update total price in the DOM
    document.getElementById('total-price').textContent = total.toFixed(2);
}