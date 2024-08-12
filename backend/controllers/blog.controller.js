const express = require('express');
const router = express.Router();

const BlogService = require('../services/blog.service');

router.post('/', function (req, res) {
    BlogService.getSingleBlog(req.body.handle).then(response => {
        if (response){
            res.status(400).send("Handle already exists");
        }else{
            BlogService.createBlog(req.body).then(response => {
                res.status(200).send(response);    
            }).catch(error => {
                res.status(500).send(error);    
            })
        }  
    }).catch(error => {
        res.status(500).send(error);    
    })
})

router.get('/', function (req, res) {
    BlogService.getBlogs().then(response => {
        res.status(200).send(response);    
    }).catch(error => {
        res.status(500).send(error);    
    })
})

router.get('/', function (req, res) {
    BlogService.getBlogs().then(response => {
        res.status(200).send(response);    
    }).catch(error => {
        res.status(500).send(error);    
    })
})

router.delete('/:id', function (req, res) {
    BlogService.deleteBlog(req.params.id).then(response => {
        res.status(200).send(response);    
    }).catch(error => {
        res.status(500).send(error);    
    })
})

module.exports = router;