const mobileNav = document.getElementById("mobileNav");
const mobileMenuButton = document.querySelector(".mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});
