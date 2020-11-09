const User = require('../models/user')
const shortId =require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');
const blog = require('../models/blog');
const { errorHandler } = require('../helper/dbErrorHandler');


exports.signup =(req,res)=>{
User.findOne({email:req.body.email}).exec((err,user)=>{
    if(user){
        return res.status(400).json({
            error:"Email is Taken"
        })
    }
    const {name ,email,password}=req.body
    let username =shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`
    let newUser = new User ({name ,email,password,profile,username})
    //console.log(newUser);
    newUser.save((err,success)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
             message:"You Have Sucessfully Created Account",
        })
    });
})
};

exports.signin = (req,res) =>{
    //Check if user exist
    const {email,password}=req.body
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'User With That Email Does Not Exist.Please SignUp'
            });
        }
           //authenticate
           //Return if password is wrong
           console.log(user);
        if(!user.authenticate(password)){
              return res.status(400).json({
                error:'Email and Password Do Not Match'
            }); 
        }
        const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        //setting up the Cookie
        res.cookie('token',token,{expiresIn:'1d'});
        const {_id,username,name,email,role}=user;
        return res.json({
            token,
            user:{_id,username,name,email,role}
        })
    })
    //generate a token and send to client
}

exports.signout =(req,res)=>{
    res.clearCookie('token');
    res.json({
        message:'Signout Sucess'
    });
};
//Get The Decode Value From Token
exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,algorithms: ['HS256']
});

exports.authMiddleware =(req,res,next)=>{
    const authUserId =req.user._id;
    console.log(authUserId);
    User.findById({_id:authUserId}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'User Not Found'
            })
        }
        req.profile =user
        next()
    })
}

exports.adminMiddleware =(req,res,next)=>{
    const adminUserId =req.user._id
    User.findById({_id:adminUserId}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'User Not Found'
            })
        }
        if(user.role !== 1){
           return res.status(400).json({
            error:'Admin resource. Access Denied'
           }) 
        }
        req.profile =user
        next()
    })
}

exports.canupdateDeleteBlog =(req,res,next)=>{
    const slug =req.params.slug.toLowerCase();
    blog.findOne({slug}).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        let authorizedUser =data.postedBy._id.toString() === req.profile._id.toString();
        if(!authorizedUser){
              return res.status(400).json({
                error:'You Are Not Authorized'
              })
        }
        next();
    })
}
