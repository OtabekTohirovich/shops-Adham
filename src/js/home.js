import { cartAdd } from "../api";
import configs from "../configs";

export function displayProducts(data = []) {
  let result = "";
  const productDetails = document.querySelector(".get__products");
  data.forEach((prudoct) => {
    let { _id, img, name, description, salePrice, quantity } = prudoct;
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
          </div>
          <div class="card__btn">
            <button class="btns  save__cart">Savatga qo'shish</button>
          </div>
        
        </div>
        
      </article>
    </div>`;
  });
  productDetails.innerHTML = result;
}
export function initializeMEvent() {
  const cardNodeList = document.querySelectorAll(".card");
  cardNodeList.forEach((card) => {
    card.addEventListener("click", (event) => {
      const element = event.target;
      const id = card?.dataset?.id;
      if (!id) return;
      let isMenuBtn = element
        .closest(".save__cart")
        ?.classList.contains("save__cart");

      if (isMenuBtn) {
        cartAdd(localStorage.userId, id).then(({ data }) => {
          console.log(data);
        });
      }
    });
  });
}
export function displayAccount(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".account__wreapper");
  const { _id, name, img, address, email, lastName, phone, createdAt } = data;
  const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
  result += `<div class="account" data-id="${_id}">
      <div class="card__img">
        <img width="20%" src="${imgs}" alt="product">
      </div>
       <h1 class="user__name">${name}</h1>
       <p class="user__lastname">${lastName}</p>
       <p class="user__lastname">${address}</p>
       <p class="user__lastname">${email}</p>
       <p class="user__lastname">${phone}</p>
       <p class="user__lastname">${createdAt.slice(0, 10)}</p>
       </div>`;
  productMenuNode.innerHTML = result;
}

export function loadToken() {
  if (localStorage.token) {
    let img__wrapper = document.querySelector(".account__img");
    let auth__link = document.querySelector(".navbar__btns");
    if (!auth__link || !img__wrapper) return;
    auth__link.remove();
    img__wrapper.classList.remove("hide");
  }
}

export function displayUsers(data = []) {
  const cardNodeList = document.querySelector(".users__wreapper");
  let result =""
  data.forEach((users) => {
    const { _id, img, name, lastName, phone, email } = users;
    const imgs = img ? configs.baseImgURL + img : configs.defaultImg + "400";
    result += `
      <div class="col">
        <article class="product__link" data-id="${_id}">
            <img src="${imgs}" alt="home" />
            <h1>${name}</h1>
            <p>${lastName}</p>
            <div>${phone}</div>
            <h4>${email}</h4>
            <div class="btn">
            <button>add</button>
            <button class="btn__remove">O'chirish</button>
            </div>
        </article>
      </div>`;
  });

  cardNodeList.innerHTML = result;
}

export function handleIntializeUsers() {
  const cardNodeList = document.querySelectorAll(".product__link");
  cardNodeList.forEach((user) => {
      user.addEventListener("click", (event) => {
          const element =event.target;
          const id =user?.dataset?.id;
          let showMoviDetails =
          element.closest(".btn__remove")?.classList.contains("btn__remove");
          if (showMoviDetails){
              if(!id) return;
              deleteUser(id);
              user.parentElement.remove();
          }
      });
  });
}