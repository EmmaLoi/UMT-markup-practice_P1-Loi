const menuOpenBtn = document.querySelector(".menu-open-btn");
const menuCloseBtn = document.querySelector(".mobile-menu-close-btn");
const mobileMenu = document.querySelector(".mobile-menu");

function openMenu() {
  mobileMenu.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  document.body.style.overflow = "";
}

menuOpenBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);

mobileMenu
  .querySelectorAll(".mobile-nav-link, .mobile-menu-btn")
  .forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

const productDetailsBackdrop = document.querySelector(
  ".product-details-backdrop",
);
const productModalCloseBtn = document.querySelector(".product-modal-close-btn");
const productCards = document.querySelectorAll(".js-product-card");
const orderBackdrop = document.querySelector(".order-backdrop");
const buyNowBtn = document.querySelector(".product-modal-buy-btn");
const orderModalCloseBtn = document.querySelector(".order-modal-close-btn");

function openProductModal() {
  productDetailsBackdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productDetailsBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
}

function openOrderModal() {
  orderBackdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeOrderModal() {
  orderBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
}

orderModalCloseBtn.addEventListener("click", closeOrderModal);

orderBackdrop.addEventListener("click", function (event) {
  if (event.target === orderBackdrop) {
    closeOrderModal();
  }
});

buyNowBtn.addEventListener("click", function () {
  closeProductModal();
  openOrderModal();
});

productCards.forEach(function (card) {
  card.addEventListener("click", openProductModal);
});

productModalCloseBtn.addEventListener("click", closeProductModal);

productDetailsBackdrop.addEventListener("click", function (event) {
  if (event.target === productDetailsBackdrop) {
    closeProductModal();
  }
});
