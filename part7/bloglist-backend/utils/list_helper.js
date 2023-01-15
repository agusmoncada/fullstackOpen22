const dummy = (blog) => {
    return 1
}

const totalLikes = (array) => {
    const likes = (sum, item) => {
        return sum + item.likes
    }

    return array.reduce(likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = (prevBlog, currentBlog) => prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog
    
    return blogs.reduce(mostLikes, {})
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    
    const authorCount = authors.reduce((prev, current) => {
        if (prev[current] === undefined) {
            prev[current] = 1
        } else {
            prev[current] += 1
        }
        return prev
    }, {})

    const mostBlogs = Object.keys(authorCount).reduce((prev, current) => {
        return authorCount[prev] > authorCount[current] ? prev : current
    })

    return {
        author: mostBlogs,
        blogs: authorCount[mostBlogs]
    }
}

const mostLikes = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    authors = [...new Set(authors)]

    let total = new Array(authors.length).fill(0)
    blogs.map(blog =>
        total[authors.indexOf(blog.author)] += blog.likes
    )

    let index = total.indexOf(Math.max(...total))

    return {
        author: authors[index],
        likes: total[index]
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}