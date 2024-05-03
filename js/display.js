var page = 0;
var size = 8; //items per page
var totalPages = 0;

document.addEventListener('DOMContentLoaded', function () {
    getEmployees(page);
})

const contentIterate = document.getElementById('dataIteration');
const nextPage = document.getElementById('nextPage');
const previousPage = document.getElementById('previousPage');



nextPage.addEventListener('click', function (e) {

    page++;
    console.log(page);
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

    // console.log(page);

    if (page <= 1) {
        previousPage.classList.add('disabled');
    }
    else {
        previousPage.classList.remove('disabled');
        nextPage.classList.remove('disabled');

    }
    if (page > 0) {
        page--;
    }
    // console.log(page);
    contentIterate.innerHTML = '';
    getEmployees(page);
})

const getEmployees = async (page) => {
    let response_full = await fetch('https://task-master-backend-x8cz.onrender.com/task-master/api/employee?pageNumber=0&pageSize=999999999');
    let data_full = await response_full.json();

    console.log("Total no. of rows: " + data_full.length);
    totalPages = Math.ceil(data_full.length / size);
    console.log("totalPages: " + totalPages);

    // console.log(page+1, totalPages)
    if (page + 1 == totalPages) {
        nextPage.classList.add('disabled')
    }

    let response = await fetch(`https://task-master-backend-x8cz.onrender.com/task-master/api/employee?pageNumber=${page}&pageSize=${size}`);
    let data = await response.json();
    // console.log(response);

    // console.log("HTTP_STATUS: " + response.status);

    console.log(data);
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


        // document.querySelectorAll('.delete-btn').forEach(button => {
        //     button.addEventListener('click', deleteLead);
        // });

        // document.querySelectorAll('.update-btn').forEach(button => {
        //     button.addEventListener('click', openUpdateForm);
        // });

    });
}