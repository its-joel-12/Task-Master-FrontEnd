const addTask = document.getElementById("addTask");
const modalFirstName2 = document.getElementById("modalFirstName2");
const submitTask = document.getElementById("submitTask");

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
  // Split the date string into day, month, and year components
  const [year, month, day] = dateString.split("-");

  // Construct a new string in 'yyyy-mm-dd' format
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

  // console.log('date: ' + taskDueDate);

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
};

addTask.addEventListener("click", openAddForm);

submitTask.addEventListener("click", async function () {
  await saveTask();
  // Redirect to the display page after saving the employee
  window.location.href = '../Html/DisplayTasks.html';
});
