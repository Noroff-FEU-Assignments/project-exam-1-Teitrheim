const fullProductUrl = "https://fightingdays.seeorno.no/wp-json/wp/v2/posts";

const slidesContainer = document.querySelector(".carousel-slides");

let currentPage = 0;
const perPage = 4;
let products = [];

async function getProducts() {
  try {
    const response = await fetch(fullProductUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const fetchedProducts = await response.json();

    if (fetchedProducts.length !== 0) {
      products = fetchedProducts;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(startIndex) {
  slidesContainer.innerHTML = "";

  for (
    let i = startIndex;
    i < startIndex + perPage && i < products.length;
    i++
  ) {
    const product = products[i];

    if (product.featured_media) {
      fetch(
        `https://fightingdays.seeorno.no/wp-json/wp/v2/media/${product.featured_media}`
      )
        .then((mediaResponse) => {
          if (mediaResponse.ok) {
            return mediaResponse.json();
          } else {
            console.error(
              `Failed to fetch media item for post ID ${product.id}`
            );
            return null;
          }
        })
        .then((mediaData) => {
          if (mediaData && mediaData.source_url) {
            const slide = document.createElement("div");
            slide.classList.add("carousel-slide");

            const productLink = document.createElement("a");
            productLink.href = `specificPage.html?id=${product.id}`;

            const title = document.createElement("h3");
            title.classList.add("thumbnail-title");
            title.textContent = product.title.rendered;

            const image = document.createElement("img");
            image.src = mediaData.source_url;
            image.alt = product.title.rendered;

            productLink.appendChild(image);
            productLink.appendChild(title);

            slide.appendChild(productLink);

            slidesContainer.appendChild(slide);
          }
        });
    }
  }
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    const startIndex = currentPage * perPage;
    displayProducts(startIndex);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if ((currentPage + 1) * perPage < products.length) {
    currentPage++;
    const startIndex = currentPage * perPage;
    displayProducts(startIndex);
  }
});

getProducts().then(() => {
  displayProducts(0);
});

async function createProductHtml(product) {
  const container = document.querySelector(".all-products");
  const productContainer = document.createElement("div");

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
      if (mediaData && mediaData.source_url) {
        const image = document.createElement("img");
        image.src = mediaData.source_url;
        image.alt = product.title.rendered;
        productLink.appendChild(image);
      } else {
        console.error(
          `Media item is missing source_url for post ID ${product.id}`
        );
      }
    } else {
      console.error(`Failed to fetch media item for post ID ${product.id}`);
    }
  }

  productContainer.appendChild(productLink);
  container.appendChild(productContainer);
}
