const User = require('../models/user')
const shortId =require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');
const blog = require('../models/blog');
const { errorHandler } = require('../helper/dbErrorHandler');
const nodemailer = require('nodemailer'); 
const _ = require('lodash');

const mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    } 
}); 

exports.preSignup =(req,res)=>{
const {name,email,password}= req.body;
User.findOne({email:email.toLowerCase()}).exec((err,user)=>{
    if(user){
        return res.status(400).json({
            error:"Email is Taken"
        })
    }
    const token =jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'10m'})
    let mailDetails = { 
    from: process.env.EMAIL_TO, 
    to: email, 
    subject:`Account Activation Link`,
    html:`
    <p> Please Use The Following Link To Activate Your Account:</p>
    <p> Url :${process.env.API}auth/account/activate/${token}</p>
    <hr/>
    <p>This Email May Contain Sensetive Information</p>
    <p>https://SeoBlog.com</p>`
};

 mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log('Error Occurs'); 
        } else { 
        console.log('Email sent successfully');
        return res.json({
            message:`Email Has been sent to ${email}.Follow The Instruction To Activate Your Account`
        }) 
        } 
    });
   
})
};



// exports.signup =(req,res)=>{
// User.findOne({email:req.body.email}).exec((err,user)=>{
//     if(user){
//         return res.status(400).json({
//             error:"Email is Taken"
//         })
//     }
//     const {name ,email,password}=req.body
//     let username =shortId.generate();
//     let profile = `${process.env.CLIENT_URL}/profile/${username}`
//     let newUser = new User ({name ,email,password,profile,username})
//     //console.log(newUser);
//     newUser.save((err,success)=>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             })
//         }
//         res.json({
//              message:"You Have Sucessfully Created Account",
//         })
//     });
// })
// };

exports.signup =(req,res)=>{
    const token =req.body.token;
    console.log(token)
    if(token){
     jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,((err,decoded)=>{
        if(err){
            return res.status(401).json({
                error:'Link Has Expired'
            })
        }
       const {name,email,password}=jwt.decode(token);
        let username =shortId.generate();
        let profile = `${process.env.DOMAIN_PRODUCTION}profile/${username}`
        const user = new User ({name ,email,password,profile,username})
        user.save((err,user)=>{
              if(err){
            return res.status(401).json({
                error:errorHandler(err)
            });
        }
        return res.json({
            message:'Signup Success! Please Signup'
        })
    })
        
  })
 )
}else{
    return res.status(401).json({
        error:'Something Went Wrong.'
    })
}
}

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

exports.forgotPassword =(req,res)=>{
    const {email}= req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error:'User with That Email Does Not Exist'
            })
        }
    const token = jwt.sign({_id:user._id},process.env.JWT_RESET_PASSWORD,{expiresIn:'10m'});
    let mailDetails = { 
    from: process.env.EMAIL_TO, 
    to: email, 
    subject:`Password Reset Link`,
    html:`
    <p> Please Use The Following Link To Reset Your Password:</p>
    <p> Url :${process.env.API}auth/password/reset/${token}</p>
    <hr/>
    <p>This Email May Contain Sensetive Information</p>
    <p>https://SeoBlog.com</p>`
}; 
    return user.updateOne({resetPasswordLink:token},(err,success)=>{
      if(err){
          return res.json({error:errorHandler(err)})
      }else{
        try {
        mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log('Error Occurs'); 
        } else { 
        console.log('Email sent successfully');
        return res.json({
            message:`Email Has been sent to ${email}.Follow The Instruction To Reset Your Password.Link Expires In 10 Min`
        }) 
        } 
    });
    } catch (error) {
    console.error(error) 
     }
    }
  })
})
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                });
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};