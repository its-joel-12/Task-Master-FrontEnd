document.addEventListener('DOMContentLoaded', function () {
    getNavbar();
})

function getNavbar() {
    fetch('Navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        })
}