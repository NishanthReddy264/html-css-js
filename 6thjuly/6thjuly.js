document.addEventListener('DOMContentLoaded', (event) => {
    const fileInput = document.getElementById('fileInput');
    const addButton = document.getElementById('addButton');
    const userDataDiv = document.getElementById('userData');

    function displayUserData() {
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        userDataDiv.innerHTML = '';
        usersData.forEach(userData => {
            userDataDiv.innerHTML += `
                <div class="user-card">
                    <p><strong>First Name:</strong> ${userData.firstName}</p>
                    <p><strong>Last Name:</strong> ${userData.lastName}</p>
                    <p><strong>Email:</strong> ${userData.email}</p>
                    <img src="${userData.imageUrl}" alt="User Image">
                </div>
            `;
        });
    }

    addButton.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!firstName || !lastName || !email || !password) {
            alert('Please fill all the fields.');
            return;
        }

        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;

                const userData = {
                    firstName,
                    lastName,
                    email,
                    password,
                    imageUrl
                };

                const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
                usersData.push(userData);
                localStorage.setItem('usersData', JSON.stringify(usersData));
                displayUserData();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image.');
        }
    });

    displayUserData();
});