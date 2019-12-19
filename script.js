/*
    Copyright (C) 2019 OM SANTOSHKUMAR MASNE. All Rights Reserved.
    Licensed under the GNU Affero General Public License v3.0 only (AGPL-3.0-only) license.
    See License.txt in the project root for license information.
*/

var item_count = 0;
var unchecked_count = 0;
var global_item_count = 0;

const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


function newTodo() {
    // Ask for todo's text.
    input = prompt('Enter new task!');

    // Check the input.
    if(input == null)
    {
        return false;
    }
    if(input == "")
    {
        alert('Please enter some task todo!');
        return false;
    }

    // Checkbox for the todo container.
    const check_box = document.createElement('input');
    check_box.setAttribute("type", "checkbox");
    check_box.setAttribute("class", classNames.TODO_CHECKBOX);
    check_box.checked = false;

    // Check for changes in the checked state for the checkbox.
    check_box.addEventListener('click', (event) => {
        if(event.target.checked)
        {
            unchecked_count -= 1;
            uncheckedCountSpan.innerText = unchecked_count;
        }
        else
        {
            unchecked_count += 1;
            uncheckedCountSpan.innerText = unchecked_count;
        }
    });

    // Todo text to be displayed in the todo container.
    const todo_text = document.createElement('span');
    todo_text.innerHTML = input;
    todo_text.setAttribute("class", classNames.TODO_TEXT);

    // The delete button.
    const delete_btn = document.createElement('button');
    delete_btn.innerText = 'Delete this todo!';
    delete_btn.setAttribute("class", classNames.TODO_DELETE);
    delete_btn.setAttribute("data-btn_id", global_item_count);

    // Event listener for delete button clicks.
    delete_btn.addEventListener('click', e => {
        pressed_btn = e.target;
        btn_id = pressed_btn.dataset.btn_id;

        // Get the todo container.
        const containers = document.getElementsByClassName('todo-container')
        var container_to_delete_index;
        for(i=0; i < containers.length; i++)
        {
            if(containers[i].dataset.todo_id == btn_id)
            {
                // Apply animation and then remove the todo container.
                containers[i].classList.add("fade-out-animation");

                // Store the index of todo container to remove.
                container_to_delete_index = i;
            }
        }
        
        // Decreasing the item count.
        item_count -= 1;
        itemCountSpan.innerText = item_count;

        // Finding the checkbox of the todo container.
        for(i = 0; i < pressed_btn.parentElement.children.length; i++)
        {
            element_name = pressed_btn.parentElement.children[i].nodeName;
            if((element_name.toUpperCase()) == 'INPUT')
            {
                checkbox = pressed_btn.parentElement.children[i];
            }
        }

        // Decreasing the unchecked count if the pressed button is not checked.
        if(!check_box.checked)
        {
            unchecked_count -= 1;
            uncheckedCountSpan.innerText = unchecked_count;
        }

        // Wait for the animation to complete.
        setTimeout(() => {
            // Remove the todo container from the list.
            list.removeChild(containers[container_to_delete_index]);
        }, 1000);
    });

    // The todo container.
    const li = document.createElement('li');
    li.setAttribute("class", classNames.TODO_ITEM);
    li.setAttribute("data-todo_id", global_item_count);
    li.append(check_box);
    li.append(todo_text);
    li.append(delete_btn);

    // Append the container to the todo list.
    list.append(li);

    // Increasing the item count.
    item_count += 1;
    itemCountSpan.innerText = item_count;

    // Increasing the unchecked count.
    unchecked_count += 1;
    uncheckedCountSpan.innerText = unchecked_count;

    // Increasing the global_item_count.
    global_item_count++;
}
