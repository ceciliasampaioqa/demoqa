import { qase } from 'cypress-qase-reporter/mocha'

describe('Elements', () => {
  context('Text Box', () => {
    qase(25,
      it('Submit Text Box form with valid data', () => {
        const data_user = {
          firstName: 'Cecilia',
          lastName: 'Sampaio',
          email: 'ceciliasampaio.qa@gmail.com',
          currentAddress: '123 Main Street',
          permanentAddress: '456 Secondary Street'
        }

        cy.gui_fillFormElementsTextBox()

        cy.get('[id="output"]').should('contain', `${data_user.firstName} ` + `${data_user.lastName}`)
          .and('contain', `${data_user.email}`)
          .and('contain', `${data_user.currentAddress}`)
          .and('contain', `${data_user.permanentAddress}`)
      })
    )
  })

  context('Check Box', () => {
    qase(27,
      it('Check multiple checkboxes in the "Check Box" page', () => {
        const expectedWords = [
          'home', 'desktop', 'notes', 'commands', 'documents',
          'workspace', 'react', 'angular', 'veu', 'office',
          'public', 'private', 'classified', 'general',
          'downloads', 'wordFile', 'excelFile'
        ]

        cy.gui_checkingHomeCheckbox()

        cy.get('[id="result"]').should('contain.text', 'You have selected :')
        expectedWords.forEach((word) => {
          cy.get('[id="result"]').should('contain.text', word)
        })
      })
    )
  })

  context('Radio Button', () => {
    beforeEach(() => {
      cy.visit('/radio-button')
    })

    qase(37,
      it('Select "Yes" radio button', () => {
        cy.get('[id="yesRadio"] + label').click()

        cy.contains('You have selected').should('be.visible')
        cy.get('p > span').should('contain', 'Yes').and('be.visible')
      })
    )

    qase(26,
      it('Select "Impressive" radio button', () => {
        cy.get('[id="impressiveRadio"] + label').click()

        cy.contains('You have selected').should('be.visible')
        cy.get('p > span').should('contain', 'Impressive').and('be.visible')
      })
    )
  })
})