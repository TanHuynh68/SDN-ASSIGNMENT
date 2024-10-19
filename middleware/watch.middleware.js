const { body, check } = require('express-validator');

const validateWatch = [
    body('watchName').notEmpty().withMessage('watchName is required!'),
    body('image').notEmpty().withMessage('image is required!'),
    body('price').notEmpty().withMessage('price is required!'),
    check('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a number greater than 0.'),
    body('Automatic').notEmpty().withMessage('Automatic is required!'),
    body('watchDescription').notEmpty().withMessage('watchDescription is required!'),
    body('brand').notEmpty().withMessage('brand is required!'),
    body('Automatic').isBoolean().withMessage('Automatic must be boolean type!'),
    body('price').isNumeric().withMessage('price must be number type!'),
];


module.exports = validateWatch;