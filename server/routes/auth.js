const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false })


// router.get("/", (req, res) => {
//     try {
//         res.send(
//             "berhasil"
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("server error");
//     }
// })

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "abcd123";

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    let user = getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);



const getUser = async obj => {
    return await User.findOne({
        where: obj
    });
};


router.post("/register", async (req, res) => {
    try {
        const { user_name, user_email, password } = await req.body;

        const salt = await bcrypt.genSaltSync(10);

        const user_password = await bcrypt.hashSync(password, salt);

        console.log(user_email, user_name, user_password);

        if (user_email) {
            let user = await getUser({ user_email: user_email });

            if (user) {
                res.status(401).json({ message: "email sudah terdaftar" });
            } else {

                const newUser = await User.create({
                    user_name: user_name,
                    user_email: user_email,
                    user_password: user_password,
                });

                let payload = { id: newUser.id };

                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ newUser, token });
            }
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

router.post("/login", urlencodedParser, async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        if (user_email && user_password) {
            let user = await getUser({ user_email: user_email });

            if (!user) {
                res.status(401).json({ msg: "email salah atau anda belum terdaftar" });
            }

            // if (user.user_password === user_password) {
            if (bcrypt.compareSync(user_password, user.user_password) === true) {
                let payload = { id: user.id };

                let token = jwt.sign(payload, jwtOptions.secretOrKey);

                res.json({ msg: "oke", token: token, id: user.id, email: user.user_email });
            } else {
                res.status(401).json({ msg: "password salah" });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            res.send(
                "SELAMAT!! sekarang kamu bisa mengakses router ini dengan passportjs"
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);

router.get(
    "/dikunci",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            res.send(
                "SELAMAT!! sekarang kamu bisa mengakses router ini dengan passportjs"
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);

module.exports = router;