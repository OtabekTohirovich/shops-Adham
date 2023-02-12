import { cartAdd, deleteCategory, deleteUser, editCategory, getUserCart, postOrder } from "../api";
import configs from "../configs";
import { OrderData } from "./sign-up";

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
              user.remove();
          }
      });
  });
}

export function displayAllUserOrder(data = []) {
  let result = "";
  const orderMenuNode = document.querySelector(".order__all--user");
  data.forEach((data) => {
    const {
      contact,
      customerId,
      items,
      paymentType,
      shipping,
      status,
      total,
      _id,
    } = data;
    items.forEach((data) => {
      getProductId(data.product).then(({ data }) => {
        console.log(data);
      });
    });

    result += `
      <div class="user__order rounded p-5" data-id="${_id}">
        <div class="order__contact">
          <h2>For contact</h2>
          <div class="name__contact">${contact.name}</div>
          <div class="email__contact">${contact.email}</div>
          <div class="phone__contact">${contact.phone}</div>
        </div>
        <div class="order__costumer" data-id="${customerId._id}">
          <h3>Costumer</h3>
          <div class="name__contact">${customerId.name}</div>
          <div class="email__contact">${customerId.email}</div>
          <div class="phone__contact">${customerId.phone}</div>
        </div>
        <div class="payment__type">${paymentType}</div>
        <div class="order__shipping">
          <h3>Costumer data</h3>
          <div class="name__contact">${shipping.address}</div>
          <div class="email__contact">${shipping.city}</div>
          <div class="phone__contact">${shipping.zip}</div>
        </div>
        <div>
          <div class="payment__type">${status}</div>
          <div class="payment__type">${total}</div>
        </div>
        <button class="remove__order btn btn-secondary">Remove</button>
        <button class="complated__order btn btn-primary">Completed order</button>
        <button class="cansel__order btn btn-danger">Cancel order</button>
      </div>
    `;
  });
  orderMenuNode.innerHTML = result;
}


export function orderForms() {
  const form = document.querySelector(".form__order");
    
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const formData = new OrderData(
        form.name.value,
        form.phone.value,
        form.address.value,
        form.city.value,
        form.zip.value,
        form.email.value,
      );
      getUserCart().then(({ data }) => {
        console.log(data);
        const itemId = data.payload.items.map((data) => {
          return {
            product: `${data.product._id}`,
            qty: `${data.qty}`,
            total: `${data.total}`,
          };
        });
        let totals= 0;
        const total = data.payload.items.forEach(data=>{
           totals = totals + data.total
        })
        console.log(itemId, totals);
  
        postOrder(localStorage.userId, formData, itemId, totals).then(({data})=>{
          console.log(data);
          location.reload();
          location.assign("/index.html")
        })
      });

    })
}


export function displayCategoryEdit(data = []) {
  let result = "";
  const productMenuNode = document.querySelector(".category");
  data.forEach((category) => {
    const { _id, name } = category;
    result += `<div class="category__link" data-id="${_id}"> 
    <p class="title__cate">${name}</p> 
     <div class="btn__category--wreapper">
     <button class="edit__category">Edit</button>
     <button class="delete__category">Delete</button>
     </div>
    </div>`;
  });
  productMenuNode.innerHTML = result;
}


export function handleInitializeCategory() {
  const cardNodeList = document.querySelectorAll(".category__link");
  cardNodeList.forEach((card) => {
    card.addEventListener("click", (event) => {
      const element = event.target;
      const id = card?.dataset?.id;
      let showMovieDetails = element
        .closest(".delete__category")
        ?.classList.contains("delete__category");
      if (showMovieDetails) {
        if (!id) return;
        deleteCategory(id);
        card.remove();
      }
      let showMovie = element
        .closest(".edit__category")
        ?.classList.contains("edit__category");
      if (showMovie) {
        if (!id) return;
        console.log("hellowss");
        const titleWrapper = event.target.parentElement.parentElement;
        let title = titleWrapper.children[0];
        console.log(titleWrapper, titleWrapper.children[0]);
        const text = prompt(" ", title.innerHTML);
        if (!text) return;
        title.innerHTML = text;
        editCategory(id, text).then((data) => {
          console.log(data);
        });
      }
    });
  });
}

export function CreateCategory(name) {
  try {
    this.name = name;
  } catch (err) {
    console.log(err);
  }
}

export function CreateProduct(
  name,
  price,
  salePrice,
  quantity,
  description,
  categoryId
) {
  try {
    this.name = name;
    this.price = price;
    this.salePrice = salePrice;
    this.quantity = quantity;
    this.description = description;
    this.categoryId = categoryId;
  } catch (err) {
    console.log(err);
  }
}