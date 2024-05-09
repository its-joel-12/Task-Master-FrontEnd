const searchEmp_by_task_id = document.getElementById("searchEmp_by_task_id");
const search_emp_by_task_id_content = document.getElementById("search_emp_by_task_id_content");

var employeeId;
var employeeName;
var employeeEmail;
var employeeDesignation;

var httpCode;
var httpStatus;
var message;
var description;


// OPEN SEARCH_EMP_BY_ID MODAL
function openSearchEmployeeByIdContent() {
    search_emp_by_task_id_content.innerHTML = `
    
    <p><strong>Employee ID:</strong> ${employeeId}</p>
    <p><strong>Name:</strong> ${employeeName}</p>
    <p><strong>Email:</strong> ${employeeEmail}</p>
    <p><strong>Designation:</strong> ${employeeDesignation}</p>
    <hr>
    <div class="text-end px-4">
    <button id="search_more" class="btn btn-primary">Search More</button>
    </div>    
    `;

    document.getElementById("search_more").addEventListener("click", function () {
        document.getElementById("modal_title_emp_task_id").innerText = "Search Employee By Task ID";
        document.getElementById("searchEmp_by_task_id").classList.remove("visually-hidden");
        document.getElementById("search_label_input_emp_task_id").classList.remove("visually-hidden");
        search_emp_by_task_id_content.innerHTML = "";
    });
}

function showEmployeeAlertToast() {
    // Update the toast message
    liveToast.innerHTML = `
    <div class="toast-header text-bg-danger">
            <img style="width: 30px; height: auto;" src="/Images/TM_Logo_BlueT.png" class="rounded me-2" alt="">
            <strong class="me-auto">ALERT! ${httpCode} ${httpStatus}</strong>
            <!-- <small>11 mins ago</small> -->
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            <p>${message}</p>
          </div>
    `;
    errorToast.show();
}

const getEmployeeByTaskId = async () => {
    const emp_by_task_id = document.getElementById("emp-by-task-id-input");

    console.log('getEmployeeByTaskId called');
    console.log('emp-by-task-id-input: ' + emp_by_task_id.value);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/employee-task-id/${emp_by_task_id.value}`);

    const data = await response.json();

    console.log(data);
    console.log(response.status);

    if (response.status == 200) {
        employeeId = data.empId;
        employeeName = data.empName;
        employeeEmail = data.empEmail;
        employeeDesignation = data.empDesignation;

        openSearchEmployeeByIdContent();
        document.getElementById("searchEmp_by_task_id").classList.add("visually-hidden");
        document.getElementById("search_label_input_emp_task_id").classList.add("visually-hidden");
        document.getElementById("modal_title_emp_task_id").innerText = "Here are the Employee Details:-";



    }
    else {
        httpCode = data.httpCode;
        httpStatus = data.httpStatus;
        message = data.message;
        showEmployeeAlertToast();
    }



}

searchEmp_by_task_id.addEventListener("click", async function () {
    // console.log('object');
    search_emp_by_task_id_content.innerHTML = "";
    await getEmployeeByTaskId();
});


