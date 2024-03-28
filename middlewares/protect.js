var jwt = require('jsonwebtoken');
const config = require('../configs/config');
var userModel =require('../schemas/user')

module.exports = async function  (req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        ResHand(res, false, "yeu cau dang nhap");
    }
    let token = req.headers.authorization.split(" ")[1];
    try {
        let result = jwt.verify(token, config.JWT_SECRET_KEY);
        var user = await userModel.findById(result.id);
        req.user = user
        next();
    } catch (error) {
        ResHand(res, false, "yeu cau dang nhap");
    }
}