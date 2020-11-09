const {check}= require('express-validator')

exports.catergoryCreateValidator=[
    check('name').not().isEmpty().withMessage('Category is Required'),
]
