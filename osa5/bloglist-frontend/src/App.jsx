import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setMessage(`A new blog added: ${returnedBlog.title} by ${returnedBlog.author || 'unknown author'}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Error adding blog: ${error.response?.data?.error || 'unknown error'}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(`Error logging in: ${error.response?.data?.error || 'unknown error'}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      <h2>Bloglist</h2>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </>
  )

  const blogForm = () => (
    <>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
          </label>
        </div>
        <button type='submit'>save</button>
      </form>
    </>
  )

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={errorMessage} type="error" />
      <Notification message={message} type="success" />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogList()}
        </div>
      )}

    </div>
  )
}

export default App