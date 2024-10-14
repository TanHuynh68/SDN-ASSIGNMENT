var jwt = require('jsonwebtoken');
var {jwtDecode} = require('jwt-decode');
const createToken = (data, SECRET_KEY, expiresIn) => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: expiresIn,
    });

    return token
}

const checkToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token: ", token)
    if (!token) {
        return next();
    }else{
        const decoded = jwtDecode(token);
        console.log("decoded", decoded)
        if(decoded.isAdmin){
            return res.redirect("/admin");
        }
    }
};

module.exports = {
    createToken, checkToken
}