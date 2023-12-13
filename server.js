const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const path = require('path');

const app = express();
app.setMaxListeners(15); // Set the maximum number of listeners to 15

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

mongoose.connect('mongodb://localhost:27017/Airline-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, // Ensure you have this line to avoid the MongoDB deprecation warning
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}));

const FlightUser = mongoose.model('FlightUser', new mongoose.Schema({
    flightName: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    flightClass: { type: String, required: true },
    seats: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    takeOffTime: { type: String, required: true },
}));

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
    passengerName: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    classType: { type: String, required: true },
    selectedSeats: { type: Number, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    time: { type: String, required: true },
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'interface.html'));
});

// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Login route with server-side validation
app.post('/login', [
    check('username'),
    check('password'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render(path.join('views', 'login'), { errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            // Check if the user is already logged in
            if (req.session.user) {
                res.redirect('/flight');
            } else {
                req.session.user = user;
                res.redirect('/flight');
            }
        } else {
            res.render(path.join('views', 'login'), { errors: [{ msg: 'Invalid username or password' }] });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registration.html'));
});

app.post('/registration', [
    // ... your validation middleware
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render(path.join('views', 'registration'), { errors: errors.array() });
    }

    const { name, mobile, username, password } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ name, mobile, username, password: hashedPassword });

        // Save the user to MongoDB
        await user.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Error saving user to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/flight', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'flight.html'));
});

app.get('/available_flight', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'available_flight.html'));
});

app.get('/passenger_info', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'passenger_info.html'));
});

app.get('/adminlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_login.html'));
});

// ... (previous code)

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});



app.post('/available_flight', [
    check('seats').notEmpty(),
    // Add validation for other fields in the FlightUser schema as needed
], async (req, res) => {
    console.log('Request received at /available_flight');
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).render(path.join('views', 'available_flight'), { errors: errors.array() });
    }

    // Create a new FlightUser document
    const { flightName, seats, amount, departure, destination, departureDate, flightClass } = req.body;
    const flightUser = new FlightUser({
        flightName,
        seats,
        amount,
        departure,
        destination,
        departureDate,
        flightClass,
        // Add other fields based on your schema
    });

    try {
        // Save the FlightUser document to the database
        await flightUser.save();

        console.log('FlightUser document saved successfully.'); // Add this line for debugging

        // Send a response indicating success
        res.redirect('/passenger_info');
    } catch (error) {
        console.error('Error during flight user creation:', error);
        res.status(500).render(path.join('views', 'available_flight'), { error: 'Internal Server Error' });
    }
});

app.post('/ticket', [
    // Add validation for fields in the Ticket schema as needed
], async (req, res) => {
    console.log('Request received at /ticket');
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).send('Validation errors');
    }

    // Retrieve ticket information from the request body
    const ticketData = req.body;

    try {
        // Create a new Ticket document and save it to the database
        const ticket = new Ticket(ticketData);
        await ticket.save();

        console.log('Ticket document saved successfully.');

        // Send a response indicating success
        res.send('Ticket saved successfully');
    } catch (error) {
        console.error('Error during ticket creation:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', [
    check('username').isAlphanumeric().withMessage('Username can only contain letters and numbers'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('login', { errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/booking');
        } else {
            res.render('login', { errors: [{ msg: 'Invalid username or password' }] });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ... (previous code)

app.post('/adminlogin', [
    check('username').isAlphanumeric().withMessage('Username can only contain letters and numbers'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('adminlogin', { errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if the provided credentials are admin/password
    if (username === 'admin' && password === 'password') {
        req.session.user = { username: 'admin' }; // Store user information in the session
        res.redirect('/admin');
    } else {
        res.render('adminlogin', { errors: [{ msg: 'Invalid username or password' }] });
    }
});


app.get('/admin', async (req, res) => {
    try {
        const bookings = await Booking.find();
        const users = await User.find();
        res.render('admin', { bookings, users });
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/admin/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/admin/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/admin/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update the existing '/admin/getUsers' endpoint
app.get('/admin/getUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/admin/updateUser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (user) {
            res.render('update_user', { user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user for update:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/admin/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, mobile, age, username } = req.body;

    try {
        console.log('Updating user:', userId, name, mobile, username);

        const updatedUser = await User.findByIdAndUpdate(userId, { name, mobile, username }, { new: true });

        if (updatedUser) {
            console.log('User updated successfully:', updatedUser);
            res.redirect('/admin'); // Redirect to the admin page after successful update
        } else {
            console.log('User not found');
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error: ' + error.message);
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
