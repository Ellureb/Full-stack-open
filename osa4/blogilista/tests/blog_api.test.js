const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "SipsiHullu",
        author: "Estrella Taffel",
        url: "www.sipsihullu.fi",
        likes: 243,
    },
    {
        title: "Bellan Blogi",
        author: "Bella Bloggaaja",
        url: "www.blogijee.com",
        likes: 5,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id field must be named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    const blog = response.body[0]
    assert(blog.id) // löytyy id
    assert.strictEqual(blog._id, undefined) // ei löydy _id
})

after(async () => {
    await mongoose.connection.close()
})