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
    getStaff();
}

const showInstituteShop = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("staff").style.display = "none";
    document.getElementById("instituteShop").style.display = "block";
    document.getElementById("userRegistration").style.display = "none";
    document.getElementById("guestBook").style.display = "none";
    document.title = "Institute Shop";
    getProducts();
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
    getComments();
}

const getVersion = () => {
    const fetchPromise = fetch('http://localhost:5000/api/GetVersion');
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data) => { document.getElementById('version').innerText = data; });
}

const getProducts = () => {
    const fetchPromise = fetch('http://localhost:5000/api/GetItems');
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showDetails(data));
}

const showDetails = (products) => {
    let htmlString = "<tr class='title'><td>ID</td><td>Image</td><td>Name</td><td>Description</td><td>Price</td></tr>";

    const showProduct = (item) => {
        htmlString += `<tr><td>${item.id}</td><td><img src="http://localhost:5000/api/GetItemPhoto/${item.id}" alt="${item.name} image" height="100"></td><td>${item.name}</td><td>${item.description}</td><td>$${item.price}</td></tr>`
    }
    products.forEach(showProduct)

    const productsTable = document.getElementById("productsTable");
    productsTable.innerHTML = htmlString;
}

const productSearch = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("productsTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const getStaff = () => {
    const fetchPromise = fetch('http://localhost:5000/api/GetAllStaff');
    const streamPromise = fetchPromise.then((response) => response.text());
    streamPromise.then((data) => alert(data));
}

window.onload = showHome;
getVersion();


