document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskTextSpan.classList.add('task-text');
        
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('task-actions');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(actionDiv);
        taskList.appendChild(taskItem);

        taskItem.addEventListener('click', toggleTask);
        editBtn.addEventListener('click', editTask);
        deleteBtn.addEventListener('click', deleteTask);
    }

    function toggleTask(e) {
        if (e.target.classList.contains('task-text')) {
            e.target.parentElement.classList.toggle('completed');
        }
    }

    function editTask(e) {
        e.stopPropagation();
        const taskItem = e.target.closest('.task-item');
        const taskTextSpan = taskItem.querySelector('.task-text');
        const currentText = taskTextSpan.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('edit-input');

        taskTextSpan.replaceWith(input);
        input.focus();

        input.addEventListener('blur', function() {
            const newText = this.value.trim();
            if (newText) {
                const newSpan = document.createElement('span');
                newSpan.textContent = newText;
                newSpan.classList.add('task-text');
                this.replaceWith(newSpan);
            } else {
                this.replaceWith(taskTextSpan);
            }
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    }

    function deleteTask(e) {
        e.stopPropagation();
        const taskItem = e.target.closest('.task-item');
        taskList.removeChild(taskItem);
    }
});
