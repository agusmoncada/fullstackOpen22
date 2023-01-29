const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./Models/book')
const Author = require('./Models/author')
const User = require('./Models/user')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRETKEY'

const MONGODB_URI = 'mongodb+srv://agusmonc92:vMxMT33XF2fh7mh@fullstackopen.rnhnfrf.mongodb.net/phoneBook?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log('error connection to mongoDB', error.message))

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User!
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String]
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

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
        throw new AuthenticationError("not authenticated")
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    // console.log('req: ', req.headers, 'auth: ', auth)
    if ( auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      // console.log('decodedToken: ',decodedToken)
      const currentUser = await User.findById(decodedToken.id)
      // console.log('currentUser',currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})