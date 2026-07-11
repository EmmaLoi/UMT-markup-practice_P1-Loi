const menuOpenBtn = document.querySelector(".menu-open-btn");
const menuCloseBtn = document.querySelector(".mobile-menu-close-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const bouquetsMessage = document.querySelector(".bouquets-message");
const productModalImg = document.querySelector(".product-modal-img");
const productModalTitle = document.querySelector(".product-modal-title");
const productModalPrice = document.querySelector(".product-modal-price");
const productModalText = document.querySelector(".product-modal-text");
const feedbackList = document.querySelector(".feedback-list");
const bestsellersMessage = document.querySelector(".bestsellers-message");
const feedbackMessage = document.querySelector(".feedback-message");
const bestsellersDots = document.querySelector(".bestsellers-dots");
const bestsellersPrevBtn = document.querySelector(
  '.bestsellers .slider-btn[aria-label="Previous slide"]',
);
const bestsellersNextBtn = document.querySelector(
  '.bestsellers .slider-btn[aria-label="Next slide"]',
);
const feedbackPrevBtn = document.querySelector(
  '.feedback .slider-btn[aria-label="Previous review"]',
);
const feedbackNextBtn = document.querySelector(
  '.feedback .slider-btn[aria-label="Next review"]',
);
const orderForm = document.querySelector(".order-form");

orderForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(orderForm);

  const order = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    message: formData.get("message"),
  };

  const response = await createOrder(order);

  if (response.error) {
    return;
  }

  orderForm.reset();
  closeOrderModal();
});

let bestsellersData = [];
let feedbackData = [];

let bestsellersPage = 0;
let feedbackPage = 0;

function getVisibleItemsCount() {
  if (window.innerWidth >= 1440) {
    return 3;
  }

  if (window.innerWidth >= 768) {
    return 2;
  }

  return 1;
}

function updateSliderButton(button, disabled) {
  button.disabled = disabled;
  button.style.opacity = disabled ? "0.4" : "1";
  button.style.cursor = disabled ? "not-allowed" : "pointer";
}

function updateProductModal(bouquet) {
  productModalImg.src = bouquet.image;
  productModalImg.srcset = `${bouquet.image} 1x, ${bouquet.image2x} 2x`;
  productModalImg.alt = bouquet.alt;
  productModalTitle.textContent = bouquet.title;
  productModalPrice.textContent = bouquet.price;
  productModalText.textContent = bouquet.description;
}

function showMessage(element, text) {
  element.textContent = text;
  element.classList.remove("is-hidden");
}

function hideMessage(element) {
  element.textContent = "";
  element.classList.add("is-hidden");
}

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

productModalCloseBtn.addEventListener("click", closeProductModal);

productDetailsBackdrop.addEventListener("click", function (event) {
  if (event.target === productDetailsBackdrop) {
    closeProductModal();
  }
});

const bouquetsList = document.querySelector(".bouquets-list");
const loadMoreBtn = document.querySelector(".show-more-btn");
const bestsellersList = document.querySelector(".bestsellers-list");

const state = {
  page: 1,
  limit: 4,
};

function createBouquetMarkup(bouquet) {
  return `
    <li class="bouquets-item js-product-card" data-id="${bouquet.id}">
      <img
        src="${bouquet.image}"
        srcset="${bouquet.image} 1x, ${bouquet.image2x} 2x"
        alt="${bouquet.alt}"
        width="288"
        height="296"
      />
      <h3 class="product-title">${bouquet.title}</h3>
      <p class="product-price">${bouquet.price}</p>
    </li>
  `;
}

async function renderBouquets() {
  hideMessage(bouquetsMessage);
  showMessage(bouquetsMessage, "Loading bouquets...");
  loadMoreBtn.style.display = "none";

  const response = await getBouquets(state.page, state.limit);
  if (response.error) {
    showMessage(
      bouquetsMessage,
      "Something went wrong. Please try again later.",
    );
    loadMoreBtn.style.display = "none";
    return;
  }

  if (response.data.length === 0) {
    showMessage(bouquetsMessage, "No more bouquets");
    loadMoreBtn.style.display = "none";
    return;
  }

  if (state.page === 1) {
    bouquetsList.innerHTML = "";
  }

  const markup = response.data.map(createBouquetMarkup).join("");
  bouquetsList.insertAdjacentHTML("beforeend", markup);
  hideMessage(bouquetsMessage);

  if (state.page >= response.pages) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "flex";
  }
}

renderBouquets();
renderBestsellers();
renderFeedback();

async function handleProductClick(event) {
  const card = event.target.closest(".js-product-card");

  if (!card) {
    return;
  }

  let product;

  if (card.dataset.type === "bestseller") {
    product = await getBestsellerById(card.dataset.id);
  } else {
    product = await getBouquetById(card.dataset.id);
  }

  if (!product) {
    showMessage(
      bouquetsMessage,
      "Something went wrong. Please try again later.",
    );
    return;
  }

  updateProductModal(product);
  openProductModal();
}

bouquetsList.addEventListener("click", handleProductClick);
bestsellersList.addEventListener("click", handleProductClick);

