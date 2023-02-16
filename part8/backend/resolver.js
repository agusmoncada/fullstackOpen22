const { PubSub } = require('graphql-subscriptions')
const JWT_SECRET = 'SECRETKEY'
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./Models/book')
const Author = require('./Models/author')
const User = require('./Models/user')

const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, { author, genre }) => {
        if (author && genre) {
            const authorID = await Author.findOne({ name: author }).select('_id')
            return Book.find({ author: authorID, genre: genre }).populate('author')
        }
        if (genre) {
            return Book.find({ genres: genre }).populate('author')
        }
        if (author) {
          const authorID = await Author.findOne({ name: author }).select('_id')
          return Book.find({ author: authorID }).populate('author')
        }
        return Book.find({}).populate('author')
      },
      allAuthors: async (root, args) => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    }, 
    Author: {
      bookCount: async (root, args) => {
        const author = root.id
        const books = await Book.find({}).populate('author')
        const count = books.filter(b => b.author.id === author)
        return count.length
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if(!currentUser){
          throw new GraphQLError("not authenticated")
        }
        const author = await Author.findOne({ name: args.author }).select('_id')
        if(!author) {
          const author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author })
        try {
          await book.save()
        }catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args, })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, { currentUser }) => {
        if(!currentUser){
          throw new AuthenticationError("not authenticated")
        }
        const author = await Author.findOne({ name: args.name })
        if (!author) {
            return null
        }
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
  
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'SECRET') {
          throw new UserInputError('wrong credentials')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
  }

  module.exports = resolvers