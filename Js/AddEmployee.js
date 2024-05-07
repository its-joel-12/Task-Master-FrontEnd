const addEmp = document.getElementById("addEmp");
const modalFirstName = document.getElementById("modalFirstName");
const submit = document.getElementById("submit");

// OPEN ADD NEW FORM
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

const saveEmployee = async () => {
  let employeeName = document.getElementById("emp_name").value;
  let employeeEmail = document.getElementById("email").value;
  let employeeDesignation = document.getElementById("designation").value;

  console.log("saveEmployee called!");

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
};

addEmp.addEventListener("click", openAddForm);

submit.addEventListener("click", async function () {
    await saveEmployee();
    // Redirect to the display page after saving the employee
    window.location.href = '../Html/DisplayEmployees.html';
  });
  

