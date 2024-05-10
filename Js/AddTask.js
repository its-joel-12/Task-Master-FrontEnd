const addTask = document.getElementById("addTask");
const liveToast = document.getElementById("liveToast");
const modalFirstName2 = document.getElementById("modalFirstName2");
const submitTask = document.getElementById("submitTask");

var httpCode;
var httpStatus;
var message;
var description;
var tasktitleToast;

var isTaskSaved = false;

var errorToast = new bootstrap.Toast(liveToast);
var modal = new bootstrap.Modal(document.getElementById('exampleModal2'));

// Function to show the alert toast
function showAlertToast() {
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

// Function to show the Success toast
function showSuccessToast() {
  liveToast.innerHTML = `
  <div class="toast-header text-bg-success">
          <img style="width: 30px; height: auto;" src="/Images/TM_Logo_png.png" class="rounded me-2" alt="">
          <strong class="me-auto">Task Created</strong>
          
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          <p><strong class="me-auto">${tasktitleToast} </strong> Task Created👍</p>
        </div>
  `;
  errorToast.show();
}

// OPEN ADD NEW FORM
function openAddForm() {
  modalFirstName2.innerHTML = `
        
        <!-- Task Title -->
        <div class="mb-3" >
            <label for="task_title" class="form-label">Enter Task Title</label>
            <input type="text" class="form-control" id="task_title" aria-describedby="emailHelp" required>
        </div>

        <!-- Task Decsription -->
        <div class="mb-3">
            <label for="task_desc" class="form-label">Enter Task Decsription</label>
            <textarea class="form-control" id="task_desc" rows="3"></textarea>            
        </div>

        <!-- Task Status -->
        <div class="mb-3">
            <label for="task_status" class="form-label">Enter Task Status</label>
            <select class="form-select" id="task_status" aria-describedby="emailHelp">
                <option selected value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <!-- Add more options as needed -->
            </select>
        </div>

        <!-- Task Due Date -->
        <div class="mb-3" >
            <label for="task_due_date" class="form-label">Enter Task Due Date</label>
            <input type="date" class="form-control" id="task_due_date" aria-describedby="emailHelp" >
        </div>

        <!-- Employee ID-->
        <div class="mb-3" >
            <label for="emp_id" class="form-label">Employee ID</label>
            <input type="number" class="form-control" id="emp_id" aria-describedby="emailHelp" value="">
        </div>        
        `;
}

// Date convertion function
function parseDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const isoDateString = `${day}-${month}-${year}`;
  return isoDateString;
}

// save task function
const saveTask = async () => {
  let taskTitle = document.getElementById("task_title").value;
  let taskDesc = document.getElementById("task_desc").value;
  let taskStatus = document.getElementById("task_status").value;
  let taskDueDate = document.getElementById("task_due_date").value;
  let empId = document.getElementById("emp_id").value;

  let response = await fetch(
    `https://task-master-backend-x8cz.onrender.com/task-master/api/task/${empId}`,
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle: taskTitle,
        taskDescription: taskDesc,
        taskStatus: taskStatus,
        dueDate: parseDate(taskDueDate),
      }),
    }
  );

  let data = await response.json();

  if (response.status == 201) {
    isTaskSaved = true;
    tasktitleToast = data.taskTitle;
  } else {
    isTaskSaved = false;

    httpCode = data.httpCode;
    httpStatus = data.httpStatus;
    message = data.message;
  }
};

addTask.addEventListener("click", openAddForm);

submitTask.addEventListener("click", async function () {
  await saveTask();
  if (!isTaskSaved) {
    showAlertToast();
  } else {
    showSuccessToast();    
    modal.hide();
  }
});
