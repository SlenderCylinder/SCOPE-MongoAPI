require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Beneficiary = require('./models/beneficiary'); // Updated import
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(bodyParser.json());



app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and authorization headers
}));

// Create a new beneficiary
app.post('/beneficiaries', async (req, res) => { // Updated endpoint
  try {
    const beneficiary = new Beneficiary(req.body); // Updated model
    await beneficiary.save();
    res.status(201).send(beneficiary);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a beneficiary by ID
app.put('/beneficiaries/:id', async (req, res) => { // Updated endpoint
  const { id } = req.params;
  try {
    const beneficiary = await Beneficiary.findByIdAndUpdate(id, req.body, { new: true });
    if (!beneficiary) {
      return res.status(404).send();
    }
    res.send(beneficiary);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all beneficiaries
app.get('/beneficiaries', async (req, res) => { // Updated endpoint
  try {
    const beneficiaries = await Beneficiary.find();
    res.send(beneficiaries);
  } catch (error) {
    res.status(500).send(error);
  }
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
