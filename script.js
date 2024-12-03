// Product class 
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class to store product and quantity
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculate total price of the item (product price * quantity)
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class to handle all cart operations
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add an item to the cart
  addItem(product) {
    const item = this.items.find((item) => item.product.id === product.id);
    if (item) {
      item.quantity += 1;  // Increase quantity if the item already exists
    } else {
      this.items.push(new ShoppingCartItem(product));  // Otherwise, add a new item
    }
  }

  // Remove an item from the cart
  removeItem(productId) {
    const itemIndex = this.items.findIndex((item) => item.product.id === productId);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    }
  }

  // Get the total price of all items in the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Get the list of items in the cart
  getCartItems() {
    return this.items;
  }

  // Display cart items on the page
  displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';  // Clear current cart items

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    // Add each item in the cart to the display
    this.items.forEach((item) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <h5>${item.product.name}</h5>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ${item.getTotalPrice()} $</p>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    // Display the total price
    const totalPrice = document.querySelector('.total');
    totalPrice.textContent = `${this.getTotal()} $`;
  }
}

// Creating some product instances
const basket = new Product(1, 'Baskets', 100);
const socks = new Product(2, 'Socks', 20);
const bag = new Product(3, 'Bag', 50);

// Initialize the shopping cart
const shoppingCart = new ShoppingCart();

// Handle "Add to Cart" button clicks
document.querySelectorAll('.add-item').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = parseInt(event.target.getAttribute('data-id'));
    let product;

    // Find the corresponding product based on the product ID
    switch (productId) {
      case 1:
        product = basket;
        break;
      case 2:
        product = socks;
        break;
      case 3:
        product = bag;
        break;
      default:
        return;
    }

    // Add item to the cart and update the UI
    shoppingCart.addItem(product);
    shoppingCart.displayCartItems();

    // Enable the remove button for the product in the list
    document.querySelector(`.product-card[data-id="${productId}"] .remove-item`).disabled = false;
  });
});

// Handle "Remove from Cart" button clicks
document.querySelectorAll('.remove-item').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productId = parseInt(event.target.getAttribute('data-id'));
    shoppingCart.removeItem(productId);
    shoppingCart.displayCartItems();

    // Disable the remove button for the product in the list if it's no longer in the cart
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    productCard.querySelector('.remove-item').disabled = true;
  });
});









