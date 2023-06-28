//render all tasks on refresh and load
showtask();

let addtaskinput = document.getElementById("input");
let addtaskbtn = document.getElementById("add");
const taskInput = document.querySelector(".input");

let editId
let isEditTask = false;

//add task in local storage when press enter key 
taskInput.addEventListener("keyup", e => {
    todos = JSON.parse(localStorage.getItem("localtask"));
    let inputval = addtaskinput.value.trim();
    if (e.key == "Enter" && inputval) {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: inputval, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos.name = inputval;
        }
        addtaskinput.value = "";
        localStorage.setItem("localtask", JSON.stringify(todos));
        showtask();
    }

})

//add task to local storage when click add button
addtaskbtn.addEventListener("click", () => {

    let inputval = addtaskinput.value.trim();
    if (inputval) {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: inputval, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos.name = inputval;
        }
        addtaskinput.value = "";
        localStorage.setItem("localtask", JSON.stringify(todos));
        showtask();
    }

})

// get tasks into local storage and show tasks on browser 
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        todos = [];
    } else {
        todos = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("add-items");
    todos.forEach((item, index) => {
        //condition for complete task
        let completed = item.status == "completed" ? "checked" : "";
        html += `
        
        <div class="row m-0">
        <div class="col-2">
        <label class="check" for="${index}">
        <input onclick="updateStatus(this)" type="checkbox"  id="${index}"
         ${completed}>
         </label>
      
        <span class="input">${index+1}</span>
        </div>
        
        <div class="col-7">
        
        <span>${item.name}</span>
        </div>
        <div class="col-3">
        <img src="edit.png" onclick="edittask(${index},'${item.name}')" class="mx-2" style="width:20px;cursor:pointer;"/>
        
        <img src="delete.png" onclick="deleteitem(${index})" class="" style="width:20px;cursor:pointer;"/>
        </div>
        </div>
          
          <hr>
        
          `

    });
    addedtasklist.innerHTML = html;
}

//edit task

function edittask(eid, textName) {
    saveindex = document.getElementById("saveindex").value;
    savetaskbtn = document.getElementById("savetaskbtn");
    addtaskbtn = document.getElementById("add");


    saveindex = eid;
    console.log(saveindex)
    todos = JSON.parse(localStorage.getItem("localtask"));

    addtaskinput.value = textName;
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
}
//task save after edit

saveedit = document.getElementById("savetaskbtn");
saveedit.addEventListener("click", () => {
    todos = JSON.parse(localStorage.getItem("localtask"));

    isEditTask = true;
    id = saveindex;
    console.log(saveindex)
    todos[id].name = addtaskinput.value;
    console.log(todos[id].name)
    addtaskbtn.style.display = "block";
    savetaskbtn.style.display = "none";
    localStorage.setItem("localtask", JSON.stringify(todos));
    addtaskinput.value = "";
    showtask();
})



//complete task

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";

    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("localtask", JSON.stringify(todos))
}

//delete individual task

function deleteitem(index) {
    let webtask = localStorage.getItem("localtask");
    let todos = JSON.parse(webtask);
    todos.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(todos));
    showtask();
}

//clear all tasks
let deleteallbtn = document.getElementById("clearbtn");
deleteallbtn.addEventListener("click", function() {

    let webtask = localStorage.getItem("localtask");
    let todos = JSON.parse(webtask);
    if (webtask == null) {
        todos = [];
    } else {
        todos = JSON.parse(webtask);
        todos = [];
    }

    localStorage.setItem("localtask", JSON.stringify(todos));
    addtaskinput.value = '';
    showtask();

})