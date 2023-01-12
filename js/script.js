let allBook = [];
const form = document.forms[0];
const tBody = document.querySelector('.table-section tbody');
const modal = document.querySelector('.modal');

form.addEventListener('submit', onSubmit);

function toggleModal() {
    modal.classList.toggle('display-none');
}

function onSubmit(event) {
    event.preventDefault();

    const allInput = form.querySelectorAll(`input[type="text"]`);
    const obj = {};

    allInput.forEach(input => {
        obj[input.name] = input.value;
    });

    const hiddenField = form.querySelector('input[type="hidden"]');
    const hiddenValue = parseInt(hiddenField.value);

    if (hiddenValue === -1) {
        allBook.push(obj);
        renderTable(obj);
    } else {
        const oldBookId = allBook[hiddenValue].bookId;
        hiddenField.value = -1;

        allBook[hiddenValue] = obj;
        updateTable(oldBookId, obj);
    }
    
    form.reset();
    form.querySelector('input[type="hidden"]').value = -1;
}

function renderTable(object) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-bookid', object.bookId);
    const td = document.createElement('td');
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    updateButton.innerText = "Update";
    deleteButton.innerText = "Delete"

    updateButton.setAttribute('data-bookId', object.bookId)
    deleteButton.setAttribute('data-bookId', object.bookId)

    updateButton.classList.add('button', 'update-button');
    deleteButton.classList.add('button', 'delete-button');

    updateButton.addEventListener('click', onUpdate);
    deleteButton.addEventListener('click', onDelete);

    td.appendChild(updateButton);
    td.appendChild(deleteButton);

    tr.appendChild(td);

    for (const data in object) {
        const td = document.createElement('td');
        td.innerText = object[data];
        tr.appendChild(td);
    }

    tBody.append(tr);
}

function onUpdate(event) {
    const updateButton = event.target;
    const bookId = updateButton.dataset.bookid;

    const bookIndex = allBook.findIndex(book => book.bookId == bookId);
    const oldDetails = allBook[bookIndex];

    const allInput = form.querySelectorAll('input[type="text"]');

    allInput.forEach(input => {
        input.value = oldDetails[input.name];
    })

    form.querySelector('input[type="hidden"]').value = bookIndex;

}

function onDelete(event) {
    toggleModal();

    modal.querySelector('.yes-button').addEventListener('click', () => {
        const deleteButton = event.target;
        const bookId = deleteButton.dataset.bookid;

        allBook = allBook.filter(book => book.bookId != bookId);

        deleteButton.parentElement.parentElement.remove();

        toggleModal();
    });

    modal.querySelector('.no-button').addEventListener('click', () => {
        toggleModal();
    });
}

function updateTable(oldBookId, newBook) {
    const allTr = tBody.querySelectorAll('tr');
    const rowToUpdate = Array.from(allTr).find(tr => tr.dataset.bookid == oldBookId);
    rowToUpdate.dataset.bookid = newBook.bookId;
    const allTd = rowToUpdate.querySelectorAll('td');

    const allBtn = allTd[0].querySelectorAll('button');
    allBtn.forEach(btn => btn.dataset.bookid = newBook.bookId)

    allTd[1].innerText = newBook.bookId;
    allTd[2].innerText = newBook.bookName;
    allTd[3].innerText = newBook.bookAuthor;

}