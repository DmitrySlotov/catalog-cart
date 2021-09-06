import addEvent from "../../utils";
import {
  getCartData,
  deleteFromCart,
  minusFromCart,
  addToCart,
  disableAddButtons,
} from "../../use";

// Отрисовка корзины товаров
export default function renderCart() {
  const items = getCartData();
  const cartDiv = document.getElementById("cart");
  const cartAllPrice = getAllCartPrice();
  const cartItemsLength = items ? Object.keys(items).length : 0;
  const title = cartItemsLength
    ? `В корзине ${cartItemsLength} товаров на сумму ${cartAllPrice} рублей`
    : "Корзина пуста";
  let cartItems = `
    <div class="sticky top-0 bg-white m-5 rounded-md shadow p-5">
        <h1 class="flex-auto text-xl font-semibold">${title}</h1>
    </div>
  `;
  if (cartItemsLength > 0) {
    const arr = Object.entries(items);
    for (let idx in arr) {
      const product = arr[idx][1];

      cartItems += `
        <div class="cart-item bg-white m-5 rounded-md shadow">
            <form class="flex-auto p-6">
                <div class="flex space-x-3 mb-4 text-sm font-medium justify-between items-center mt-5">
                    <h2 class="flex-auto text-xl font-semibold">
                        № ${parseInt(idx, 10) + 1} ${product.productName}
                    </h2>
                    <div class="text-xl font-semibold text-gray-500">
                        Итого ${product.price * product.count}
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <div class="text-sm font-medium text-gray-500">
                        Осталось ${product.amount} (Максимум ${
        product.maxPerPerson
      } шт в руки)
                    </div>
                </div>
                <div class="flex space-x-3 mb-4 text-sm font-medium justify-between items-center mt-5">
                    <div class="flex space-x-3 items-center">
                        <div class="text-sm font-medium text-gray-500">
                            Количество
                        </div>
                        <div class="space-x-3">
                            <button data-id="${
                              product.id
                            }" class="minus-cart-item-count items-center justify-center rounded-md border border-gray-300 py-1 px-2" type="button">-</button>
                        </div>
                        <div class="text-sm font-medium text-gray-500">
                            ${product.count}
                        </div>
                        <div class="space-x-3">
                            <button data-id="${
                              product.id
                            }" class="plus-cart-item-count items-center justify-center rounded-md border border-gray-300 py-1 px-2 disabled:opacity-30" type="button">+</button>
                        </div>
                    </div>
                    <div class="space-x-3 justify-self-end">
                        <button data-id="${
                          product.id
                        }" class="delete-cart-item items-center justify-center rounded-md border border-red-300 text-red-300 p-2" type="button">Удалить</button>
                    </div>
                </div>
            </form>
        </div>
    `;
    }
  }
  cartDiv.innerHTML = cartItems;
  addCartItemsEvents();
  disableAddButtons(".cart-item .plus-cart-item-count");
}

// Общая стоимость товаров в корзине
function getAllCartPrice() {
  const cartData = getCartData() || {};
  let price = 0;
  for (let item in cartData) {
    price += cartData[item].price * cartData[item].count;
  }
  return price;
}

// Добавляем обработчики товаров в корзине
function addCartItemsEvents() {
  const itemBoxes = document.querySelectorAll(".cart-item");
  for (let i = 0; i < itemBoxes.length; i++) {
    // Добавляем обработчик удаления товаров из корзины
    addEvent(
      itemBoxes[i].querySelector(".delete-cart-item"),
      "click",
      deleteFromCart
    );
    // Добавляем обработчик уменьшения количества заказываемого товара
    addEvent(
      itemBoxes[i].querySelector(".minus-cart-item-count"),
      "click",
      minusFromCart
    );
    // Добавляем обработчик увеличения количества заказываемого товара
    addEvent(
      itemBoxes[i].querySelector(".plus-cart-item-count"),
      "click",
      addToCart
    );
  }
}
