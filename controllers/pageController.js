
const { PATH } = require("../const");
const { getBrandsService } = require("../services/brand.services");
const { getWatchesService, getWatchesByClientService, getWatchByIdService } = require("../services/watch.service");
const watchController = require("./watchController");
var jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
class pageController {
    getLoginPage = async (req, res) => {
        const token = req.cookies.token; // Giả sử bạn đã lưu token với tên 'token'
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Invalid token.'
                    });
                }
                if (user.isAdmin === true) {
                    return res.redirect(PATH.ADMIN_PAGE)
                } else if (user.isAdmin === false) {
                    return res.redirect(PATH.HOME_PAGE)
                }
            });
        } else {
            return res.render("login")
        }

    }

    getHomePage = async (req, res) => {
        const data = await getWatchesByClientService(req, res, req.body?.keyword);
        return res.render("index", { data: data })
    }

    getHomePageFilter = async (req, res) => {
        const data = await getWatchesByClientService(req, res, req.body?.keyword);
        return res.render("index", { data: data })
    }

    getWatchDetailPage = async (req, res) => {
        try {
            const { id } = req.params
            const data = await getWatchByIdService(req, res, id);
            const dataUser = req.cookies.dataUser
            console.log("dataUser: ", dataUser)
            return res.render("watchDetail", { data: data, dataUser: dataUser })
        } catch (error) {
            console.log("getWatchDetailPage: ", error)
        }
    }
    getAdminPage = async (req, res) => {
        const token = req.cookies.token; // Giả sử bạn đã lưu token với tên 'token'
        if (token) {
            jwt.verify(token, SECRET_KEY, async (err, user) => {
                if (err) {
                    console.log("err: ", err)
                    return res.redirect(PATH.HOME_PAGE)
                }
                if (user.isAdmin === true) {
                    const getBrandsFromAdmin = await getBrandsService(req, res);

                    const getWatchesFromAdmin = await getWatchesService(req, res);
                    console.log("getWatchesFromAdmin: ", getWatchesFromAdmin)
                    return res.render("admin", { data: getWatchesFromAdmin, brands: getBrandsFromAdmin })
                } else if (user.isAdmin === false) {
                    return res.redirect(PATH.HOME_PAGE)
                }
            });
        } else {
            return res.render("login")
        }

    }
    getAdminBrandPage = async (req, res) => {
        const token = req.cookies.token; // Giả sử bạn đã lưu token với tên 'token'
        if (token) {
            jwt.verify(token, SECRET_KEY, async (err, user) => {
                if (err) {
                    console.log("err: ", err)
                    return res.redirect(PATH.HOME_PAGE)
                }
                if (user.isAdmin === true) {
                    const getBrandsFromAdmin = await getBrandsService(req, res);
                    console.log("getBrandsFromAdmin: ", getBrandsFromAdmin)
                    return res.render("admin_brand", { data: getBrandsFromAdmin })
                } else if (user.isAdmin === false) {
                    return res.redirect(PATH.HOME_PAGE)
                }
            });
        } else {
            return res.render("login")
        }

    }
    getRegisterPage = async (req, res) => {
        const token = req.cookies.token; // Giả sử bạn đã lưu token với tên 'token'
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Invalid token.'
                    });
                }
                if (user.isAdmin === true) {
                    return res.redirect(PATH.ADMIN_PAGE)
                } else if (user.isAdmin === false) {
                    return res.redirect(PATH.HOME_PAGE)
                }
            });
        } else {
            return res.render("register")
        }
    }
    getLogout = async (req, res) => {
        const cookies = req.cookies; // Lấy tất cả các cookie
        for (let cookie in cookies) {
            if (cookies.hasOwnProperty(cookie)) {
                res.clearCookie(cookie); // Xóa từng cookie
            }
        }
        return res.redirect(PATH.LOGIN_PAGE)
    }
}

module.exports = new pageController();