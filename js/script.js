const allBook = [];
const form = document.forms[0];
const tBody = document.querySelector('.table-section tbody')
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const allInput = form.querySelectorAll(`input[type="text"]`);
    const obj = {};

    allInput.forEach(input => {
        obj[input.name] = input.value;
    });
    
    allBook.push(obj);
    renderTable(obj);
}

function renderTable(object) {
    const tr = document.createElement('tr');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    updateButton.innerText = "Update";
    deleteButton.innerText = "Delete"

    tr.appendChild(updateButton);
    tr.appendChild(deleteButton);

    for (const data in object) {
        const td = document.createElement('td');
        td.innerText = object[data];
        tr.appendChild(td);
    }

    tBody.append(tr);
}