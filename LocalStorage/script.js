const storeRegister = () => {
  // buat dalam bentuk array, dan periksa jika data sudah ada, maka akan bentuk data baru
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const emailValue = email.value;
  const passwordValue = password.value;

  users.push({
    email: emailValue,
    password: passwordValue,
  });

  // simpan dalam bentuk string (JSON)
  localStorage.setItem("users", JSON.stringify(users));

  alert("Berhasil register");
  loginView();
};

const storeLogin = () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  // Ambil data pengguna yang tersimpan di localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.email === emailValue && user.password === passwordValue
  );

  if (user) {
    alert("Berhasil Login");
    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", passwordValue);

    updateUI();
  } else {
    alert("Gagal Login");
  }
};

const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("password");

  updateUI();
};

const clearInput = () => {
  email.value = "";
  password.value = "";
};

const registerView = () => {
  title.innerText = "Register";
  submitLogin.classList.add("hidden");
  submitRegister.classList.remove("hidden");
  goToRegister.classList.add("hidden");
  goToLogin.classList.remove("hidden");
  clearInput();
};

const loginView = () => {
  title.innerText = "Login";
  submitRegister.classList.add("hidden");
  submitLogin.classList.remove("hidden");
  goToLogin.classList.add("hidden");
  goToRegister.classList.remove("hidden");
  clearInput();
};

const updateUI = () => {
  const emailKey = localStorage.getItem("email");
  const passwordKey = localStorage.getItem("password");
  const box = document.getElementById("box");
  const boxUser = document.getElementById("boxUser");
  const name = boxUser.querySelector("p");

  if (emailKey && passwordKey) {
    // login
    box.classList.add("hidden");
    boxUser.classList.remove("hidden");
    name.innerText += " " + emailKey;
  } else {
    boxUser.classList.add("hidden");
    box.classList.remove("hidden");
  }

  clearInput();
};

// MAIN
const email = document.querySelector("input[name='email']");
const password = document.querySelector("input[name='password']");
const goToRegister = document.getElementById("goToRegister");
const goToLogin = document.getElementById("goToLogin");
const title = box.querySelector("h1");
const submitRegister = document.querySelector(
  "button[onclick='storeRegister()']"
);
const submitLogin = document.querySelector("button[onclick='storeLogin()']");

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    storeRegister();
    storeLogin();
  }
});

goToLogin.addEventListener("click", loginView);
goToRegister.addEventListener("click", registerView);

updateUI();
