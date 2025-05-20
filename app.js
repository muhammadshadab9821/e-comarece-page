const products = [
  { id: 1, name: 'Phone', price: 199.99, category: 'electronics', img: 'https://images.pexels.com/photos/27350774/pexels-photo-27350774/free-photo-of-the-different-types-of-smartphones-that-are-on-display.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'Laptop', price: 499.99, category: 'electronics', img: 'https://images.pexels.com/photos/792194/pexels-photo-792194.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'T-shirt', price: 14.99, category: 'clothing', img: 'https://images.pexels.com/photos/8311890/pexels-photo-8311890.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, name: 'Jeans', price: 39.99, category: 'clothing', img: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, name: 'Novel', price: 9.99, category: 'books', img: 'https://images.pexels.com/photos/9490662/pexels-photo-9490662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 6, name: 'Headphones', price: 29.99, category: 'electronics', img: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 7, name: 'Jacket', price: 59.99, category: 'clothing', img: 'https://images.pexels.com/photos/7679455/pexels-photo-7679455.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 8, name: 'Cookbook', price: 24.99, category: 'books', img: 'https://images.pexels.com/photos/8845428/pexels-photo-8845428.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 9, name: 'Smartwatch', price: 149.99, category: 'electronics', img: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 10, name: 'Sneakers', price: 49.99, category: 'clothing', img: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

let cart = [];

function renderProducts(filteredProducts) {
  const productGrid = document.getElementById('products');
  productGrid.innerHTML = '';

  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);
  if (existing) {
    alert('Item already in cart!');
    return;
  }

  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total');

  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} 
      <button onclick="removeFromCart(${index})" style="margin-left:10px; background:#dc3545; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">✖</button>
    `;
    cartItems.appendChild(li);
  });

  total.textContent = totalPrice.toFixed(2);
}

function applyFilters() {
  const category = document.getElementById('filter-category').value;
  const priceRange = document.getElementById('filter-price').value;
  const search = document.getElementById('search').value.toLowerCase();

  let filtered = products.filter(product => product.name.toLowerCase().includes(search));

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (priceRange !== 'all') {
    if (priceRange === '0-20') filtered = filtered.filter(p => p.price < 20);
    else if (priceRange === '20-50') filtered = filtered.filter(p => p.price >= 20 && p.price <= 50);
    else if (priceRange === '>50') filtered = filtered.filter(p => p.price > 50);
  }


  renderProducts(filtered);
}

// Event Listeners
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('filter-category').addEventListener('change', applyFilters);
document.getElementById('filter-price').addEventListener('change', applyFilters);

// Initial render
renderProducts(products);
// Enhance Search Placeholder (already styled via CSS)
document.getElementById('search').placeholder = "🔍 Search anything...";

// Add more styling dynamically (optional, if you want JS to control it)
document.querySelectorAll('select').forEach(select => {
  select.style.cursor = "pointer";
  select.style.transition = "all 0.3s ease-in-out";
});

