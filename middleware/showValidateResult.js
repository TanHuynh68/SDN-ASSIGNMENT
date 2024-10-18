const { validationResult } = require('express-validator');
const showValiDateResult = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation errors",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
}
module.exports = showValiDateResult;