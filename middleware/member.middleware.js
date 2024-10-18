const { param, body } = require('express-validator');

class memberMiddleWare{
     validateIdFromParam = [
        param('id').notEmpty().withMessage('id is required!'),
    ];
    changePassword = [
        body('id').notEmpty().withMessage('id is required!'),
        body('password').notEmpty().withMessage('password is required!'),
    ];
    banOrUnBanMember = [
        param('id').notEmpty().withMessage('id is required!'),
    ];
}

module.exports = new  memberMiddleWare();