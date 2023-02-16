const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')
const User = require('./Models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRETKEY'
const typeDefs = require('./schema')
const resolvers = require('./resolver')
const MONGODB_URI = 'mongodb+srv://agusmonc92:vMxMT33XF2fh7mh@fullstackopen.rnhnfrf.mongodb.net/phoneBook?retryWrites=true&w=majority'
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log('error connection to mongoDB', error.message))



const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path:'/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        //console.log(req.headers.authorization);
        const auth = req ? req.headers.authorization : null
        //console.log(auth.substring(7));
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
          //console.log('decoded',decodedToken);
          const currentUser = await User.findById(decodedToken.id)
          //console.log('currentUser Index',currentUser)
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()

/*const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    // console.log('req: ', req.headers, 'auth: ', auth)
    if ( auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      // console.log('decodedToken: ',decodedToken)
      const currentUser = await User.findById(decodedToken.id)
      console.log('currentUser',currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})*/