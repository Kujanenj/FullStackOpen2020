const { func } = require("prop-types")


describe('Note ', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'test',
            username: 'test',
            password: 'test'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    })
    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.contains('failed')
      })
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('login').click()
    })
    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains("logged in")
    })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#login-button').click()
        })
        it('a new blog can be created', function () {
            cy.get("#blogs_link").click()
            cy.get("#create").click()
            cy.get('#title').type('test')
            cy.get('#author').type('test')
            cy.get('#url').type('test')
            cy.get("#submit_button").click()
        })
        describe("a new blog exists",function(){
            beforeEach(function(){
                cy.get("#blogs_link").click()
                cy.get("#create").click()
                cy.get('#title').type('test')
                cy.get('#author').type('test')
                cy.get('#url').type('test')
                cy.get("#submit_button").click()
            })
            it("Like a blog",function(){
                cy.get("#blogs_link").click()
                cy.get("#test").click()
                cy.get("#vote_button").click()
            })
            it.only("Delete a blog",function(){
                cy.get("#blogs_link").click()
                cy.get("#test").click()
                cy.get("#delete_button").click()
            })
        })
    })
})