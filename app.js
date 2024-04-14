document.addEventListener('DOMContentLoaded', function () {
    getNavbar();
})

function getNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        })
}