import "./styles.css";
import "./styles.scss";

import renderProducts from "./components/catalog";
import renderCart from "./components/cart";

fetch("./data.json")
  .then((response) => response.json())
  .then((res) => {
    // глобально сохраним данные о товарах
    window.products = res;
    // Отрисовываем каталог товаров
    renderProducts();
    // Отрисовываем корзину
    renderCart();
  });
