var btn = document.getElementById("btn");
var input = document.getElementById("text")
var parent = document.getElementById("parent");

let id = 1;

var todos = readTodosFromStorage();

todos.forEach(function (todo) {
    displayTodoOnUI(todo.text)
})



input.addEventListener("keyup", function (event) {
    var value = event.target.value.trim();
    if (event.key === "Enter" && value !== "") {
        createTodo(value);
        event.target.value = "";
    }
});

btn.addEventListener("click", function () {
    var value = input.value.trim();
    if (value !== "") {
        createTodo(value);
        input.value = "";
    }
});



function createTodo(value) {

    var todo = {
        text: value ,
        id: id++
    }
    displayTodoOnUI(value);
    storeDataInStorage(todo);
}

function displayTodoOnUI(value) {
    var p = document.createElement("h4");
    p.innerText = value
    parent.appendChild(p);
}



function storeDataInStorage(value) {
    var oldData = localStorage.getItem("todo");
    if (oldData) {
        oldData = JSON.parse(oldData);
        oldData.push(value);
    }
    else {
        oldData = [value]
    }
    localStorage.setItem("todo", JSON.stringify(oldData))
}


function readTodosFromStorage() {
    var todosString = localStorage.getItem("todo");
    if (!todosString) {
        return [];
    }
    return JSON.parse(todosString)

}