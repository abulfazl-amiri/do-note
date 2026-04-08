import "./style.css";

const btnLogin = document.querySelector(".btn-login");
const inputUsername = document.querySelector(".input-username");
const inputPin = document.querySelector(".input-pin");
const formLogin = document.querySelector(".form-login");

if (localStorage.getItem("user-access-token")) {
  location.href = "/";
}

const getUserCredentials = function () {
  const username = inputUsername.value.trim();
  const pin = inputPin.value.trim();
  return {
    username,
    pin,
  };
};

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(getUserCredentials());

  // TODO:  Validate Credentials
  // TODO: Create tokens
  localStorage.setItem("user-access-token", getUserCredentials());
  // TODO: Save to accounts

  location.href = "/";
});
