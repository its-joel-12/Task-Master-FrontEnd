const searchTask = document.getElementById("searchTask");
const search_task_by_id_content = document.getElementById("search_task_by_id_content");

var taskId;
var taskTitle;
var taskDescription;
var taskStatus;
var dueDate;
var employeeId;

var httpCode;
var httpStatus;
var message;
var description;


// OPEN SEARCH_EMP_BY_ID MODAL
function openSearchTaskByIdContent() {
    search_task_by_id_content.innerHTML = `
    
    <p><strong>ID:</strong> ${taskId}</p>
    <p><strong>Title:</strong> ${taskTitle}</p>
    <p><strong>Description:</strong> ${taskDescription}</p>
    <p><strong>Status:</strong> ${taskStatus}</p>
    <p><strong>Due Date:</strong> ${dueDate}</p>
    <p><strong>Assigned to EmpID:</strong> ${employeeId}</p>
    <hr>
    <div class="text-end px-4">
    <button id="search_more" class="btn btn-primary">Search More</button>
    </div>    
    `;

    document.getElementById("search_more").addEventListener("click", function () {
        console.log('hello');
        document.getElementById("modal_title_task").innerText = "Search Task By ID";
        document.getElementById("searchTask").classList.remove("visually-hidden");
        document.getElementById("search_label_input_task").classList.remove("visually-hidden");
        search_task_by_id_content.innerHTML = "";
    });
}

function showTaskAlertToast() {
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

const getTaskById = async () => {
    const task_Id = document.getElementById("taskId");

    console.log('taskId: ' + task_Id.value);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task/${task_Id.value}`);

    const data = await response.json();

    console.log(data);
    console.log(response.status);

    if (response.status == 200) {
        taskId = data.taskId;
        taskTitle = data.taskTitle;
        taskDescription = data.taskDescription;
        taskStatus = data.taskStatus;
        dueDate = data.dueDate;
        employeeId = data.employeeId;

        openSearchTaskByIdContent();
        document.getElementById("searchTask").classList.add("visually-hidden");
        document.getElementById("search_label_input_task").classList.add("visually-hidden");
        document.getElementById("modal_title_task").innerText = "Here are the Task Details:-";



    }
    else {
        httpCode = data.httpCode;
        httpStatus = data.httpStatus;
        message = data.message;
        showTaskAlertToast();
    }



}

searchTask.addEventListener("click", async function () {
    search_task_by_id_content.innerHTML = "";
    await getTaskById();
});


