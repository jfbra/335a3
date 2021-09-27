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
    products.forEach(showProduct);

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
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => getVcard(data));
}

const getVcard = (data) => {
    let staffList = [];
    const vcard = (staff) => {
        const fetchPromise = fetch(`http://localhost:5000/api/GetCard/${staff.id}`);
        const streamPromise = fetchPromise.then((response) => response.text());
        streamPromise.then((data) => parseVcard(data));
    }
    data.forEach(vcard);
}

const parseVcard = (vcard) => {
    let fields = vcard.split(/\r?\n/);
    var person = {};
    person["id"] = fields[4].split(":")[1];
    person["name"] = fields[3].split(":")[1];
    person["email"] = fields[6].split(":")[1];
    person["tel"] = fields[7].split(":")[1];
    person["url"] = fields[8].split(/:(.+)/)[1];
    person["areas"] = fields[9].split(":")[1];
    showStaffTable(person);
}

const showStaffTable = (staff) => {
    const staffTable = document.getElementById("staffTable");
    var row = staffTable.insertRow(-1);
    var cellImage = row.insertCell(-1);
    var cellName = row.insertCell(-1);
    var cellDetails = row.insertCell(-1);
    var cellAreas = row.insertCell(-1);
    cellImage.innerHTML = `<img src="http://localhost:5000/api/GetStaffPhoto/${staff.id}" alt="${staff.name} image" height="100"></img>`;
    cellName.innerHTML = `<a href="http://localhost:5000/api/GetCard/${staff.id}">${staff.name}</a>`;
    cellDetails.innerHTML = `Email: <a href="mailto: ${staff.email}">${staff.email}</a><br>Phone: <a href="tel: ${staff.tel}">${staff.tel}</a><br>URL: <a href="${staff.url}">${staff.url}</a>`;
    cellAreas.innerHTML = staff.areas;
}

const submitComment = () => {
    let message = document.getElementById('commentMessage').value;
    let username = document.getElementById('commentName').value;

    fetch('http://localhost:5000/api/WriteComment', {
        method: "POST",
        body: JSON.stringify({
            comment: `${message}`,
            name: `${username}`
        }),
        headers: {
            "Content-type": "application.json"
        }
    })
    window.onload = showGuestBook();
}

window.onload = showHome();
getVersion();


