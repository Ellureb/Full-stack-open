const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fave, blog) => {
        return blog.likes > fave.likes ? blog : fave
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}