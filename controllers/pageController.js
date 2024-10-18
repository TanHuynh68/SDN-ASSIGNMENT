
const { getWatchesService } = require("../services/watch.service");

class pageController {
    getAdminPage = async (req, res) => {
        const getWatchesFromAdmin = await getWatchesService(req, res);
        return res.render("admin", {data: getWatchesFromAdmin})
    }
    getRegisterPage = async (req, res) => {
        return res.render("register")
    }
}

module.exports = new pageController();