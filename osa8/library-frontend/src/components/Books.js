import { useQuery,useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {

  const result = useQuery(ALL_GENRES)
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState(null)
  const [allBooks, allBooksResult] = useLazyQuery(ALL_BOOKS)
  const getBooks = (genre) => {
    if (genre === 'all') {
      allBooks({ variables: { genre: '' } })
    }
    else {
      allBooks({ variables: { genre: genre } })
    }
  }
  console.log(books)
  useEffect(() => {
    if (result.data) {
      setGenres(result.data.allGenres)
    }
  }, [result])
  useEffect(() => {
  
    if (allBooksResult.data) {
      setBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult])

  if (!props.show || !genres) {
    return null
  }

  return (
    <div>
      {books != null ? (
        <div>
          <h2>books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
            </th>
                <th>
                  published
            </th>
              </tr>
              {books.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
          <div>
          </div>
        )}
      <h3>Select genre</h3>
      {genres.map(genre =>

        <button key={genre} onClick={() => getBooks(genre)}>{genre}</button>
      )}
      <button onClick={() => getBooks('all')}>all</button>
    </div>
  )
}

export default Books