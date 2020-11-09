const express =require('express');
const { requireSignin, adminMiddleware,authMiddleware, canupdateDeleteBlog } = require('../controllers/auth');
const router =express.Router();
const {create,listByUser,photo,listSearch,list,listRelated,listAllBlogsCategoriesTags,read,remove,update} = require('../controllers/blog');
router.post('/blog',requireSignin,adminMiddleware,create);
router.get('/blogs',list);
router.post('/blogs-categories-tags',listAllBlogsCategoriesTags)
router.get('/blog/:slug',read);
router.delete('/blog/:slug',requireSignin,adminMiddleware,remove);
router.put('/blog/:slug',requireSignin,adminMiddleware,update);
router.get('/blog/photo/:slug',photo)
router.post('/blogs/related',listRelated)
router.get('/blogs/search',listSearch)

//auth user blogcrud

router.post('/user/blog',requireSignin,authMiddleware,create);
router.delete('/user/blog/:slug',requireSignin,authMiddleware,canupdateDeleteBlog,remove);
router.put('/user/blog/:slug',requireSignin,authMiddleware,canupdateDeleteBlog,update);
router.get('/:username/blogs',listByUser)

module.exports =router;