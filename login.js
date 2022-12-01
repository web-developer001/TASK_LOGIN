"use strict";

let baseURL = "https://task.samid.uz/v1/user";

// ----------------------- LOGIN FORM -------------------------

const login = (e) => {
  e.preventDefault();

  const userName = $("#userName").value.trim();
  const userPassword = $("#userPassword").value.trim();

  const params = {
    username: userName,
    password: userPassword,
  };

  if (userName.length === 0 || userPassword.length === 0) {
    alert();
  } else {
    fetch(`${baseURL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((e) => e.json())
      .then((e) => {
        console.log(e);

        if (e.code === 1) {
          localStorage.setItem("token", e.data.token);
          localStorage.setItem('user', e.data.username)
          alert(`${e.data.username} welcom to admin dashbard`);
          window.location.replace("./index.html");
        } else {
          console.log(e);
          alert(e.message);
        }
      });
  }
};

$("#login").addEventListener("submit", (e) => {
  login(e);
});
