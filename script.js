//Get all html elements
let form = document.querySelector('.form');
let taskTitle = document.querySelector('#task-title');
let taskDate = document.querySelector('#task-date')
let titleErrorMsg = document.querySelector('#title-error-msg');
let taskDescription = document.querySelector('#task-description')
let dateErrorMsg = document.querySelector('#date-error-msg');
let descriptionErrorMsg = document.querySelector('#description-error-msg');
let addTaskBtn = document.querySelector('#add-task-btn');
let taskList = document.querySelector("#task-list");
let closeBtn = document.querySelector(".close")
let modal = document.getElementById("myModal");
let btn = document.getElementById("my-btn");
let span = document.getElementsByClassName("close");
let editTaskBtn = document.getElementsByClassName('edit-task');

//Display moadal when add new task is clicked
btn.onclick = function() {
    modal.style.display = "block";
}

//Close modal when the close button is clicked
closeBtn.onclick = (e) => {
    if(e.target == closeBtn){
        modal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

//Prevents user form submitting blanks input fields
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    formValidation()
});


//Validate every input field
let formValidation = () => {
    if(taskTitle.value === ""){
        console.log("Failture");
        titleErrorMsg.innerHTML = "Task cannot be empty!";
    }
    else if(taskDate.value === "")
    {
        dateErrorMsg.innerHTML = "Date cannot be empty!"
    }
    else if(taskDescription.value === "")
    {
        descriptionErrorMsg.innerHTML = "Description cannot be empty!";
    } else {
        console.log("Success")
        accetData();
       // closeOnAdd();
    }
};


//Close modal when add button is clicked
let closeOnAdd = () => {
    addTaskBtn.onclick = (e) => {
        console.log('Add task button clicked!')
        if (e.target == addTaskBtn) {
        modal.style.display = "none";
        }
    }
}

//Accept user input and save to loacl storage
let data = [];
let accetData = () => {
    data.push({
        title: taskTitle.value,
        date: taskDate.value,
        description: taskDescription.value,
    });
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data)
    createTasks();
}

//Create new task
let createTasks = () => {
    taskList.innerHTML = "";
    data.map((x, y) => {
        return (taskList.innerHTML += `
        <li id=${y} class="task">
            <div class="task-container">
                <p>${x.title}</p>
                <p>${x.date}</p>
                <p>${x.description}</p>
            </div>
            <div class="edit-delete-task">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#mymodal" class="fa fa-edit edit-task"></i>
                <i onClick="deleteTask(this);createTasks()" class="fa fa-trash delete-task hide"></i>
            </div>
        </li>
        `);
    });
    resetForm();
}

//Delete task function
let deleteTask = (e) => {
    e.parentElement.style.animationPlayState = 'running';
    console.log(e.parentElement.parentElement);
    
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    }

//Edit task function
let editTask = (e) => {
    let selectedTask  = e.parentElement.parentElement;
    taskTitle.value = selectedTask.children[0].children[0].innerHTML;
    console.log(taskTitle.value);
    taskDate.value = selectedTask.children[0].children[1].innerHTML;
    taskDescription.value = selectedTask.children[0].children[2].innerHTML;
    deleteTask(e);
}

//Reset the form
let resetForm = () => {
    taskTitle.value = "";
    taskDate.value = "";
    taskDescription.value = "";
    dateErrorMsg.innerHTML = "";
    descriptionErrorMsg.innerHTML = "";
    titleErrorMsg.innerHTML = "";
    closeOnAdd();
};

//Animation
document.addEventListener('click', function(event){
    const element = event.target;
    if(element.className === 'hide'){
        console.log("Hide")
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', function(){
            element.parentElement.remove();
        })
    }
});

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data)
    createTasks();
})();
