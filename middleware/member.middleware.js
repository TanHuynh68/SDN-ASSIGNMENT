const { param, body, check } = require('express-validator');

class memberMiddleWare{
     validateIdFromParam = [
        param('id').notEmpty().withMessage('id is required!'),
    ];
    
    changePassword = [
        body('id').notEmpty().withMessage('id is required!'),
        body('password').notEmpty().withMessage('password is required!'),
        check('password')
        .isLength({ min: 6 }) // Đảm bảo độ dài ít nhất là 6 ký tự
        .withMessage('password must be at least 6 digits long.')
        .matches(/^\d+$/) // Đảm bảo chỉ chứa số
        .withMessage('password must only contain digits.')
    ];

    banOrUnBanMember = [
        param('id').notEmpty().withMessage('id is required!'),
    ];
    
    editMember = [
        param('id').notEmpty().withMessage('id is required!'),
        body('phoneNumber').notEmpty().withMessage('phoneNumber is required!'),
        body('name').notEmpty().withMessage('name is required!'),
        body('YOB').notEmpty().withMessage('YOB is required!'),
    ];

    commentWatch = [
        param('id').notEmpty().withMessage('id is required!'),
        body('content').notEmpty().withMessage('content is required!'),
        body('author').notEmpty().withMessage('author is required!'),
        body('rating').notEmpty().withMessage('rating is required!'),
        body('rating')
        .isFloat({ min: 1, max: 5 })
        .withMessage('rating must be a number between 1 and 5!')
    ];
}

module.exports = new  memberMiddleWare();