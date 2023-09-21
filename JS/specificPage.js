document.addEventListener("DOMContentLoaded", async () => {
  const fullPostUrl = "https://fightingdays.seeorno.no/wp-json/wp/v2/posts";

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const container = document.querySelector(".container");
  const img = localStorage.getItem("specificPhoto");

  async function getSpecificPost() {
    try {
      const response = await fetch(`${fullPostUrl}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const post = await response.json();
      let specificImgSrc = "";
      let specificImgAlt = "";
      if (post.featured_media) {
        const mediaResponse = await fetch(
          `https://fightingdays.seeorno.no/wp-json/wp/v2/media/${post.featured_media}`
        );

        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          if (mediaData.source_url) {
            const image = document.createElement("img");
            specificImgSrc = mediaData.source_url;
            specificImgAlt = post.title.rendered;
          }
        } else {
          console.error(`Failed to fetch media item for post ID ${post.id}`);
        }
      }

      const postHtml = `
    <div class="specificPost">
      <h2>${post.title.rendered}</h2>
      <img src="${specificImgSrc}" alt="${specificImgAlt}" />
      <p>${post.excerpt.rendered}</p>
    </div>
  `;

      container.innerHTML += postHtml;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  getSpecificPost();
});
