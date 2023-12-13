document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var seats = urlParams.get('seats');

    var ticketsContainer = document.getElementById('tickets');

    for (var i = 1; i <= seats; i++) {
        var ticket = document.createElement('div');
        ticket.classList.add('ticket');

        ticket.innerHTML = `
            <h3>Passenger ${i} Ticket</h3>
            <label for="passengerName${i}">Passenger Name:</label>
            <span id="passengerName${i}"></span><br>

            <label for="gender${i}">Gender:</label>
            <span id="gender${i}"></span><br>

            <label for="contactNumber${i}">Contact Number:</label>
            <span id="contactNumber${i}"></span><br>

            <label for="age${i}">Age:</label>
            <span id="age${i}"></span><br>

            <label for="email${i}">Email Id:</label>
            <span id="email${i}"></span><br>

            <label for="departure">Departure:</label>
            <span id="departure"></span><br>

            <label for="destination">Destination:</label>
            <span id="destination"></span><br>

            <label for="classType">Class:</label>
            <span id="classType"></span><br>

            <label for="selectedSeats">Seats:</label>
            <span id="selectedSeats"></span><br>

            <label for="date">Date:</label>
            <span id="date"></span><br>

            <label for="price">Price:</label>
            <span id="price"></span><br>

            <label for="time">Time:</label>
            <span id="time"></span><br>

            <button onclick="downloadTicket(${i})">Download Ticket</button>
        `;

        ticketsContainer.appendChild(ticket);
    }
});

function downloadTicket(passengerNumber) {
    // Add your code to generate and download the ticket for the specific passenger
    var passengerName = document.getElementById(`passengerName${passengerNumber}`).textContent;
    var gender = document.getElementById(`gender${passengerNumber}`).textContent;
    var contactNumber = document.getElementById(`contactNumber${passengerNumber}`).textContent;
    var age = document.getElementById(`age${passengerNumber}`).textContent;
    var email = document.getElementById(`email${passengerNumber}`).textContent;

    var departure = document.getElementById('departure').textContent;
    var destination = document.getElementById('destination').textContent;
    var classType = document.getElementById('classType').textContent;
    var selectedSeats = document.getElementById('selectedSeats').textContent;
    var date = document.getElementById('date').textContent;
    var price = document.getElementById('price').textContent;
    var time = document.getElementById('time').textContent;

    var ticketContent = `
        Passenger Name: ${passengerName}
        Gender: ${gender}
        Contact Number: ${contactNumber}
        Age: ${age}
        Email Id: ${email}

        Departure: ${departure}
        Destination: ${destination}
        Class: ${classType}
        Seats: ${selectedSeats}
        Date: ${date}
        Price: ${price}
        Time: ${time}
    `;

    // For simplicity, alerting the ticket content. In a real scenario, you can create a downloadable file.
    alert('Ticket Content:\n\n' + ticketContent);
}
