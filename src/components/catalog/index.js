import addEvent from "../../utils";
import { addToCart, disableAddButtons } from "../../use";

// Отрисовка каталога товаров
export default function renderProducts() {
  const items = window.products;
  const productsDiv = document.getElementById("products");
  let products = `
    <div class="bg-white m-5 rounded-md shadow p-5">
        <h1 class="flex-auto text-xl font-semibold">
            Имеющиеся категории товаров (${items.length})
        </h1>
    </div>
  `;
  for (let idx in items) {
    const product = items[idx];
    products += `
        <div class="product bg-white m-5 rounded-md shadow">
            <form class="flex-auto p-6">
                <div class="flex flex-wrap">
                    <h2 class="flex-auto text-xl font-semibold">
                        ${product.productName}
                    </h2>
                    <div class="text-xl font-semibold text-gray-500">
                        ${product.price}
                    </div>
                </div>
                <div class="flex space-x-3 mb-4 text-sm font-medium justify-between items-center mt-5">
                    <div class="text-sm font-medium text-gray-500">
                        Осталось ${product.amount} (Максимум ${product.maxPerPerson} шт в руки)
                    </div>
                    <div class="space-x-3">
                        <button class="add-to-cart items-center justify-center rounded-md border border-gray-300 p-2 disabled:opacity-30" type="button" data-id="${product.id}">Добавить в корзину</button>
                    </div>
                </div>
            </form>
        </div>
    `;
  }
  productsDiv.innerHTML = products;
  addToChartBtnEvents();
  disableAddButtons(".product .add-to-cart");
}

// Добавляем обработчики добавления товаров в корзину
function addToChartBtnEvents() {
  const itemBoxes = document.querySelectorAll(".product");
  // Устанавливаем обработчик события на каждую кнопку Добавить в корзину
  for (let i = 0; i < itemBoxes.length; i++) {
    addEvent(itemBoxes[i].querySelector(".add-to-cart"), "click", addToCart);
  }
}
