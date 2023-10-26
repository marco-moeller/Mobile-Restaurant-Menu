import { menuArray } from "/data.js";

let checkout = [];

const modalForm = document.querySelector("#modal-form");
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handlePayClick();
});

const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => hideModal());

document.addEventListener("click", (event) => {
  if (event.target.dataset.menuItem) {
    addItemToCkeckout(Number(event.target.dataset.menuItem));
  } else if (event.target.dataset.remove) {
    handleRemoveClick(event.target.dataset.remove);
  } else if (event.target.id === "complete-order-btn") {
    handleCompleteOrderClick();
  }
});

const addItemToCkeckout = (itemId) => {
  hideThankYou();
  if (checkout.length === 0) {
    showCkeckout();
  }
  checkout.push(menuArray.filter((item) => item.id === itemId)[0]);
  renderCheckout();
};

const showCkeckout = () => {
  const checkoutEL = document.querySelector("#checkout");
  checkoutEL.classList.remove("hidden");
};

const hideCheckout = () => {
  const checkoutEL = document.querySelector("#checkout");
  checkoutEL.classList.add("hidden");
};

const renderCheckout = () => {
  const orderItemsContainerEl = document.querySelector(
    ".order-items-container"
  );
  orderItemsContainerEl.innerHTML = checkout
    .map((item, index) => {
      const { name, ingredients, id, price, emoji } = item;
      return `<div class="order-item">
                <h2>${name}</h2>
                <button class="remove-btn" data-remove="${index}">remove</button>
                <h3>$${price}</h3>
            </div>`;
    })
    .join("");
  renderPrice();
};

const renderPrice = () => {
  document.querySelector("#checkout-price").innerHTML = `$${checkout.reduce(
    (total, current) => {
      return total + current.price;
    },
    0
  )}`;
};

const handleRemoveClick = (itemIndex) => {
  checkout.splice(itemIndex, 1);
  if (checkout.length === 0) {
    hideCheckout();
  } else {
    renderCheckout();
  }
};

const handleCompleteOrderClick = () => {
  showModal();
};

const showModal = () => {
  document.querySelector(".modal").classList.remove("hidden");
};

const hideModal = () => {
  document.querySelector(".modal").classList.add("hidden");
};

const handlePayClick = () => {
  const modalFormData = new FormData(modalForm);
  const name = modalFormData.get("name");
  hideModal();
  hideCheckout();
  showThankYou();
  renderThankYou(name);
  checkout = [];
};

const renderThankYou = (name) => {
  document.querySelector(
    ".thank-you"
  ).innerHTML = ` <h2>Thanks, ${name}! Your order is on its way!</h2>`;
};

const showThankYou = () => {
  document.querySelector(".thank-you").classList.remove("hidden");
};

const hideThankYou = () => {
  document.querySelector(".thank-you").classList.add("hidden");
};

const renderMenu = () => {
  const menuEl = document.querySelector(".menu");
  menuEl.innerHTML = menuArray
    .map((menuItem) => {
      const { name, ingredients, id, price, emoji } = menuItem;
      return ` <div class="menu-items-container">
    <img src="/images/${name}.jpg" alt="menu item" class="menu-item" />
    <div class="menu-text-container">
    <h2>${name}</h2>
    <p>${ingredients.join(", ")}</p>
    <h3>$${price}</h3>
    </div>
    <button class="add-btn" data-menu-item="${id}">+</button>
  </div>`;
    })
    .join("");
};

renderMenu();
