import { useState } from 'react'

const Blog = ({ blog, handleLikeClick, handleRemove }) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div style={{
      paddingTop: 2,
      paddingLeft: 10,
      border: '2px solid rgb(137, 46, 173)',
    }}>
      {blog.title} - {blog.author}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'show less' : 'show more'}</button>
      {showInfo && (
        <div>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div>
            added by: {blog.user.name}
          </div>
          <div>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog