const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const mongoDB = require('./db');
const UserRoutes = require("./Routes/CreateUser");
const DisplayRoutes = require("./Routes/Display");
const OrderData = require("./Routes/OrderData");

app.use((req, res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user",UserRoutes);
app.use("/api/display",DisplayRoutes);
app.use("/api/order",OrderData);


mongoDB().then(()=>{
  console.log("Connection is successful")
  app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
  });
}).catch((err)=>{
  console.log(err);
})

app.get('/', (req, res) => {
  res.send('Welcome to MongoDB');
})

//http://localhost:3001/api/user/create
//http://localhost:3001/api/display/footData
//http://localhost:3001/api/order/orderData


