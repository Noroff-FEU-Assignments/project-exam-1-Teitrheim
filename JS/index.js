const fullProductUrl = "https://fightingdays.seeorno.no/wp-json/wp/v2/posts";

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

async function createProductHtml(product) {
  const container = document.querySelector(".all-products");
  const productContainer = document.createElement("div");

  const productLink = document.createElement("a");
  productLink.classList.add("product-item");
  productLink.href = `specificPage.html?id=${product.id}`;

  const title = document.createElement("h3");
  title.textContent = product.title.rendered;
  productLink.appendChild(title);

  if (product.featured_media) {
    const mediaResponse = await fetch(
      `https://fightingdays.seeorno.no/wp-json/wp/v2/media/${product.featured_media}`
    );

    if (mediaResponse.ok) {
      const mediaData = await mediaResponse.json();
      if (mediaData.source_url) {
        const image = document.createElement("img");
        image.src = mediaData.source_url;
        image.alt = product.title.rendered;
        productLink.appendChild(image);
      }
    } else {
      console.error(`Failed to fetch media item for post ID ${product.id}`);
    }
  }

  productContainer.appendChild(productLink);
  container.appendChild(productContainer);
}

async function shopPage() {
  const products = await getProducts();

  for (let i = 5; i < products.length; i++) {
    const product = products[i];

    if (product.featured) {
      createFeaturedProductHtml(product);
    } else {
      createProductHtml(product);
    }
  }
}

shopPage();
