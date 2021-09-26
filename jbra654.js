const showHome = () => {
    document.getElementById("home").style.display = "block";
    document.getElementById("staff").style.display = "none";
    document.getElementById("instituteShop").style.display = "none";
    document.getElementById("userRegistration").style.display = "none";
    document.getElementById("guestBook").style.display = "none";
    document.title = "Welcome to SHIT!";
}

const showStaff = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "block";
    document.getElementById("instituteShop").style.display = "none";
    document.getElementById("userRegistration").style.display = "none";
    document.getElementById("guestBook").style.display = "none";
    document.title = "Staff";
}

const showInstituteShop = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("instituteShop").style.display = "block";
    document.getElementById("userRegistration").style.display = "none";
    document.getElementById("guestBook").style.display = "none";
    document.title = "Institute Shop";
}

const showUserRegistration = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("instituteShop").style.display = "none";
    document.getElementById("userRegistration").style.display = "block";
    document.getElementById("guestBook").style.display = "none";
    document.title = "User Registration";
}

const showGuestBook = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("instituteShop").style.display = "none";
    document.getElementById("userRegistration").style.display = "none";
    document.getElementById("guestBook").style.display = "block";
    document.title = "Guest Book";
}

window.onload = showHome;

const getVersion = () => {
    const fetchPromise = fetch('http://localhost:5000/api/GetVersion');
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data) => { document.getElementById('version').innerText = data; });
}

getVersion();


