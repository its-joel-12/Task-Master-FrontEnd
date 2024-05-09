const searchTask_by_emp_id = document.getElementById("searchTask_by_emp_id");
const search_task_by_emp_id_content = document.getElementById("search_task_by_emp_id_content");

const getTaskByEmpId = async () => {
    const emp_Id = document.getElementById("input");

    console.log('emp_Id: ' + emp_Id.value);

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/task-emp-id/${emp_Id.value}`);

    const data = await response.json();

    console.log(data);
    console.log(response.status);

    if (response.status == 200) {
        // taskId = data.taskId;
        // taskTitle = data.taskTitle;
        // taskDescription = data.taskDescription;
        // taskStatus = data.taskStatus;
        // dueDate = data.dueDate;
        // employeeId = data.employeeId;

        search_task_by_emp_id_content.innerHTML = `

        <!-- Table -->
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody id="dataIteration">

            </tbody>
        </table>

        <hr>
        <div class="text-end px-4">
    <button id="search_more" class="btn btn-primary">Search More</button>
    </div>
        `;

        data.forEach((element) => {
            document.getElementById('dataIteration').innerHTML += `
                    <tr>
                    <td >${element.taskId}</td>
                    <td>${element.taskTitle}</td>
                    <td>${element.taskDescription}</td>
                    <td>${element.taskStatus}</td>
                    <td>${element.dueDate}</td>
                    </tr>
                    `;
        });


        document.getElementById("searchTask_by_emp_id").classList.add("visually-hidden");
        document.getElementById("search_label_input_task_by_emp_id").classList.add("visually-hidden");
        document.getElementById("modal_title_task_by_emp_id").innerText = `Here are the Tasks for EmpID: ${emp_Id.value}`;

        document.getElementById("search_more").addEventListener("click", function () {
            document.getElementById("modal_title_task_by_emp_id").innerText = "Search Task By Employee ID";
            document.getElementById("searchTask_by_emp_id").classList.remove("visually-hidden");
            document.getElementById("search_label_input_task_by_emp_id").classList.remove("visually-hidden");
            search_task_by_emp_id_content.innerHTML = "";
        });
    }
    else {
        httpCode = data.httpCode;
        httpStatus = data.httpStatus;
        message = data.message;
        showTaskAlertToast();
    }
}

searchTask_by_emp_id.addEventListener("click", async function () {
    search_task_by_emp_id_content.innerHTML = "";
    await getTaskByEmpId();
});