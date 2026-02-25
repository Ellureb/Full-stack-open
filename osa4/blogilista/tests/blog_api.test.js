const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id field must be named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)

    const blog = response.body[0]
    assert(blog.id) // löytyy id
    assert.strictEqual(blog._id, undefined) // ei löydy _id
})

test('can add a new blog', async () => {
    const newBlog = {
        title: 'Uusi Blogi',
        author: 'Aapo Aapinen',
        url: 'www.aaponblogi.fi',
        likes: 67,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Uusi Blogi'))
})

test('empty likes is zero likes', async () => {
    const newBlog = {
        title: 'Blogi',
        author: 'B.B.',
        url: 'www.blogi.fi',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async() => {
    const newBlog = {
        author: 'Hilla Malanca',
        url: 'www.hillamalanca.com',
        likes: 2209
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without url is not added', async() => {
    const newBlog = {
        title: 'Luimu-Leilan ja Kiito-Unskin seikkailut',
        author: 'Leila, Unski',
        likes: 1111
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})