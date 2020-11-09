const {check}= require('express-validator')

exports.contactFormValidator=[
    check('name').not().isEmpty().withMessage('Name is Required'),
    check('email').isEmail().withMessage('Must Be A Valid Email Address'),
    check('message').not().isEmpty().isLength({min:20}).withMessage('Message must be at least 20 Charater'),
]
