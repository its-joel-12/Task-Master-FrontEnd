var page = 0;
var size = 5; //items per page
var totalPages = 0;

document.addEventListener('DOMContentLoaded', function () {
    getEmployees(page);
})

const contentIterate = document.getElementById('dataIteration');
const nextPage = document.getElementById('nextPage');
const previousPage = document.getElementById('previousPage');



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


// GET ALL EMPLOYEES FUNCTION
const getEmployees = async (page) => {
    nextPage.classList.add('disabled')
    let response_full = await fetch('https://task-master-backend-x8cz.onrender.com/task-master/api/employee?pageNumber=0&pageSize=999999999');
    nextPage.classList.remove('disabled')
    let data_full = await response_full.json();

    totalPages = Math.ceil(data_full.length / size);

    if (page + 1 == totalPages) {
        nextPage.classList.add('disabled')
    }

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/employee?pageNumber=${page}&pageSize=${size}`);
    let data = await response.json();
    // console.log(response);
    // console.log("HTTP_STATUS: " + response.status);

    // console.log(data);
    data.forEach(element => {

        contentIterate.innerHTML +=
            `
            <tr>
            <td >${element.empId}</td>
            <td>${element.empName}</td>
            <td>${element.empEmail}</td>
            <td>${element.empDesignation}</td>
            <!-- <td>${element.mobile}</td> --->
            <td>
            
            <button class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${element.empId}">Update</button>
            
            <button class="btn btn-danger delete-btn" data-id="${element.empId}">Delete</button>
            </td>
            </tr>
            `

        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', openUpdateForm);
        });

        // document.querySelectorAll('.delete-btn').forEach(button => {
        //     button.addEventListener('click', deleteLead);
        // });


    });
}

// OPEN UPDATE FORM 
const openUpdateForm = async (event) => {
    console.log("openUpdateForm() called");
    const employeeId = event.target.dataset.id;
    console.log("ID: " + employeeId);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/employee/${employeeId}`);
    let data = await response.json();
    console.log(data.empId);
    const { empId, empName, empEmail, empDesignation} = data;
    modalFirstName.innerHTML = (`
        
        <!-- Employee ID -->
        <fieldset disabled>
        <div class="mb-3" >
            <label for="employee_id" class="form-label">Employee ID</label>
            <input type="text" class="form-control" id="employee_id" aria-describedby="emailHelp" value="${empId}">
        </div>
        </fieldset>
        
        <!-- Employee name -->
        <div class="mb-3" >
            <label for="emp_name" class="form-label">Edit Name</label>
            <input type="text" class="form-control" id="emp_name" aria-describedby="emailHelp" value="${empName}">
        </div>


        <!-- email -->
        <div class="mb-3">
            <label for="email" class="form-label">Edit Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value="${empEmail}">
            
        </div>

        <!-- mobile no -->
        <div class="mb-3">
            <label for="designation" class="form-label">Edit Designation</label>
            <input type="text" class="form-control" id="designation" aria-describedby="emailHelp" value="${empDesignation}">
        </div>
        `)


    // updateLead.forEach(button => {
    //     button.addEventListener('click', function () {
    //         console.log("gu ha");
    //     });
    // })
}