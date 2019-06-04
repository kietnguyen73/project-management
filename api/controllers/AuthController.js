const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeManager = require('../managers/EmployeeManager');
const employeeManager = new EmployeeManager();

module.exports.login = async (req, res, next) => {

    let self = this;
    let username = req.body.user_name;
    let password = req.body.password;

    if (!username) {
        return res.status(400).json({ message: "Missing username" });
    }

    if (!password) {
        return res.status(400).json({ message: "Missing password" });
    }

    try {
        
        let user = await employeeManager.findUserByUserName(req.body.user_name);

        if (Array.isArray(user) && user.length) {

            let hashedPassword = user[0].dataValues.password;

            console.log(user);

            bcrypt.compare(password, hashedPassword, function (err, result) {
                if (err) return res.status(401).json({ message: err });
                if (result) {
                    self.generateToken(user, req, res);
                } else {
                    return res.status(401).json({ message: "Authenticate failed" });
                }
            });

        } else {
            return res.status(400).json({ message: "Invalid username or password" });
        }   
    
    } catch (err) {
        return res.status(400).json({ "message": err });
    }
}


module.exports.generateToken = (user, req, res) => {

    let payload = {
        id: user[0].dataValues.employeeId,
        username: user[0].dataValues.username,
        email: user[0].dataValues.email,
        type: user[0].dataValues.type,
        role: user[0].dataValues.role_id
    }

    /*create a token*/
    try {
        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
        return res.status(200).json({ auth: true, token: token });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}


module.exports.authenticate = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ auth: false, message: "No token provided" });

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err)
            return res.status(500).json({ auth: false, message: "Failed to authenticate token" });
        req.user = decoded;
        next();
    });
}
