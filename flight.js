// document.addEventListener('DOMContentLoaded', function() {
//     const startInput = document.getElementById('start');
//     const endInput = document.getElementById('end');
//     const searchButton = document.getElementById('search-button');

//     // Enable the button only if both fields contain only letters
//     startInput.addEventListener('input', validateForm);
//     endInput.addEventListener('input', validateForm);

//     function validateForm() {
//         const startValue = startInput.value;
//         const endValue = endInput.value;
//         const isValidStart = /^[A-Za-z\s]+$/.test(startValue);
//         const isValidEnd = /^[A-Za-z\s]+$/.test(endValue);

//         if (isValidStart && isValidEnd) {
//             searchButton.disabled = false;
//         } else {
//             searchButton.disabled = true;
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const seatsInput = document.getElementById('seats');
    const passengerInfo = document.getElementById('passenger-info');
    const passengerForm = document.getElementById('passenger-form');
    const searchButton = document.getElementById('search-button');

    seatsInput.addEventListener('input', displayPassengerForms);

    function displayPassengerForms() {
        const numberOfSeats = parseInt(seatsInput.value);
        if (numberOfSeats > 0) {
            passengerInfo.style.display = 'block';
            searchButton.disabled = false;

            // Clear previous forms
            passengerForm.innerHTML = '';

            // Generate forms for each seat
            for (let i = 1; i <= numberOfSeats; i++) {
                const passengerSlip = document.createElement('div');
                passengerSlip.className = 'passenger-slip';
                passengerSlip.innerHTML = `
                    <h3>Passenger ${i}</h3>
                    <input type="text" name="passenger-name-${i}" placeholder="Passenger Name" required>
                    <input type="date" name="passenger-dob-${i}" required>
                    <select name="passenger-gender-${i}" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="text" name="passenger-address-${i}" placeholder="Address" required>
                `;
                passengerForm.appendChild(passengerSlip);
            }
        } else {
            passengerInfo.style.display = 'none';
            searchButton.disabled = true;
        }
    }
});
