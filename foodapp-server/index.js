const express = require('express');
const app = express();
const port = process.env.PORT||3001;
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(express.json());
app.use(cors());

// alekhya197503

//Z8rxE2gbEo7UDoKE


mongoose.connect(
  "mongodb+srv://alekhya197503:Z8rxE2gbEo7UDoKE@cluster0.l0h0enb.mongodb.net/foodappdb?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("Mongodb connected successfully");
})
.catch((error) => {
  console.error(" Error connecting to mongodb:", error);
});



app.post("/jwt", async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1hr",
    });
    res.send({ token });
  });

  

const menuRoutes =require('./api/routes/menuRoutes');
app.use("/menu",menuRoutes);

const cartRoutes = require("./api/routes/cartRoutes");
app.use("/carts", cartRoutes);
const userRoutes = require("./api/routes/userRoutes");
app.use("/users", userRoutes);


const paymentRoutes = require("./api/routes/paymentRoute");
app.use("/payments", paymentRoutes);


app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.get("/",async(req,res)=>{
    res.send("helloWorld");
})


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})