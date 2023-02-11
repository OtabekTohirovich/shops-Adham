export function displayCategore(data = []) {
  let result = "";
  const productDetails = document.querySelector(".cotegore__wrap");
  data.forEach((prudoct) => {
    let { _id, name } = prudoct;
    result += `
              <div class="gets__category" data-id="${_id}>
                    <div class="categorea__title">${name}</div>
              </div>`;
  });
  productDetails.innerHTML = result;
}

export function SignIn(email, password) {
  try {
    this.email = email;
    this.password = password;
  } catch (err) {
    console.log(err);
  }
}
