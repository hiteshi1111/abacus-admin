const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    handle: String, 
    author: String,
    publishedAt: { type: Date, default: Date.now },
    shortDescription: String,
    content: String,
    featuredImage: String,
    bannerImage: String,
    imgTitle: String,
    altText: String,
    metaTitle: String,
    metaDescription: String,
    keywords: String,
});

const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;