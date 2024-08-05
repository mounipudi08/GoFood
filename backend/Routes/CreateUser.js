const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Thisisamernprojectitsnameisdabbawala";

router.post(
  "/create",
  [
    body("email").isEmail(),
    body("name").isLength({}),
    body("password", "Invalid Input").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.loction,
      });
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);

// router.post(
//   "/create",
//   [
//     body("email").isEmail(),
//     body("name").isLength({}),
//     body("password", "Invalid Input").isLength({ min: 5 }),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     User.create(req.body)
//       .then((data) => {
//         //return res.send(data);
//         return res.json({ success: true });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.json({ success: false });
//       });
//   }
// );

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Invalid Input").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try to login again  with correct credentials." });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try to login again  with correct password." });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }
);

module.exports = router;
