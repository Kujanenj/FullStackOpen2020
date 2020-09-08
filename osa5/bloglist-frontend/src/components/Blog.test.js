import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'testAuthor',
    title : 'testTitle',
    url : 'testUrl',
    likes: 2,
    user : {
      username:'test'
    }
  }
  const testUser = {
    username: 'test'
  }
  const component = render(
    <Blog blog = {blog} loggedUser={testUser}></Blog>
  )
component.debug()
  expect(component.container).toHaveTextContent(
    'author'
  )
  expect(component.container).toHaveTextContent(
    'blogTitle'
  )
  expect(component.container).toHaveTextContent(
      "likes"
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    "blogTitle"
  )
})