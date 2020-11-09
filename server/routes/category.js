const express =require('express');
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const router =express.Router();
const {create,list,read,remove} = require('../controllers/category');


//Validator
const {runValidation}= require('../validators');
const {catergoryCreateValidator}=require('../validators/category')


router.post('/category',catergoryCreateValidator,runValidation,requireSignin,adminMiddleware,create)
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',requireSignin,adminMiddleware,remove)

module.exports =router;


