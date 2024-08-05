const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.slice(0, 0, { Order_date: req.body.order_date });
  console.log("1231242343242354", req.body.email);

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

// router.post('/myOrderData', async (req, res) => {
//   try {
//       console.log(req.body.email)
//       let eId = await Order.findOne({ 'email': req.body.email })
//       //console.log(eId)
//       res.json({ orderData: eId })
//   } catch (error) {
//       res.send("Error",error.message)
//   }

// });

router.post("/myOrderData", async (req, res) => {
  try {
    console.log(req.body.email);
    const eId = await Order.findOne({ email: req.body.email });

    if (!eId) {
      return res
        .status(404)
        .json({ error: "No orders found for the given email" });
    }

    return res.json({ orderData: eId });
  } catch (error) {
    console.error("Error fetching order data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
