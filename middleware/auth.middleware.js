const { body } = require('express-validator');

class authMiddleWare{
     validateRegister = [
        body('memberName').notEmpty().withMessage('memberName is required!'),
        body('password').notEmpty().withMessage('password is required!'),
        body('name').notEmpty().withMessage('name is required!'),
    ];
    
     loginValidate = [
        body('memberName').notEmpty().withMessage('memberName is required!'),
        body('password').notEmpty().withMessage('password is required!'),
    ];
}

module.exports = new  authMiddleWare();