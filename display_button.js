
        function displayPage() {
            // Set the display values
            document.getElementById('display-name').textContent = document.getElementById('name').value;
            document.getElementById('display-mobile').textContent = document.getElementById('mobile').value;
            document.getElementById('display-email').textContent = document.getElementById('email').value;
            document.getElementById('display-username').textContent = document.getElementById('username').value;
            document.getElementById('display-password').textContent = document.getElementById('password').value;

            // Show the entire page content, including the displayed information
            document.querySelector(".container").style.display = "block";
        }
