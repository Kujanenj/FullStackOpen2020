import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name 
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `
export const ALL_BOOKS = gql`
query allBooks($genre: String){
    allBooks(genre: $genre) { 
      title 
      author{
        name
      }
      published 
    }
  }
  `
  export const ALL_GENRES = gql`
query {
    allGenres  
  }
  `
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!){
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
    }
  }
  `
export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
      ){
        id
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