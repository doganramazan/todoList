const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //geting user entered value
    if (userData.trim() != 0) { //if user values arent only spaces
        addBtn.classList.add("active") //active the add button
    } else {
        addBtn.classList.remove("active") //this is removing the add button.
    }
}

// if users click on the add button

addBtn.onclick = () => {
    let userData = inputBox.value; //geting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //creacting blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object 
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTask();
    addBtn.classList.remove("active") //this is removing the add button.
}

function showTask() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object 
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick= "deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag
    inputBox.value = ""; //once task added leave the input blank
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTask();
}

// delete all task function
deleteAllBtn.onclick = () => {
    listArr = []; //empty an array
    //after delete all the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTask();
}