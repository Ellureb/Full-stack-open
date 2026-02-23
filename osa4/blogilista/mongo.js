const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://elinatoivonen_db_user:${password}@cluster0.ouyveva.mongodb.net/testBlogilista?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "SipsiHullu",
    author: "Estrella Taffel",
    url: "www.sipsihullu.fi",
    likes: 243,
})

const blog2 = new Blog({
    title: "Bellan Blogi",
    author: "Bella Bloggaaja",
    url: "www.blogijee.com",
    likes: 5,
})

Promise.all([
    blog.save(),
    blog2.save()
]).then(results => {
    console.log('blogs saved!')
    mongoose.connection.close()
})