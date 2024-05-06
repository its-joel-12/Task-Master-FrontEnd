var page = 0;
var size = 10; //items per page
var totalPages = 0;

document.addEventListener('DOMContentLoaded', function () {
    getTasks(page);
})

const contentIterate = document.getElementById('dataIteration');
const nextPage = document.getElementById('nextPage');
const previousPage = document.getElementById('previousPage');
const submitUpdated = document.querySelector('.submitUpdated');



nextPage.addEventListener('click', function (e) {
    page++;
    if (page > 0) {
        previousPage.classList.remove('disabled')
    }
    if (page >= totalPages - 1) {
        nextPage.classList.add('disabled')
    }
    contentIterate.innerHTML = '';
    getEmployees(page);
})


previousPage.addEventListener('click', function (e) {
    if (page <= 1) {
        previousPage.classList.add('disabled');
        nextPage.classList.remove('disabled');
    }
    else {
        previousPage.classList.remove('disabled');
    }
    if (page > 0) {
        page--;
    }
    contentIterate.innerHTML = '';
    getEmployees(page);
})


// GET ALL TASKS FUNCTION
const getTasks = async (page) => {
    nextPage.classList.add('disabled');

    // Show loading spinner
    document.getElementById('loadingSpinner1').style.display = 'block';
    document.getElementById('loadingSpinner2').style.display = 'block';

    let response_full = await fetch('https://task-master-backend-x8cz.onrender.com/task-master/api/task?pageNumber=0&pageSize=999999999');
    nextPage.classList.remove('disabled')
    let data_full = await response_full.json();

    totalPages = Math.ceil(data_full.length / size);

    if (page + 1 == totalPages) {
        nextPage.classList.add('disabled');
    }

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task?pageNumber=${page}&pageSize=${size}`);
    let data = await response.json();
    // console.log(response);
    // console.log("HTTP_STATUS: " + response.status);

    // console.log(data);

    // Hide loading spinner after fetching data
    document.getElementById('loadingSpinner1').style.display = 'none';
    document.getElementById('loadingSpinner2').style.display = 'none';

    data.forEach(element => {

        contentIterate.innerHTML +=
            `
            <tr>
            <td >${element.taskId}</td>
            <td>${element.taskTitle}</td>
            <td>${element.taskDescription}</td>
            <td>${element.taskStatus}</td>
            <td>${element.dueDate}</td>
            <td>${element.employeeId}</td>
            <td>
            
            <button class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${element.taskId}">Update</button>
            
            <button class="btn btn-danger delete-btn" data-id="${element.taskId}">Delete</button>
            </td>
            </tr>
            `
        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', openUpdateForm);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });

    });
}


// OPEN TASK UPDATE FORM 
const openUpdateForm = async (event) => {
    console.log("openUpdateForm() called");
    const task_Id = event.target.dataset.id;
    console.log("ID: " + task_Id);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task/${task_Id}`);
    let data = await response.json();
    console.log(data.taskId);
    const { taskId, taskTitle, taskDescription, taskStatus, dueDate, employeeId} = data;


    modalFirstName.innerHTML = (`
        
        <!-- Task ID -->
        <fieldset disabled>
        <div class="mb-3" >
            <label for="task_id" class="form-label">Task ID</label>
            <input type="text" class="form-control" id="task_id" aria-describedby="emailHelp" value="${taskId}">
        </div>
        </fieldset>
        
        <!-- Task Title -->
        <div class="mb-3" >
            <label for="task_title" class="form-label">Edit Task Title</label>
            <input type="text" class="form-control" id="task_title" aria-describedby="emailHelp" value="${taskTitle}">
        </div>
        
        <!-- Task Description -->
        <div class="mb-3" >
            <label for="task_description" class="form-label">Edit Task Description</label>
            <input type="text" class="form-control" id="task_description" aria-describedby="emailHelp" value="${taskDescription}">
        </div>
        
        <!-- Task Status -->
        <div class="mb-3">
            <label for="task_status" class="form-label">Edit Task Status</label>
            <select class="form-select" id="task_status" aria-describedby="emailHelp">
                <option selected value="${taskStatus}">${taskStatus}</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <!-- Add more options as needed -->
            </select>
        </div>

        <!-- Task Due Date -->
        <div class="mb-3" >
            <label for="task_due_date" class="form-label">Edit Task Due Date (${dueDate})</label>
            <input type="date" class="form-control" id="task_due_date" aria-describedby="emailHelp" >
        </div>

        <!-- Employee ID-->
        <fieldset disabled>
        <div class="mb-3" >
            <label for="" class="form-label">Employee ID</label>
            <input type="text" class="form-control" id="" aria-describedby="emailHelp" value="${employeeId}">
        </div>
        </fieldset>

        `)
}

// UPDATE TASK FUNCTION
const updateTask = async () => {
    let employeeId = document.getElementById('employee_id').value;
    let EmployeeName = document.getElementById('emp_name').value;
    let employeeEmail = document.getElementById('email').value;
    let employeeDesignation = document.getElementById('designation').value;


    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task/${employeeId}`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            empName: EmployeeName,
            empEmail: employeeEmail,
            empDesignation: employeeDesignation
        })
    })    
}

// DELETE TASK FUNCTION
const deleteTask = async (event) => {
    const empId = event.target.dataset.id;
    console.log("ID: " + empId);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task/${empId}`, {
        method: "delete"
    })

    if (response.ok) {
        console.log("Task deleted successfully!");
        event.target.closest('tr').remove();
    }
    else {
        console.log("NOT DELETED");
        console.log(response.status);
    }

}

submitUpdated.addEventListener('click', async function () {
    await updateTask();
    window.location.href = '../Html/DisplayEmployees.html';
    console.log('clicked saved changes..')
});