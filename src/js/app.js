import configs from "../configs";
import {
  addCategory,
  createCart,
  createNewProduct,
  getAccount,
  getAllUserOrder,
  getCategories,
  getUserCart,
  getUsers,
  products,
  signIn,
  signUp,
} from "../api";
import { displaycard, initializeCartEvent, initializeDeleteEvent } from "./card";
import {
  CreateCategory,
  CreateProduct,
  displayAccount,
  displayAllUserOrder,
  displayCategoryEdit,
  displayProducts,
  displayUsers,
  handleInitializeCategory,
  handleIntializeUsers,
  initializeMEvent,
  loadToken,
  orderForms,
} from "./home";
import socket from "./socket";
import { initializeOrderEvent } from "./order";
import { displayCategore, SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import "./style";

document.addEventListener("DOMContentLoaded", async (e) => {
  addEventListener("popstate", (event) => {
    location.reload();
  });
  const page = location.pathname;

  socket.on("/orders/new", (data) => {
    console.log("salom ishladi", data);
    // button.innerHTML = JSON.stringify(data);
  });
  if (page === "/index.html" || page === "/") {
    products().then(({ data }) => {
      displayProducts(data.data);
      initializeMEvent();
    });
    getCategories().then(({ data }) => {
      console.log(data);
      displayCategore(data.payload);
    });
  }
  if (page === "/sign-up.html" || page === "/sign-up") {
    const signUpForm = document.querySelector(".form__signup");
    try {
      signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new SignUp(
          signUpForm.name.value,
          signUpForm.lastName.value,
          signUpForm.email.value,
          signUpForm.password.value,
          signUpForm.phone.value
        );
        console.log(formData);
        signUp(formData)
          .then(({ data }) => {
            console.log(data);
            localStorage.token = data.token;
            localStorage.userId = data.user._id;
            localStorage.user = JSON.stringify(data.user.role);
            createCart().then(({ data }) => {
              console.log(data);
              localStorage.cartId = data.payload._id;
              location.assign("/");
            });
          })
          .catch((err) => {});
      });
    } catch (err) {
      console.log(err);
    }
  }
  if (page === "/sign-in.html" || page === "/sign-in") {
    const signInForm = document.querySelector(".signIn_form");
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new SignIn(
        signInForm.email.value,
        signInForm.password.value
      );

      console.log(formData);
      signIn(formData)
        .then(({ data }) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.userId = data.payload._id;
          localStorage.user = JSON.stringify(data.payload.role);
          location.assign("/");
        })
        .catch((err) => {});
    });
  }
  if (page === "/account.html" || page === "/account") {
    getAccount().then(({ data }) => {
      console.log(data);
      displayAccount(data.payload);
    });
  }

  if (page === "/all-users.html" || page === "/all-users") {
    getUsers().then(({ data }) => {
      console.log(data);
      displayUsers(data);
      handleIntializeUsers();
    });
  }
  if (page === "/order.html" || page === "/order") {
    getAllUserOrder().then(({ data }) => {
      console.log(data);
      displayAllUserOrder(data.data);
      initializeOrderEvent();
    });
  }
  if (page === "/cart-order.html" || page === "/cart-order") {
    orderForms()
  }

  if (page === "/category.html" || page === "/category") {
    getCategories().then(({ data }) => {
      console.log(data);
      displayCategoryEdit(data.payload);
      handleInitializeCategory();
    });
    let formCate = document.querySelector(".addcate");
    if (formCate) {
      formCate.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new CreateCategory(formCate.name.value);

        addCategory(formData).then((data) => {
          console.log(data.data.payload.name);
          let dataCate = document.querySelector(".category");
          dataCate.innerHTML += `<div class="category__link" data-id="${data.data.payload._id}"> 
          <p class="title__cate">${data.data.payload.name}</p> 
           <div class="btn__category--wreapper">
           <button class="edit__category">Edit</button>
           <button class="delete__category">Delete</button>
           </div>
          </div>`;
          handleInitializeCategory();
        });
        formCate.reset();
      });
    }
    let genreWrepper = document.querySelector(".categore__products");  
    getCategories().then(({ data }) => {
      console.log(data);
      let genresTemplate = "";
      data.payload.forEach((genre) => {
        genresTemplate += `<li class="category__type">
          <input name="categoryId" type="radio" id=${genre._id} value=${genre._id}  /> 
          <label for="${genre._id}">${genre.name}</label></li>`;
      });
      genreWrepper.innerHTML = genresTemplate;
    });
    const formProduct = document.querySelector(".create__products");
    formProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new CreateProduct(
        formProduct.name.value,
        formProduct.price.value,
        formProduct.salePrice.value,
        formProduct.quantity.value,
        formProduct.description.value,
        formProduct.categoryId.value
      );
      
      console.log(formData);
      createNewProduct(formData).then(({data}) => {
        console.log(data);
      });
    });
  }
  if (page === "/card.html" || page === "/card") {
    getUserCart().then(({data}) => {
      console.log(data);
      displaycard(data.payload.items)
      initializeDeleteEvent()
      initializeCartEvent(data.payload.items)
    })
  }



  loadToken();
});
