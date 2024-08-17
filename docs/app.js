document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('student-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById('message').innerText = 'Data saved successfully!';
            this.reset(); // Clear the form
        })
        .catch(error => {
            document.getElementById('message').innerText = 'Error saving data.';
            console.error('Error:', error);
        });
    });
});