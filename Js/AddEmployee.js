const addEmp = document.getElementById("addEmp");
const modalFirstName = document.getElementById("modalFirstName");
const submit = document.getElementById("submit");

var httpCode;
var httpStatus;
var message;
var description;
var empNameToast;

var isEmployeeSaved = false;

var errorToast = new bootstrap.Toast(liveToast);
var modal1 = new bootstrap.Modal(document.getElementById('exampleModal'));

// Function to show the alert toast
function showEmployeeAlertToast() {
  liveToast.innerHTML = `
  <div class="toast-header text-bg-danger">
    <img style="width: 30px; height: auto;" src="/Images/TM_Logo_BlueT.png" class="rounded me-2" alt="">
    <strong class="me-auto">ALERT! ${httpCode} ${httpStatus}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    <p>${message}</p>
  </div>
  `;
  errorToast.show();
}

// Function to show the Success toast
function showEmployeeSuccessToast() {
  liveToast.innerHTML = `
  <div class="toast-header text-bg-success">
    <img style="width: 30px; height: auto;" src="/Images/TM_Logo_png.png" class="rounded me-2" alt="">
    <strong class="me-auto">Employee Added</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    <p>Added <strong class="me-auto">${empNameToast} </strong>Succesfully👍</p>
  </div>
  `;
  errorToast.show();
}

// OPEN ADD NEW FORM FUnction
function openAddForm() {
  modalFirstName.innerHTML = `
        
        <!-- Employee name -->
        <div class="mb-3" >
            <label for="emp_name" class="form-label">Enter Name</label>
            <input type="text" class="form-control" id="emp_name" aria-describedby="emailHelp" required>
        </div>

        <!-- email -->
        <div class="mb-3">
            <label for="email" class="form-label">Enter Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required/>            
        </div>

        <!-- Designation -->
        <div class="mb-3">
            <label for="designation" class="form-label">Enter Designation</label>
            <input type="text" class="form-control" id="designation" aria-describedby="emailHelp" required>
        </div>
        
        `;
}

// Save Employee function
const saveEmployee = async () => {
  let employeeName = document.getElementById("emp_name").value;
  let employeeEmail = document.getElementById("email").value;
  let employeeDesignation = document.getElementById("designation").value;

  let response = await fetch(
    "https://task-master-backend-x8cz.onrender.com/task-master/api/employee",
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empName: employeeName,
        empEmail: employeeEmail,
        empDesignation: employeeDesignation,
      }),
    }
  );

  let data = await response.json();

  if (response.status == 201) {
    isEmployeeSaved = true;
    empNameToast = data.empName;
  } else {
    isEmployeeSaved = false;
    
    httpCode = data.httpCode;
    httpStatus = data.httpStatus;
    message = data.message;
  }
};

addEmp.addEventListener("click", openAddForm);

submit.addEventListener("click", async function () {
  await saveEmployee();

  if (!isEmployeeSaved) {
    showEmployeeAlertToast();
  } else {
    showEmployeeSuccessToast();
    modal1.hide();
  }
});


