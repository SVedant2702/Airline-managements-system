// Function to generate flight items with take-off timing, price per seat, and flight number
function generateFlightItem(flightName, departure, destination, flightClass, seats, departureDate, amount, takeOffTime) {
    var flightItem = document.createElement('div');
    flightItem.className = 'flight-item';

    var flightInfo = document.createElement('div');
    flightInfo.className = 'flight-info';

    var flightDetails = `
        <h3>${flightName}</h3>
        <p>Departure: ${departure}</p>
        <p>Destination: ${destination}</p>
        <p>Class: ${flightClass}</p>
        <p>Seats: ${seats}</p>
        <p>Departure Date: ${departureDate}</p>
        <p>Take-Off Time: ${takeOffTime}</p>
        <p>Amount: ₹${amount} per seat</p>
        <p>Flight Number: ${getFlightNumber(flightName)}</p>
    `;

    flightInfo.innerHTML = flightDetails;

    var selectButton = document.createElement('button');
    selectButton.innerText = 'Select';
    selectButton.addEventListener('click', function() {
        selectFlight(flightName, seats, amount);
    });

    flightItem.appendChild(flightInfo);
    flightItem.appendChild(selectButton);

    document.querySelector('.flight-list').appendChild(flightItem);
}

// Function to get flight number from flight name
function getFlightNumber(flightName) {
    // You can implement your own logic to extract or generate flight numbers
    // For demonstration, let's assume flight names end with three digits representing the flight number
    var match = flightName.match(/\d{3}$/);
    return match ? match[0] : 'N/A';
}

// Example: Add more flight items as needed
// generateFlightItem('Pune to Mumbai', 'Pune', 'Mumbai', 'Business', 100, '2023-11-30', 300, '10:00 AM');
// generateFlightItem('Banglore to Delhi', 'Banglore', 'Delhi', 'Economy', 120, '2023-12-01', 180, '09:30 AM');

function selectFlight(flightName, seats, amount) {
    // Add your logic for handling the selected flight
    alert(`Flight ${flightName} selected. ${seats} seat(s) selected. Amount: ₹${amount * seats}`);

    // Redirect to the user.html page
    window.location.href = '/user.html';
}
