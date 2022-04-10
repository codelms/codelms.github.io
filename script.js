const btnAdd = document.querySelector('.btn-add');

//modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

//modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');


const modalWrapper = document.querySelector('.modal-wrapper');

//
const tableUsers = document.querySelector('.table-users');

//Detele Msg Alert in alertbox
function deleteMsgAlert() {
    document.querySelector('.alertMsg').innerHTML = "Document succesfully deleted! Reload the browser.";
    document.querySelector('.alert').style.background = 'rgb(214, 136, 0)';
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
    }, 4000);
}

// Add member Msg alert in alertbox
function addMsgAlert() {
    document.querySelector('.alertMsg').innerHTML = addModalForm.firstName.value + ' ' + addModalForm.lastName.value + " added complete.  Reload the browser.";
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 4000);
}

//Edit member Msg alert in alertbox
function editMsgAlert() {
    document.querySelector('.alertMsg').innerHTML = editModalForm.firstName.value + ' ' + editModalForm.lastName.value + " edited complete. Reload the browser.";
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 4000);
}



let id;

// Create element and render users
const renderUser = doc => {
    const tr = `
    <tr data-id='${doc.id}'>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().lastName}</td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().email}</td>
        <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </td>
    </tr>
    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);

    //Click edit user
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');

        id = doc.id;

        editModalForm.firstName.value = doc.data().firstName;
        editModalForm.lastName.value = doc.data().lastName;
        editModalForm.phone.value = doc.data().phone;
        editModalForm.email.value = doc.data().email;
    });






    //click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('userparadox').doc(`${doc.id}`).delete().then(() => {
            console.log('Document succesfully deleted!');
            deleteMsgAlert();
            
        }).catch(err => {
            console.log("Error removing document", err);
        });
    });
}






//click add user button
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');

    addModalForm.firstName.value = '';
    addModalForm.lastName.value = '';
    addModalForm.phone.value = '';
    addModalForm.email.value = '';
});

//user click anyware outside the modal
window.addEventListener('click', e => {
    if(e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
    if(e.target === editModal) {
        editModal.classList.remove('modal-show');
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//Firebase SDK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get All users

db.collection('userparadox').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        renderUser(doc);
    });
}); 

//Real time listner
// db.collection('userparadox').onSnapshot(snapshot => {
//     snapshot.docChanges().forEach(change => {
//         if(change.type == 'added') {
//             renderUser(change.doc);
//         }
//         if(change.type === 'removed') {
//             let tr = document.querySelector(`[data-id='${change.doc.id}']`);
//             let tbody = tr.parentElement;
//             tableUsers.removeChild(tbody);
//         }
//     });
// });






//Click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(addModalForm.firstName.value);
    db.collection('userparadox').add({
        firstName: addModalForm.firstName.value,
        lastName: addModalForm.lastName.value,
        phone: addModalForm.phone.value,
        email: addModalForm.email.value,
    });
    modalWrapper.classList.remove('modal-show');
    console.log(addModalForm.firstName.value + " added complete.");
    addMsgAlert();
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('userparadox').doc(id).update({
        firstName: editModalForm.firstName.value,
        lastName: editModalForm.lastName.value,
        phone: editModalForm.phone.value,
        email: editModalForm.email.value,
    });
    editModal.classList.remove('modal-show');
    console.log(editModalForm.firstName.value + " edited complete.");
    editMsgAlert();
});
