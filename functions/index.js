require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mongoose = require("mongoose");
const cors = require("cors");
const Beneficiary = require("./models/beneficiary");
const User = require("./models/User");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
admin.initializeApp(functions.config().firebase);

// Enable CORS
app.use(cors({ origin: true }));

// Create a new beneficiary
app.post("/beneficiaries", async (req, res) => {
  try {
    let firstName = "John";
    let lastName = "Smith";
    let scopeId = 123456;
    let balance = 10000;
    let purchaseHistory = [];

    const beneficiary = new Beneficiary({
      firstName,
      lastName,
      scopeId,
      balance,
      purchaseHistory,
    });
    await beneficiary.save();
    res.status(201).send(beneficiary);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    res.send("success").status(201);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/login/pin", async (req, res) => {
  try {
    const { pin } = req.body;
    console.log(pin);
    res.send("success").status(201);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const { user, password } = req.body;
    const newUser = new User({ user, password });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/beneficiaries/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) {
      return res.status(404).send({ error: "Beneficiary not found" });
    }
    res.send(beneficiary);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a beneficiary by ID
app.put("/beneficiaries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const beneficiary = await Beneficiary.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!beneficiary) {
      return res.status(404).send();
    }
    res.send(beneficiary);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/beneficiaries/updateCart", async (req, res) => {
  const { cartItems, id } = req.body;

  console.log("id:", id);

  try {
    // Find the user by ID
    const user = await Beneficiary.findById(id);

    console.log("user:", user);

    // Calculate the total price of the cart items
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Update the purchase history and balance fields
    const purchaseHistory = cartItems.map((item) => ({
      itemName: item.name,
      itemPrice: item.price,
      itemQuantity: item.quantity,
      dateOfPurchase: new Date(),
    }));
    user.purchaseHistory.push(...purchaseHistory);
    user.balance -= parseFloat(totalPrice.toFixed(2));

    // Save the updated user details
    await user.save();

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Retrieve all beneficiaries
app.get("/beneficiaries", async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.send(beneficiaries);
  } catch (error) {
    res.status(500).send(error);
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

exports.app = functions.https.onRequest(app);
