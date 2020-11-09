const { requireSignin } = require("./auth");
const Blog =require('../models/blog')
const Category=require('../models/category')
const Tag=require('../models/tag')
const User=require('../models/user')
const formidable = require('formidable')
const slugify =require('slugify')
const stripHtml= require('string-strip-html')
const _=require('lodash')
const { errorHandler } = require('../helper/dbErrorHandler')
const fs =require('fs');
const tag = require("../models/tag");
const {smartTrim} =require('../helper/blog')
exports.create =(req,res)=>{
let form =new formidable.IncomingForm()  
form.keepExtensions=true
form.parse(req,(err,fields,files)=>{
    if(err){
        return res.status(400).json({
            error:'Image Could Not Upload'
        })
    }
    const {title,body,categories,tags}=fields
    if(!title || !title.length){
        return res.status(400).json({
            error:'tittle is require'
        })
    }
    if(!body || body.length<200){
        return res.status(400).json({
            error:'Content is too Short'
        })
    }
    if(!categories || categories.length===0){
        return res.status(400).json({
            error:'Aleast 1 Category required'
        })
    }
    if(!tags || tags.length===0){
        return res.status(400).json({
            error:'Aleast 1 Tag required'
        })
    }
    let blog =new Blog()
    blog.title=title;
    blog.body=body;
    blog.excerpt=smartTrim(body,320,'',' ...');
    blog.slug=slugify(title).toLowerCase()
    blog.mtitle=`${title} | ${process.env.APP_NAME}`
    blog.mdesc=stripHtml(body.substring(0,160))['result']
    blog.postedBy=req.user._id
    //categories and Tags Array
    let arrayofCategories = categories && categories.split(',')
    let arrayofTags = tags && tags.split(',')

    if(files.photo){
        if(files.photo.size>10000000){
            return res.status(400).json({
                error:'Image Should Be Less Than 1 Mb'
            });
        }
        blog.photo.data =fs.readFileSync(files.photo.path)
        blog.photo.contentType=files.photo.type
    }
    blog.save((err,result)=>{
        if(err){
              return res.status(400).json({
               error:errorHandler(err)
            });
            
        }
        //Finding And Updating
        Blog.findByIdAndUpdate(result._id,{$push:{categories:arrayofCategories}},{new:true}).exec((err,result)=>{
            if(err){
                 return res.status(400).json({
               error:errorHandler(err)
            });   
            }else{
             Blog.findByIdAndUpdate(result._id,{$push:{tags:arrayofTags}},{new:true}).exec((err,result)=>{
            if(err){
                 return res.status(400).json({
               error:errorHandler(err)
            });   
            }else{
                res.json(result);
            }})
          }
        }) 
    })
  })  
};


exports.list =(req,res)=>{
    Blog.find({}).populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username')
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.read =(req,res)=>{
    const slug =req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username')
    .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt').
    exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(data);
    })
}


exports.remove =(req,res)=>{
    const slug =req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:'Blog Deleted Successfully'
        });
    })
}

exports.listAllBlogsCategoriesTags =(req,res)=>{
    let limit =req.body.limit ? parseInt(req.body.limit) : 10
    let skip = parseInt(req.body.skip) ? parseInt(req.body.skip):0
    let blogs
    let categories
    let tags

    Blog.find({}).populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username profile')
    .sort({'createdAt':-1})
    .skip(skip)
    .limit(limit)
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        blogs =data;
        //Category
        Category.find({}).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        categories=category
        //Tag
        Tag.find({}).exec((err,tag)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        tags=tag
        //return all blogs categories and tags
        res.json({blogs,tags,categories,size:blogs.length})
    })
    })
    })
}



exports.update =(req,res)=>{
  const slug =req.params.slug.toLowerCase()
    Blog.findOne({slug}).exec((err,oldBlog)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
       let form =new formidable.IncomingForm() 
       form.keepExtensions=true;
       form.parse(req,(err,fields,files)=>{
    if(err){
        return res.status(400).json({
            error:'Image Could Not Upload'
        })
    }
    let slugBeforeMerge = oldBlog.slug
       oldBlog=_.merge(oldBlog,fields)
       oldBlog.slug=slugBeforeMerge
       const {desc,body,categories,tags}=fields
     
    if(body){
      oldBlog.excerpt =smartTrim(body,320,'','...')
      oldBlog.desc =stripHtml(body.substring(0,160))['result']
    }
     if(categories){
      oldBlog.categories =categories.split(',')
    }
    if(tags){
      oldBlog.tags =tags.split(',')
    }

    if(files.photo){
        if(files.photo.size>10000000){
            return res.status(400).json({
                error:'Image Should Be Less Than 1 Mb'
            });
        }
        oldBlog.photo.data =fs.readFileSync(files.photo.path)
        oldBlog.photo.contentType=files.photo.type
    }
    oldBlog.save((err,result)=>{
        if(err){
              return res.status(400).json({
               error:errorHandler(err)
            });       
        }
       // result.phot =undefined;
        res.json(result)
 
     })
   })
 }); 
};


exports.photo =(req,res)=>{
    const slug =req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .select('photo').exec((err,blog)=>{
        if(err || !blog){
            return res.status(400).json({
                error:err
            })
        }
        //Change the content type of data
        res.set('Content-Type',blog.photo.contentType);
        return res.send(blog.photo.data)
    })
}


exports.list =(req,res)=>{
    Blog.find({}).populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username')
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.read =(req,res)=>{
    const slug =req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username')
    .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt').
    exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}


exports.remove =(req,res)=>{
    const slug =req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:'Blog Deleted Successfully'
        });
    })
}

exports.listRelated =(req,res)=>{
    let limit =req.body.limit ? parseInt(req.body.limit) : 3
    const {_id,categories}=req.body.blog
    //not including
    Blog.find({_id:{$ne:_id},categories:{$in:categories}})
    .limit(limit)
    .populate('postedBy','_id name profile')
    .select('title slug excerpt postedBy createdAt updatedAt')
    .exec((err,blogs)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        console.log(blogs)
        res.json({blogs})
    })
    }


exports.listSearch =(req,res)=>{
    const {search}=req.query
    if(search){
    Blog.find({$or:[{title:{$regex:search,$options:'i'}},{body:{$regex:search,$options:'i'}}]
     },(err,blogs)=>{
          if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(blogs)
      }).select('-photo -body');
   }
};

exports.listByUser =(req,res)=>{
    User.findOne({username:req.params.username})
    .exec((err,user)=>{
          if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
     let userId =user._id
     Blog.find({postedBy:userId})
    .populate('categories','_id name slug')
    .populate('tags','_id name slug')
    .populate('postedBy','_id name username')
    .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err,data)=>{
          if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
      });
   });
};


    