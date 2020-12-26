import React, { useState, useEffect } from 'react'
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR,ALL_AUTHORS } from "../queries"
const UpdateAuthor = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    let authors = props.authors
    const [updateAuthor, result] = useMutation(UPDATE_AUTHOR,{
    refetchQueries: [{query:ALL_AUTHORS}]
    })
    useEffect(() => {
        if (result.data && result.data.setAuthor === null) {

            console.log('person not found')
        }
    }, [result.data])
  
    const submit = async (event) => {
        event.preventDefault()
        try {
            updateAuthor({
                variables: { name, setBornTo: parseInt(born) }
            })
        } catch (err) {
            console.log(err)
        }

        setName('')
        setBorn('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
          
          
            <select value={name}  onChange={({ target }) => setName(target.value)}>
                {authors.map(author =>
                    <option key={author.id} value = {author.name} >{author.name}</option>
                    )}
          </select>
                </div>

                <div>
                    Born
          <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>Update author</button>
            </form>
        </div>
    )
}
export default UpdateAuthor