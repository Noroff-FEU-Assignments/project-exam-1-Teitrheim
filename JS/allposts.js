const fullProductUrl =
  "https://cors.noroff.dev/https://fightingdays.seeorno.no/wp-json/wp/v2/posts";

async function getProducts() {
  try {
    const response = await fetch(fullProductUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function createProductHtml(product) {
  const container = document.querySelector(".allPostsContainer");
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const productLink = document.createElement("a");
  productLink.classList.add("product-item");
  productLink.href = `specificPage.html?id=${product.id}`;

  const title = document.createElement("h3");
  title.textContent = product.title.rendered;

  productLink.appendChild(title);

  if (product.featured_media) {
    const image = document.createElement("img");
    image.src = product.featured_media;
    image.alt = product.title.rendered;
    productLink.appendChild(image);
  }

  productContainer.appendChild(productLink);

  container.appendChild(productContainer);
}

function createFeaturedProductHtml(product) {
  const container = document.querySelector(".featured-products");
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const productLink = document.createElement("a");
  productLink.classList.add("product-item");
  productLink.href = `specificPage.html?id=${product.id}`;

  const title = document.createElement("h3");
  title.textContent = product.title.rendered;

  productLink.appendChild(title);

  if (product.featured_media) {
    const image = document.createElement("img");
    image.src = product.featured_media;
    image.alt = product.title.rendered;
    productLink.appendChild(image);
  }

  productContainer.appendChild(productLink);

  container.appendChild(productContainer);
}

async function shopPage() {
  const products = await getProducts();

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.featured) {
      createFeaturedProductHtml(product);
    } else {
      createProductHtml(product);
    }
  }
}

shopPage();
