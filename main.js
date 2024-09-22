const dessertCards = document.getElementById("dessert-card-container");
const cartContainer = document.getElementById("cart-container");
const productContainer = document.getElementById("product-container");
const clearCartBtn = document.getElementById("clear-cart");
const totalItems = document.getElementById("total-items");
const subTotal = document.getElementById("subtotal");
const texas = document.getElementById("texas");
const total = document.getElementById("total");
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
let isCartShowing = false;

// Define cartBtn
const cartBtn = document.getElementById("cart-btn");

const products = [
    {
      id: 1,
      name: "Vanilla Cupcakes (6 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
    {
      id: 2,
      name: "French Macaron",
      price: 3.99,
      category: "Macaron",
    },
    {
      id: 3,
      name: "Pumpkin Cupcake",
      price: 3.99,
      category: "Cupcake",
    },
    {
      id: 4,
      name: "Chocolate Cupcake",
      price: 5.99,
      category: "Cupcake",
    },
    {
      id: 5,
      name: "Chocolate Pretzels (4 Pack)",
      price: 10.99,
      category: "Pretzel",
    },
    {
      id: 6,
      name: "Strawberry Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 7,
      name: "Chocolate Macarons (4 Pack)",
      price: 9.99,
      category: "Macaron",
    },
    {
      id: 8,
      name: "Strawberry Pretzel",
      price: 4.99,
      category: "Pretzel",
    },
    {
      id: 9,
      name: "Butter Pecan Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 10,
      name: "Rocky Road Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 11,
      name: "Vanilla Macarons (5 Pack)",
      price: 11.99,
      category: "Macaron",
    },
    {
      id: 12,
      name: "Lemon Cupcakes (4 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
    {
     id: 13,
     name: "Blue berry pancake",
     price: 15.99,
     category: "pancake", 
    },
    {
        id: 14,
        name: "pinaple cake",
        price: 19.99,
        category: "cake", 
    },
    {
        id: 15,
        name: "choclate cookies",
        price: 19.99,
        category: "cookies", 
    },
    {
        id: 16,
        name: "Chocalte Brownie",
        price: 23.99,
        category: "cake", 
    },
    {
        id: 17,
        name: "Sliced Wheat Bread",
        price: 29.99,
        category: "bread", 
    }
  ];

// Add products for shop:
products.forEach(({ name, id, price,}) => {
    dessertCards.innerHTML += `
        <div class="dessert-card col-3 m-4 bg-body-tertiary p-4 position-relative">
          <h3 class="position-absolute top-0 start-0 m-3">${name}</h3>
          <p class="dessert-price position-absolute">$${price}</p>
          <button 
            id="${id}" 
            class="btn add-to-cart-btn position-absolute bottom-0 end-0" >Add to cart
          </button>
        </div>
    `;
});

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxes = 8.25;
    }

    addItem(id, products) {
        const product = products.find((item) => item.id === id);
        const { name, price } = product;

        // Add product to array
        this.items.push(product);

        // Counting products in cart
        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        });

        // Updating UI
        const currentCountPerProduct = totalCountPerProduct[product.id];
        const currentCountPerProductSpan = document.getElementById(`product-count-for-id${id}`);

        if (currentCountPerProduct > 1) {
            currentCountPerProductSpan.innerHTML = `${currentCountPerProduct}X${name}`;
        } else {
            productContainer.innerHTML += `
                <div id="dessert${id}" class="product">
                    <p>
                        <span id="product-count-for-id${id}" class="product-count">${name}</span>
                    </p>
                    <p>${price}</p>
                </div>
            `;
        }
    }

    getCounts() {
        return this.items.length;
    }

    clearCart() {
        if (!this.items.length) {
            alert("Your Cart is Empty!!");
            return;
        }

        const cartCleared = confirm("Are you sure you want to clear it?");
        if (cartCleared) {
            this.items = [];
            this.total = 0;
            productContainer.innerHTML = "";
            totalItems.textContent = 0;
            subTotal.textContent = 0;
            texas.textContent = 0;
            total.textContent = 0;
        }
    }

    calculateTaxes(amount) {
        return parseFloat(((this.taxes / 100) * amount).toFixed(2));
    }

    calculateTotal() {
        const subtotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subtotal);
        this.total = subtotal + parseFloat(tax); // Parse float to handle string conversion
        total.textContent = `${this.total.toFixed(2)}`;
        subTotal.textContent = `${subtotal.toFixed(2)}`;
        texas.textContent = `${tax.toFixed(2)}`;
        return this.total;
    }
}

const cart = new ShoppingCart();

[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id), products);
        totalItems.textContent = cart.getCounts();
        cart.calculateTotal();
    });
});

cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));



