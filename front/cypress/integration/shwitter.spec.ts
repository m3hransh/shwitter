import {translation} from '../../src/lib/translation'

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Sign in', () => {
    // TODO: Need to read figure out the language
    const lang = 'ir'

    // Get the content of form 
    const form = translation[lang].form

    // Go to the login page
    const login = new RegExp(form.login, 'i')
    cy.findByRole('link', {  name: login}).click()


    // Enter a email address which is registered
    const email = new RegExp(form.email, 'i')
    cy.findByPlaceholderText(email).type('mehran@gmail.com')
    
    // Enter the correct password for the user
    const password = new RegExp(form.password, 'i')
    cy.findByPlaceholderText(password).type('mehran123')

    // Login into home page
    cy.findByRole('button', {  name: login}).click()
    
    // Asserting that we in home page
    cy.url().should('eq', 'http://localhost:3000/')

  })
})
