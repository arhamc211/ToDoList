// Get the input field and the list container from the HTML document
const inputfield = document.getElementById("input-field");
const listbox = document.getElementById("list1");

function addToList() {
    // check if input box is empty
    if (inputfield.value.trim() === '') {  
        alert("nothing is written"); // Alert the user if no text is entered
    } 
    else {
        // make new <li> element (list item)
        let li = document.createElement("li");
        
        // set text of <li> element to value entered in the input field
        li.textContent = inputfield.value;

        // add the new <li> element to the list container
        listbox.appendChild(li);

        let tasks;
        let storedTasks = JSON.parse(localStorage.getItem("tasks"));
        
        if (storedTasks !== null) {
            tasks = storedTasks;
        } else {
            tasks = [];
        }
        
        // add the new task to the array, with a default status of false
        tasks.push({ text: inputfield.value, completed: false });

        // save the updated task list back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    // Clear the input field after adding the task
    inputfield.value = "";
}

function loadTasks() {
   
    // retrieve tasks from localStorage, or create an empty array if none exist
    let tasks;
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks !== null) {
        tasks = storedTasks;
    } else {
        tasks = [];
    }

    // loop through each task stored in localStorage
    tasks.forEach(task => {
        // create a new <li> element for each task
        let li = document.createElement("li");
        // set the text of the <li> element to the stored task text
        li.textContent = task.text;
        // if the task was previously marked as completed, apply the 'striked' class
        if (task.completed) {
            li.classList.add("striked"); // apply strike-through style
        }
        // attach the click event listener to activate the strike-through
        li.addEventListener("click", strikeOut);
        // add the <li> element to the list container
        listbox.appendChild(li);
    });
}

//load tasks when window loads
window.onload = loadTasks;

function strikeOut(event) {
    // check if the clicked element is a list item (<li>)
    if (event.target.tagName === 'LI') {
        // activate the 'striked' class to add/remove strike-through 
        event.target.classList.toggle('striked');

    // retrieve tasks from localStorage, or create an empty array if none exist
        let tasks;
        let storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks !== null) {
            tasks = storedTasks;
        } else {
            tasks = [];
        }

    // Find the index of the clicked task in the list
    let index = Array.from(listbox.children).indexOf(event.target);

    // Toggle the 'completed' status of the corresponding task in the array
    tasks[index].completed = !tasks[index].completed;

    // Save the updated task list back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    }
}

function deleteTasks() {
    // check if list is empty before trying to delete tasks
    if (listbox.children.length === 0) {
        alert("list is empty"); 
    } 
    else {
        // clear all tasks from the list
        listbox.innerHTML = "";

        // clear all tasks from localStorage
        localStorage.removeItem("tasks");
    }
}
