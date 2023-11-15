// script.js
function submitForm() {
    const formData = new FormData();
    formData.append('imageHeader', document.getElementById('imageHeader').files[0]);
    formData.append('textHeader', document.getElementById('textHeader').value);
    const moreImages = document.getElementById('moreImages').files;
    for (let i = 0; i < moreImages.length; i++) {
        formData.append(`moreImages${i}`, moreImages[i]);
    }
    formData.append('textBody', document.getElementById('textBody').value);

    saveBlogData(formData);
}

function saveBlogData(formData) {
    fetch('api.js', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Blog post submitted successfully!');
        clearForm();
    })
    .catch(error => {
        console.error('Error submitting blog post:', error);
    });
}

function clearForm() {
    document.getElementById('imageHeader').value = '';
    document.getElementById('textHeader').value = '';
    document.getElementById('moreImages').value = '';
    document.getElementById('textBody').value = '';
}
