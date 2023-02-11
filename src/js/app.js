import {
  createCart,
  getAccount,
  getCategories,
  getUsers,
  products,
  signIn,
  signUp,
} from "../api";
import {
  displayAccount,
  displayProducts,
  displayUsers,
  handleIntializeUsers,
  initializeMEvent,
  loadToken,
} from "./home";
import { displayCategore, SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import "./style";

document.addEventListener("DOMContentLoaded", async (e) => {
  const page = location.pathname;
  if (page === "/index.html" || page === "/") {
    products().then(({ data }) => {
      console.log(data.data);
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

  loadToken();
});
