var jwt = require('jsonwebtoken');

const createToken = (data, SECRET_KEY, expiresIn) => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: expiresIn, // Token có thời hạn 24 giờ
    });

    return token
}

const checkToken = (req, res, next) => {
    const token = localStorage.getItem(token) || req.headers['authorization'];

    if (!token) {
        // Nếu không có token thì cho phép tiếp tục vào login
        return next();
    }

    // Nếu có token, tiến hành xác thực
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            // Nếu token không hợp lệ hoặc hết hạn, tiếp tục vào trang login
            return next();
        }
        console.log("decoded: ", decoded)
        // Nếu token hợp lệ, chuyển hướng đến trang admin (hoặc trang khác)
        return res.redirect("/admin");
    });
};
module.exports = {
    createToken, checkToken
}