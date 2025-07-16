document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const clear = document.getElementById('clear');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    newTaskInput.addEventListener('keypress', function(event)  {
        if (event.key === 'Enter') {
            const taskName = newTaskInput.value.trim();
            if (taskName !== '') {
                tasks.push({ name: taskName, completed: false });
                updateLocalStorage();
                createTaskElement();
                newTaskInput.value = '';
            }  
        }
    });
    
    function createTaskElement() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span id = "left" class="${task.completed ? 'completed' : ''}">${task.name}</span><div class = "right"><input type="checkbox" ${task.completed ? 'checked' : ''} /><span class="icon edit-icon">&#9998;</span><span class="icon delete-icon">&#10006;</span></div>`;
            const checkbox = li.querySelector('input');
            const deleteIcon = li.querySelector('.delete-icon');
            const editIcon = li.querySelector('.edit-icon');
            
            checkbox.addEventListener('change', function() {
                tasks[index].completed = checkbox.checked;
                updateLocalStorage();
                createTaskElement();
            });
            
            deleteIcon.addEventListener('click', function() {
                tasks.splice(index, 1);
                updateLocalStorage();
                createTaskElement();
            });

            editIcon.addEventListener('click', function() {
                const newName = prompt('Enter the new task name:', task.name);
                if (newName) {
                    tasks[index].name = newName;
                    updateLocalStorage();
                    createTaskElement();
                }
            });
            taskList.appendChild(li);

        });
    }
    clear.addEventListener('click',function(){
        localStorage.clear();
        tasks=[];
        taskList.innerHTML="";
    });
    createTaskElement();
});