import { gql } from "@apollo/client"

export const ALL = gql`
query {
  allBooks {
    title
    published
    author {
      name
    }
    id
  }
  allAuthors {
    name
    born
    bookCount
    id
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