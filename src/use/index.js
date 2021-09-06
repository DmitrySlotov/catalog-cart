import renderCart from "../components/cart";
import renderProducts from "../components/catalog";

// Получаем данные из LocalStorage
export function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}
// Записываем данные в LocalStorage
export function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
  return false;
}

// Добавляем товар в корзину
export function addToCart() {
  const itemId = this.getAttribute("data-id");
  const cartData = getCartData() || {};

  const product = window.products.find(
    (item) => item.id.toString() === itemId.toString()
  );
  if (product) {
    if (cartData.hasOwnProperty(itemId)) {
      // если такой товар уже в корзине, то добавляем +1 к его количеству
      cartData[itemId].count += 1;
    } else {
      // если товара в корзине еще нет, то добавляем в объект
      cartData[itemId] = { ...product, count: 1 };
    }
    setCartData(cartData);
    renderCart();
    renderProducts();
  }
}

// Удаление товара из корзины
export function deleteFromCart() {
  const itemId = this.getAttribute("data-id");
  const cartData = getCartData() || {};
  const product = window.products.find(
    (item) => item.id.toString() === itemId.toString()
  );
  if (product) {
    if (cartData.hasOwnProperty(itemId)) {
      // удаляем товар из корзины
      delete cartData[itemId];
      setCartData(cartData);
      renderCart();
      renderProducts();
    }
  }
}

// Уменьшение количество заказываемого товара (-)
export function minusFromCart() {
  const itemId = this.getAttribute("data-id");
  const cartData = getCartData() || {};
  const product = window.products.find(
    (item) => item.id.toString() === itemId.toString()
  );
  if (product) {
    // eslint-disable-next-line no-prototype-builtins
    if (cartData.hasOwnProperty(itemId)) {
      if (cartData[itemId].count > 1) {
        cartData[itemId].count -= 1;
      } else {
        delete cartData[itemId];
      }
      setCartData(cartData);
      renderCart();
      renderProducts();
    }
  }
}

// Определение, можно ли ещё этот товар добавить
export function canAddMore(id) {
  const cartData = getCartData() || {};
  if (!cartData.hasOwnProperty(id)) {
    return true;
  } else {
    const item = cartData[id];
    if (item.count < item.maxPerPerson && item.count < item.amount) {
      return true;
    }
  }
  return false;
}

// Указываем актуальное состояние кнопок добавления по селектору и состоянию корзины
export function disableAddButtons(selector) {
  const itemBoxes = document.querySelectorAll(selector);
  for (let i = 0; i < itemBoxes.length; i++) {
    const itemId = itemBoxes[i].getAttribute("data-id");
    itemBoxes[i].disabled = !canAddMore(itemId);
  }
}
