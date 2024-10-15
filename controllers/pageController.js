
const { getWatchesService } = require("../services/watch.service");

class pageController {
    getAdminPage = async (req, res) => {
        const getWatchesFromAdmin = await getWatchesService(req, res);
        return res.render("admin", {data: getWatchesFromAdmin})
    }
}

module.exports = new pageController();