const mobileNav = document.getElementById("mobileNav");
const mobileMenuButton = document.querySelector(".mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    mobileNav.classList.remove("active");
  }
});
