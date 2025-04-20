import { qase } from 'cypress-qase-reporter/mocha'

describe('Forms', () => {
  context('Practice Form', () => {
    beforeEach(() => {
      cy.visit('/automation-practice-form')
    })

    qase(38,
      it('Submit Practice Form without fill required fields', () => {
        const requiredFieldIds = [
          'firstName',
          'lastName',
          'userNumber'
        ]

        cy.get('[id="submit"]').click()

        requiredFieldIds.forEach((field) => {
          cy.get(`[id="${field}"]`).should('have.attr', 'required')
        })
        cy.get('[type="radio"]').each((radio) => {
          cy.wrap(radio).should('have.attr', 'required')
        })
      })
    )

    qase(35,
      it('Submit Practice Form with valid data', () => {
        cy.gui_fillStudentRegistrationForm().then((data_user) => {

          cy.get('.modal-header').should('contain', 'Thanks for submitting the form')
          cy.get('.modal-body').should('contain', data_user.firstName)
          cy.get('.modal-body').should('contain', data_user.lastName)
          cy.get('.modal-body').should('contain', data_user.email)
          cy.get('.modal-body').should('contain', data_user.phone)
          cy.get('.modal-body').should('contain', data_user.birthDate)
          cy.get('.modal-body').should('contain', data_user.subjects)
          cy.get('.modal-body').should('contain', data_user.hobbies)
          cy.get('.modal-body').should('contain', data_user.picture)
          cy.get('.modal-body').should('contain', data_user.address)
          cy.get('.modal-body').should('contain', data_user.state)
          cy.get('.modal-body').should('contain', data_user.city)
        })
      })
    )
  })
})