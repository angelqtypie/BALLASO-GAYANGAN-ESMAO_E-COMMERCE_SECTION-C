fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Loop through categories
    data.forEach(category => {
      const productListElement = document.getElementById(`${category.category}ProductList`);

      // Loop through products in the home category
      if (category.category === 'home') {
        for (let i = 0; i < category.products.length; i += 4) {
          const row = document.createElement('div');
          row.classList.add('row');

          for (let j = i; j < i + 4 && j < category.products.length; j++) {
            const product = category.products[j];
            const productItem = document.createElement("div");
            productItem.classList.add('col-sm-4');

            // Generate HTML for each product
            productItem.innerHTML = `
              <div class="immortal">
                <img src="${product.img}" class="image" alt="${product.name}">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">Price: $${product.price}</p>
                  <p class="card-text">Date Added: ${product.dateAdded}</p>
                  <button class="btn btn-primary" onclick="addToCart('${product.name}')">Add to Cart</button>
                  <span id="clickCount${product.name}">0</span> Clicks
                  <br><br>
                </div>
              </div>
            `;

            // Append the product to the row
            row.appendChild(productItem);
          }

          // Append the row to the product list element
          productListElement.appendChild(row);
        
        }}});
      })
  
  
  window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})
  .catch(error => console.error('Error fetching data:', error));

// Navigate to a specific page
function navigateTo(page) {
  // Hide all content sections
  const contentSections = document.querySelectorAll('main');
  contentSections.forEach(section => {
      section.style.display = 'none';
  });

  // Show the selected content section
  const selectedSection = document.getElementById(`${page}ProductList`);
  selectedSection.style.display = 'block';

  // Fetch and render data for the selected section
  fetchDataAndRender(page);
}

// Initial navigation to the home page
navigateTo('home');

// Define addToCart function globally
function addToCart(productName) {
  let clickCount = parseInt(document.getElementById(`clickCount${productName}`).innerText);
  clickCount++;
  document.getElementById(`clickCount${productName}`).innerText = clickCount;
}