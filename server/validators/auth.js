const {check}= require('express-validator')

exports.userSignupValidator=[
    check('name').not().isEmpty().withMessage('Name is Required'),
    check('email').isEmail().withMessage('Must Be A Valid Email Address'),
    check('password').isLength({min:6}).withMessage('Password Must Be At Least 6 Charater Long'),

]

exports.userSigninValidator=[
    check('email').isEmail().withMessage('Must Be A Valid Email Address'),
    check('password').isLength({min:6}).withMessage('Password Must Be At Least 6 Charater Long'),

]

exports.forgotPasswordValidator=[
 check('email').isEmail().withMessage('Must Be A Valid Email Address'),
]

exports.resetPasswordValidator=[
 check('newPassword').isLength({min:6}).withMessage('Password Must Be At Least 6 Charater Long'),
]