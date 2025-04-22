const todolists = document.querySelector(".todolists");
const listvalue = document.querySelector(".todovalue");
const form = document.querySelector("#todo-form");

let todolistvalue = [];

const getlistfromlocal = () => {
    return JSON.parse(localStorage.getItem("todolist")) || [];
};

const addtodolistLocalStorage = (todo) => {
    localStorage.setItem("todolist", JSON.stringify(todo));
};

const showtodolist = () => {
    todolists.innerHTML = ""; // Clear old list before rendering
    todolistvalue = getlistfromlocal();

    todolistvalue.forEach((curtodo) => {
        const li = document.createElement("li");
        li.textContent = curtodo;
        todolists.appendChild(li);
    });
};

const addtodolist = (e) => {
    e.preventDefault();

    let newtodo = listvalue.value.trim();
    if (newtodo.length && !todolistvalue.includes(newtodo)) {
        todolistvalue.push(newtodo);
        addtodolistLocalStorage(todolistvalue);
        listvalue.value = "";
        showtodolist();
    }
};

const removetodolist = (e) => {
    const item = e.target;
    const text = item.textContent;
    todolistvalue = todolistvalue.filter((todo) => todo !== text);
    addtodolistLocalStorage(todolistvalue);
    showtodolist();
};

// Event Listeners
form.addEventListener("submit", addtodolist);
todolists.addEventListener("click", removetodolist);

// Initial load
showtodolist();
