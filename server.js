const express = require('express');
const mongoose = require('mongoose');
const donorRoutes = require('./routes/donorRoutes'); // Correct path to donorRoutes.js

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blood-donation')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use routes
app.use('/api/donors', donorRoutes);

app.listen(5001, () => console.log('Server started on port 5001'));
