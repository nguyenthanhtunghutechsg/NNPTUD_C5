var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHand = require('../helper/ResHandle')
var { validationResult } = require('express-validator');
var checkAuth = require('../validators/auth')
var bcrypt = require('bcrypt');
var protect = require('../middlewares/protect')


router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    ResHand(res, false, "hay nhap day du thong tin");
    return;
  }
  let user = await userModel.findOne({ username: username })
  if (!user) {
    ResHand(res, false, "username hoac password khong dung");
    return;
  }
  let result = bcrypt.compareSync(password, user.password);
  if (result) {
    ResHand(res, true, user.getJWT());
  } else {
    ResHand(res, false, "username hoac password khong dung");
  }
});

router.get('/me', protect, async function (req, res, next) {
  ResHand(res, true, req.user);
});


router.post('/register', checkAuth(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    ResHand(res, false, result.errors);
    return;
  }
  try {
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: ["USER"]
    })
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
});


module.exports = router;