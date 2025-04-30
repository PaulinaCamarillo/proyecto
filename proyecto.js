const cart = [];

// Scroll suave para navegación
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Cambiar imagen al pasar el mouse por un color
function changeImage(imgId, imgSrc) {
  document.getElementById(imgId).src = imgSrc;
}

// Agregar producto con talla e imagen seleccionadas
function addProductToCart(name, price, sizeGroupName, imageId) {
  const sizeInput = document.querySelector(`input[name="${sizeGroupName}"]:checked`);
  if (!sizeInput) {
    alert("Please select a size.");
    return;
  }

  const size = sizeInput.value;
  const imageSrc = document.getElementById(imageId).src;

  const item = { name, price, size, image: imageSrc, quantity: 1 };

  const existing = cart.find(p => p.name === name && p.size === size && p.image === imageSrc);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push(item);
  }

  updateCart();
  showModal(item);

}

// Mostrar los productos del carrito
function updateCart() {
    const cartBox = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
  
    if (cart.length === 0) {
      cartBox.style.display = 'none'; // Ocultar si está vacío
      return;
    } else {
      cartBox.style.display = 'block'; // Mostrar si hay algo
    }
  
    cartItems.innerHTML = '';
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${item.image}" alt="${item.name}" 
                 style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            <div>
              <strong>${item.name}</strong><br>
              Size: ${item.size}<br>
              Qty: ${item.quantity} — $${item.price * item.quantity}
            </div>
          </div>
          <button onclick="removeFromCart(${index})" 
            style="background: red; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 5px 8px;">
            X
          </button>
        </div>
      `;
      cartItems.appendChild(li);
    });
  
    totalSpan.textContent = total;
  }
  

// Eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Vaciar el carrito
function clearCart() {
  cart.length = 0;
  updateCart();
}

// Simular compra
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("¡Gracias por tu compra!");
    cart.length = 0;
    updateCart();
  }
}
function showModal(product) {
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-size').textContent = product.size;
    document.getElementById('cart-modal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
  }
  function toggleCart() {
    const cartBox = document.getElementById('cart');
    if (cartBox.style.display === 'block') {
      cartBox.style.display = 'none';
    } else if (cart.length > 0) {
      cartBox.style.display = 'block';
    } else {
      alert("Tu carrito está vacío.");
    }
  }
  function acceptRegulations() {
  localStorage.setItem("fitstyle_regulations_accepted", "true");
  document.getElementById("regulatory-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const accepted = localStorage.getItem("fitstyle_regulations_accepted");
  if (!accepted) {
    document.getElementById("regulatory-modal").style.display = "flex";
  } else {
    document.getElementById("regulatory-modal").style.display = "none";
  }
});
