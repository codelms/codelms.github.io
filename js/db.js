
const updateDiv = document.querySelector('.updateDiv');


// Create element and render users
const renderData = doc => {
    const div = `
    <div class="updateBox" data-id='${doc.id}'>
            <h3 class="topicdb">${doc.data().topicdb}</h3>
            <p class="descriptiondb">${doc.data().descriptiondb}</p>
            <p class="datedb">${doc.data().datedb}</p>
        </div>
    `;
    updateDiv.insertAdjacentHTML('beforeend', div);
}

db.collection('lms').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        renderData(doc);
    });
}); 
