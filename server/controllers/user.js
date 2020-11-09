const { errorHandler } = require('../helper/dbErrorHandler');
const Blog = require('../models/blog');
const User = require('../models/user');
const _= require('lodash');
const fs= require('fs');
const formidable = require('formidable')



exports.read =(req,res)=>{
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}


exports.publicProfile =(req,res)=>{
   let username =req.params.username
   let user;
   let blogs
    User.findOne({username}).exec((err,userFromDB)=>{
        if(err || !userFromDB){
            return res.status(400).json({
                error:'User Not Found'
            })
        }
        user =userFromDB
        let userId =user._id
        Blog.find({postedBy:userId})
        .populate('categories','_id name slug')
        .populate('tags','_id name slug')
        .populate('postedBy','_id name')
        .limit(10)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        user.photo=undefined
        user.hashed_password=undefined
        res.json({
            user,
            blogs:data
        })
    });

});
};

exports.update =(req,res)=>{
    let form =new formidable.IncomingForm();
    form.keepExtension=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Photo could Not Be Updated'
            })
        }
        if(fields.password && fields.password.length <6){
            return res.status(400).json({
              error:'Password should be minimum 6 charater long'  
            })
        }
        let user =req.profile
           if(!user.authenticate(fields.password)){
          return res.status(400).json({
            error:'Password Do Not Match'
        }); 
        }

        user =_.extend(user,fields)
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:'Image Should Be Less Than 1MB'
                })
            }
        }

            user.photo.data=fs.readFileSync(files.photo.path)
            user.photo.contentType =files.photo.contentType
            user.save((err,result)=>{
                if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            user.hashed_password=undefined
            user.salt=undefined;
            user.photo=undefined;
            res.json(user)
        })
    })

}

exports.photo=(req,res)=>{
    const username =req.params.username
    User.findOne({username}).exec((err,user)=>{
         console.log(user)
        if(err || !user){
            return res.status(400).json({
                error:"User Not Found"
            });
        }
      //  console.log(user.photo)
        if(user.photo){
            if(user.photo.data){
                res.set('Content-Type',user.photo.contentType);
                return res.send(user.photo.data);
            }
         }else{
                 return res.status(200).json({
                msg:"Photo Haven't Uploaded "
            });
         }
    })
}
