
import React, { useState,useEffect } from 'react'
import { useApolloClient,useSubscription } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { BOOK_ADDED } from './queries';
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

    useEffect(() => {
    const token = localStorage.getItem('phonebookToken')
    if ( token ) {
      setToken(token)
    }
  }, [])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useSubscription(BOOK_ADDED,{
    onSubscriptionData : ({subscriptionData})=>{
      window.alert("Book added!")
    }
  })
  //Aika gona ratkasu imo. Vois korjailla joskus
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          token={token}
        />

        <Books
          show={page === 'books'}
        />
        <LoginForm
        show={page === 'login'}
        setToken={setToken}>

        </LoginForm>
      </div>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App