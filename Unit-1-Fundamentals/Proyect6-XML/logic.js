//---------------> INITIALIZE DATA <-------------------
const xmlString = `<root></root>`;
const parser = new DOMParser();
let xmlDoc = parser.parseFromString(xmlString, "text/xml");
let idCounter = 1;

//---------------> INTERFACE CONTROL (SPA Navigation)
function changeView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.style.display = 'none');
    document.getElementById(viewId).style.display = 'block';
    if (viewId === 'queries') generateQueryTable();
    if (viewId === 'updates') generateUpdateTable();
    if (viewId === 'deletions') generateDeletionTable();
}

//---------------> CRUD: CREATE (Add Records)
function addRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const favSong = document.getElementById('fav_song').value;
    const city = document.getElementById('city').value;
    const firstAlbum = document.getElementById('first_album').value;

    const newReview = xmlDoc.createElement("review");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = idCounter++;
    newReview.appendChild(idNode);

    const nameNode = xmlDoc.createElement("name");
    nameNode.textContent = name;
    newReview.appendChild(nameNode);

    const emailNode = xmlDoc.createElement("email");
    emailNode.textContent = email;
    newReview.appendChild(emailNode);

    const songNode = xmlDoc.createElement("fav_song");
    songNode.textContent = favSong;
    newReview.appendChild(songNode);

    const cityNode = xmlDoc.createElement("city");
    cityNode.textContent = city;
    newReview.appendChild(cityNode);

    const albumNode = xmlDoc.createElement("first_album");
    albumNode.textContent = firstAlbum;
    newReview.appendChild(albumNode);

    xmlDoc.documentElement.appendChild(newReview);

    document.getElementById('formCreate').reset();
    alert("Review successfully saved to XML!");
}

//---------------> CRUD: READ (Queries)
function generateQueryTable() {
    const tbody = document.querySelector('#queryTable tbody');
    tbody.innerHTML = ''; // Clear table

    const reviews = xmlDoc.getElementsByTagName("review");

    for (let i = 0; i < reviews.length; i++) {
        const rev = reviews[i];
        const id = rev.getElementsByTagName("id")[0].textContent;
        const name = rev.getElementsByTagName("name")[0].textContent;
        const email = rev.getElementsByTagName("email")[0].textContent;
        const song = rev.getElementsByTagName("fav_song")[0].textContent;
        const city = rev.getElementsByTagName("city")[0].textContent;
        const album = rev.getElementsByTagName("first_album")[0].textContent;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${song}</td>
            <td>${city}</td>
            <td>${album}</td>
        `;
        tbody.appendChild(tr);
    }
}

//---------------> CRUD: UPDATE (Modify Records)
function generateUpdateTable() {
    const tbody = document.querySelector('#updateTable tbody');
    tbody.innerHTML = '';
    document.getElementById('editContainer').style.display = 'none';

    const reviews = xmlDoc.getElementsByTagName("review");

    for (let i = 0; i < reviews.length; i++) {
        const id = reviews[i].getElementsByTagName("id")[0].textContent;
        const name = reviews[i].getElementsByTagName("name")[0].textContent;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td><button onclick="prepareEdit(${id})">Edit</button></td>
        `;
        tbody.appendChild(tr);
    }
}

function prepareEdit(targetId) {
    const reviews = xmlDoc.getElementsByTagName("review");
    let targetReview = null;

    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].getElementsByTagName("id")[0].textContent == targetId) {
            targetReview = reviews[i];
            break;
        }
    }

    if (targetReview) {
        document.getElementById('edit_id').value = targetId;
        document.getElementById('edit_name').value = targetReview.getElementsByTagName("name")[0].textContent;
        document.getElementById('edit_email').value = targetReview.getElementsByTagName("email")[0].textContent;
        document.getElementById('edit_fav_song').value = targetReview.getElementsByTagName("fav_song")[0].textContent;
        document.getElementById('edit_city').value = targetReview.getElementsByTagName("city")[0].textContent;
        document.getElementById('edit_first_album').value = targetReview.getElementsByTagName("first_album")[0].textContent;

        document.getElementById('editContainer').style.display = 'block';
    }
}

function saveEdit() {
    const targetId = document.getElementById('edit_id').value;
    const reviews = xmlDoc.getElementsByTagName("review");

    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].getElementsByTagName("id")[0].textContent == targetId) {
            reviews[i].getElementsByTagName("name")[0].textContent = document.getElementById('edit_name').value;
            reviews[i].getElementsByTagName("email")[0].textContent = document.getElementById('edit_email').value;
            reviews[i].getElementsByTagName("fav_song")[0].textContent = document.getElementById('edit_fav_song').value;
            reviews[i].getElementsByTagName("city")[0].textContent = document.getElementById('edit_city').value;
            reviews[i].getElementsByTagName("first_album")[0].textContent = document.getElementById('edit_first_album').value;
            break;
        }
    }

    alert("Record updated in XML!");
    generateUpdateTable();
}

function cancelEdit() {
    document.getElementById('editContainer').style.display = 'none';
}

//---------------> CRUD: DELETE (Remove XML Node)
function generateDeletionTable() {
    const tbody = document.querySelector('#deletionTable tbody');
    tbody.innerHTML = '';

    const reviews = xmlDoc.getElementsByTagName("review");

    for (let i = 0; i < reviews.length; i++) {
        const id = reviews[i].getElementsByTagName("id")[0].textContent;
        const name = reviews[i].getElementsByTagName("name")[0].textContent;
        const song = reviews[i].getElementsByTagName("fav_song")[0].textContent;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${song}</td>
            <td><button style="background: #e74c3c;" onclick="deleteRecord(${id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    }
}

function deleteRecord(targetId) {
    if (confirm("Are you sure you want to delete this record?")) {
        const reviews = xmlDoc.getElementsByTagName("review");

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].getElementsByTagName("id")[0].textContent == targetId) {
                xmlDoc.documentElement.removeChild(reviews[i]);
                break;
            }
        }
        generateDeletionTable();
    }
}