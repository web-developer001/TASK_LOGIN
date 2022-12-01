"use strict";

const baseURL = "http://localhost:7070";

const fetchData = async () => {
  const response = await fetch(`${baseURL}/post`);
  const data = await response.json();
  dataRender(data);
};
fetchData();

function dataRender(data = []) {
  data.length > 0
    ? data.forEach((el, i) => {
        const tr = createElement(
          "tr",
          "item",
          `
        <td>${i + 1}</td>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.date}</td> 
        <td> <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-edit="${
          el.id
        }">EDIT</button> </td>
        <td> <button class="btn btn-danger" data-del="${
          el.id
        }">DELETE</button> </td>
        `
        );
        $("#data").appendChild(tr);
      })
    : ($("#data").innerHTML = "NOT FOUND");
}

const addTask = () => {
  const taskTitle = $("#taskTitle").value.trim();
  const taskDesc = $("#taskDesc").value.trim();
  const taskDate = $("#taskDate").value.trim();

  if (
    taskTitle.length === 0 ||
    taskDesc.length === 0 ||
    taskDate.length === 0
  ) {
    $(".toastify").style.backgroundColor = "crimson";
    $(".toastify").innerHTML = `<h5>Malumot yetarli emas!</h5>`;
    $(".toastify").style.transform = "translateX(0px)";
    setTimeout(() => {
      $(".toastify").style.transform = "translateX(200%)";
    }, 1500);
  } else {
    $(".toastify").style.backgroundColor = "lime";
    $(".toastify").innerHTML = `<h5>Muoffaqiyatli qo'shildi!</h5>`;
    $(".toastify").style.transform = "translateX(0px)";

    setTimeout(() => {
      $(".toastify").style.transform = "translateX(200%)";
      fetch(`${baseURL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          date: taskDate,
        }),
      });
    }, 2000);
  }
};

$("#add").addEventListener("submit", () => {
  addTask();
});

// ===================== DELETE FUNCTION ========================

$("#data").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    let id = e.target.getAttribute("data-del");
    deleteUser(id);
  }
});

const deleteUser = (id) => {
  $(".toastify").style.backgroundColor = "lime";
  $(".toastify").innerHTML = `<h5>Muoffaqiyatli o'chirildi!</h5>`;
  $(".toastify").style.transform = "translateX(0px)";
  setTimeout(() => {
    $(".toastify").style.transform = "translateX(200%)";
    fetch(`http://localhost:7070/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }, 2000);
};

// ===================== DELETE FUNCTION END========================

// ===================== EDIT FUNCTION ========================

$("#data").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-warning")) {
    let id = e.target.getAttribute("data-edit");

    localStorage.setItem("editUser", id);
    
    fetch(`http://localhost:7070/post/${id}`)
      .then((res) => res.json())
      .then((result) => setValue(result))
      .catch((err) => console.log(err));
  }
});


const updateUser = () => {
  let id = localStorage.getItem("editUser");
   console.log(id);

   let newTitle = $("#editTitle").value.trim();
  let newDesc = $("#editDesc").value.trim();
  let newDate = $("#editDate").value.trim();

  if (
    newTitle.length === 0 ||
    newDesc.length === 0 ||
    newDate.length === 0
  ) {
    $(".toastify").style.backgroundColor = "crimson";
    $(".toastify").innerHTML = `<h5>Malumot yetarli emas!</h5>`;
    $(".toastify").style.transform = "translateX(0px)";
    setTimeout(() => {
      $(".toastify").style.transform = "translateX(200%)";
    }, 1500);
  } else {
    fetch(`http://localhost:7070/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDesc,
        date: editDate,
      }),
    });
  }
};


$("#addedit").addEventListener("submit", () => {
  updateUser();
});

function setValue(date) {
  console.log(date);

  $("#editTitle").value = date.title;
  $("#editDesc").value = date.description;
  $("#editDate").value = date.date;
}



(function(){
let userName=localStorage.getItem('user')
let token=localStorage.getItem("token")
$('#userLogin').innerHTML=`${userName}`
if (!token){
  location.replace('./login.html')
}
}())

$("#logout").addEventListener("click" , ()=>{
  localStorage.clear()
  location.reload()
})