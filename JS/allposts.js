const fullProductUrl = "https://fightingdays.seeorno.no/wp-json/wp/v2/posts";
const showMoreBtn = document.getElementById("showMoreBtn");

let currentPage = 1;

async function getProducts() {
  try {
    const response = await fetch(
      `${fullProductUrl}?_embedpage=${currentPage}&per_page=10`
    );

    const products = await response.json();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      if (product) {
        await createProductHtml(product);
      } else {
        console.error("Something went wrong when fetching products");
      }

      if (product.length < 9) {
        showMoreBtn.style.display = "none";
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function loadMorePosts() {
  currentPage++;
  getProducts();
}

showMoreBtn.addEventListener("click", loadMorePosts);

getProducts();

async function createProductHtml(product) {
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
