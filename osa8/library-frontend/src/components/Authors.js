
import { useQuery } from '@apollo/client'
import React,{useState,useEffect} from 'react'
import { ALL_AUTHORS } from '../queries'
import UpdateAuthor from './UpdateAuthor'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState(null)
  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])
  if (!props.show || !authors) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token===null ? (
        <div></div>
      ):(
        <UpdateAuthor authors={authors}></UpdateAuthor>
      )}
    </div>
  )
}

export default Authors
