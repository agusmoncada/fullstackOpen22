import { gql } from "@apollo/client"

export const ALL = gql`
query($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    published
    author {
      name
    }
    id
    genres
  }
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
export const GENRES = gql`
query {
  allBooks {
    genres
  }
}
`
export const ME = gql`
query {
  me {
    favouriteGenre
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
  }
}
`

export const BOOK_ADDED= gql`
subscription {
  bookAdded {
    title
    published
    id
    genres
    author {
      name
    }
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`