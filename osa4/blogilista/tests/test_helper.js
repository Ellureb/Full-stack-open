const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'SipsiHullu',
        author: 'Estrella Taffel',
        url: 'www.sipsihullu.fi',
        likes: 243,
    },
    {
        title: 'Bellan Blogi',
        author: 'Bella Bloggaaja',
        url: 'www.blogijee.com',
        likes: 5,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'nonexistingid', author: 'no author', url: 'no.com', likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}