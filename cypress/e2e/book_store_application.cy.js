import { qase } from 'cypress-qase-reporter/mocha'

describe('Book Store Application', () => {
  context('Book Store API', () => {
    qase(41,
      it('Get a list of all books', () => {
        cy.api_getAllBooks().then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('books')
          expect(response.body.books).to.be.an('array')
          expect(response.body.books.length).to.be.greaterThan(0)
        })
      })
    )
  })

  context('Book Store API - Authentication', () => {
    qase(43,
      it('Login with valid credentials', () => {
        cy.api_login().then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.userId).to.exist
        })
      })
    )

    qase(44,
      it('Gets data from registered user', () => {
        cy.api_login()

        cy.api_getUser().then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('userId', Cypress.env('user_id'))
          expect(response.body).to.have.property('username', Cypress.env('user_name'))
        })
      })
    )
  })
})
