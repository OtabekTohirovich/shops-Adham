import { daleteProductCard, deleteCart } from "../api";
import configs from "../configs";
export function displaycard(data = []) {
  let result = "";
  const productDetails = document.querySelector(".cart__title");
  data.forEach((cart) => {
    let { _id, img, name, salePrice, quantity, description } = cart.product;
    let { qty, total } = cart;
    const imgs = img ? img : configs.defaultImg + "400";
    result += `
  
      <div class="col">
      <article class="card" data-id="${_id}">
      <div class="card__header">
      <div class="card__img">
      <img width="100%" src="${imgs}" alt="product">
      </div>
      </div>
      <div class="card__body">
      <div class="card__title">${name}</div>
      <div class="card__discription">${description.slice(0, 23)}</div>
      <div class="card__count">
      <div class="card__prise">
      ${salePrice} ming
      </div>
      <div class="count__products">${quantity} k/n</div>
      <div>${total} ${qty}</div>
      </div>
          <div class="card__btn">
      <button class="delete__cart">delete</button>
          </div>
          
        </div>
        
      </article>
    </div>`;
  });
  productDetails.innerHTML = result;
}

export function initializeDeleteEvent() {
  const cardNodeList = document.querySelector(".card__btn2");
  cardNodeList.addEventListener("click", () => {
    deleteCart(localStorage.userId).then(({ data }) => {
      console.log(data);
      const dalete = document.querySelector(".cart__title");
      dalete.remove();
    });
  });
}

export function initializeCartEvent(data) {
  const moviesStatus = document.querySelectorAll(".card");
  moviesStatus.forEach((card) => {
    card.addEventListener("click", (event) => {
      const id = event.target.closest(".card")?.dataset?.id;
      console.log(id);
      let result = 1;
      console.log(id, "bosilgan");
      if (!id) return;
      const isMenuBtn = event.target
        .closest(".delete__cart")
        ?.classList.contains("delete__cart");
      console.log(isMenuBtn);
      if (isMenuBtn) {
        const itemid = data.filter((item) => {
          return item.product._id != id;
        });
        console.log(itemid);
        const dataCart = itemid.map((data) => {
          return {
            product: `${data.product._id}`,
            qty: `${data.qty}`,
            total: `${data.total}`,
            _id: `${data._id}`,
          };
        });
        daleteProductCard(localStorage.userId, dataCart ? dataCart : {}).then(
          (data) => {
            console.log(data);
            card.parentElement.remove();
          }
        );
      }
    });
  });
}
