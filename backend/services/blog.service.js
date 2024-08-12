const Blog = require("../schemas/blog.schema");

let service = {};
service.createBlog = createBlog;
service.getBlogs = getBlogs;
service.getSingleBlog = getSingleBlog;
service.deleteBlog = deleteBlog;

async function createBlog(body){
    try {
        let newBlog = new Blog(body);
        const blog = await newBlog.save();
        return blog;
    } catch (err) {
        return Promise.reject({error: 'Something went wrong. Try again later!'});
    }
}

async function getBlogs(){
    try {
        const blogs = await Blog.find().sort({ publishedAt: -1 });
        return blogs;
    } catch (err) {
        return Promise.reject({error: 'Unable to fetch all taxes!'});
    }
}

async function getSingleBlog(handle){
    try {
        const blogs = await Blog.findOne({handle: handle});
        return blogs;
    } catch (err) {
        return Promise.reject({error: 'Unable to fetch all taxes!'});
    }
}

async function deleteBlog(id){
    try {
        const blogs = await Blog.deleteOne({_id: id});
        return blogs;
    } catch (err) {
        return Promise.reject({error: 'Unable to fetch all taxes!'});
    }
}

module.exports = service;