const User = require('../models/user');

const checkDuplicateEmail = (req, res, next) => {
    // Username

    // Email
    User.findOne({
        where: {
            user_email: req.body.user_email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }

        next();
    });
};





const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    // checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;