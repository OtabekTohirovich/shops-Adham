import { products } from "../api";
import { displayProducts, initializeMEvent } from "./home";
import "./style";

document.addEventListener("DOMContentLoaded", async (e) => {
  const page = location.pathname;
  if (page === "/index.html" || page === "/") {
    products().then(({ data }) => {
        console.log(data.data);
        displayProducts(data.data);
        initializeMEvent()
      });
  }
});