loadMoreBtn.addEventListener("click", function () {
  state.page += 1;
  renderBouquets();
});

function createBestsellerMarkup(bouquet) {
  return `
    <li class="bestsellers-item js-product-card" data-id="${bouquet.id}" data-type="bestseller">
      <img
        src="${bouquet.image}"
        srcset="${bouquet.image} 1x, ${bouquet.image2x} 2x"
        alt="${bouquet.alt}"
        width="384"
        height="320"
      />
      <h3 class="product-title">${bouquet.title}</h3>
      <p class="product-price">${bouquet.price}</p>
    </li>
  `;
}

function renderBestsellersPage() {
  const itemsPerPage = getVisibleItemsCount();
  const pagesCount = Math.ceil(bestsellersData.length / itemsPerPage);

  if (bestsellersPage >= pagesCount) {
    bestsellersPage = Math.max(pagesCount - 1, 0);
  }

  const start = bestsellersPage * itemsPerPage;
  const visibleItems = bestsellersData.slice(start, start + itemsPerPage);

  bestsellersList.innerHTML = visibleItems.map(createBestsellerMarkup).join("");

  bestsellersDots.innerHTML = Array.from(
    { length: pagesCount },
    (_, index) => `
      <li class="bestsellers-dot ${
        index === bestsellersPage ? "active" : ""
      }"></li>
    `,
  ).join("");

  if (bestsellersPrevBtn && bestsellersNextBtn) {
    updateSliderButton(bestsellersPrevBtn, bestsellersPage === 0);
    updateSliderButton(bestsellersNextBtn, bestsellersPage >= pagesCount - 1);
  }
}

async function renderBestsellers() {
  const response = await getBestsellers();

  if (response.error) {
    showMessage(
      bestsellersMessage,
      "Something went wrong. Please try again later.",
    );
    return;
  }

  hideMessage(bestsellersMessage);

  bestsellersData = response.data;
  bestsellersPage = 0;

  renderBestsellersPage();
}

if (bestsellersPrevBtn) {
  bestsellersPrevBtn.addEventListener("click", () => {
    if (bestsellersPage === 0) {
      return;
    }

    bestsellersPage -= 1;
    renderBestsellersPage();
  });
}

if (bestsellersNextBtn) {
  bestsellersNextBtn.addEventListener("click", () => {
    const pagesCount = Math.ceil(
      bestsellersData.length / getVisibleItemsCount(),
    );

    if (bestsellersPage >= pagesCount - 1) {
      return;
    }

    bestsellersPage += 1;
    renderBestsellersPage();
  });
}

let bestsellersTouchStartX = 0;

bestsellersList.addEventListener("touchstart", (event) => {
  bestsellersTouchStartX = event.changedTouches[0].clientX;
});

bestsellersList.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = bestsellersTouchStartX - touchEndX;

  const pagesCount = Math.ceil(bestsellersData.length / getVisibleItemsCount());

  if (swipeDistance > 50 && bestsellersPage < pagesCount - 1) {
    bestsellersPage += 1;
    renderBestsellersPage();
  }

  if (swipeDistance < -50 && bestsellersPage > 0) {
    bestsellersPage -= 1;
    renderBestsellersPage();
  }
});

function createFeedbackMarkup(feedback) {
  return `
    <li class="feedback-item">
      <p class="feedback-text">${feedback.text}</p>
      <p class="feedback-author">${feedback.author}</p>
    </li>
  `;
}

function renderFeedbackPage() {
  const itemsPerPage = getVisibleItemsCount();
  const pagesCount = Math.ceil(feedbackData.length / itemsPerPage);

  if (feedbackPage >= pagesCount) {
    feedbackPage = Math.max(pagesCount - 1, 0);
  }

  const start = feedbackPage * itemsPerPage;
  const visibleItems = feedbackData.slice(start, start + itemsPerPage);

  feedbackList.innerHTML = visibleItems.map(createFeedbackMarkup).join("");

  updateSliderButton(feedbackPrevBtn, feedbackPage === 0);
  updateSliderButton(feedbackNextBtn, feedbackPage >= pagesCount - 1);
}

async function renderFeedback() {
  const response = await getFeedback();

  if (response.error) {
    showMessage(
      feedbackMessage,
      "Something went wrong. Please try again later.",
    );
    return;
  }

  hideMessage(feedbackMessage);
  feedbackData = response.data;
  feedbackPage = 0;

  renderFeedbackPage();
}

feedbackPrevBtn.addEventListener("click", function () {
  if (feedbackPage === 0) {
    return;
  }

  feedbackPage -= 1;
  renderFeedbackPage();
});

feedbackNextBtn.addEventListener("click", function () {
  const pagesCount = Math.ceil(feedbackData.length / getVisibleItemsCount());

  if (feedbackPage >= pagesCount - 1) {
    return;
  }

  feedbackPage += 1;
  renderFeedbackPage();
});

window.addEventListener("resize", function () {
  bestsellersPage = 0;
  feedbackPage = 0;

  renderBestsellersPage();
  renderFeedbackPage();
});
