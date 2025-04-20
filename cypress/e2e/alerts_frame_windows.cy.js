import { faker } from '@faker-js/faker'
import { qase } from 'cypress-qase-reporter/mocha'

describe('Alerts, Frames & Windows', () => {
  context('Browser Windows', () => {
    beforeEach(() => {
      cy.visit('/browser-windows')
    })
    qase(32,
      it('Open new tab with content', () => {
        cy.gui_validateNewTabOrWindowContent('[id="tabButton"]')

        cy.contains('This is a sample page').should('be.visible')
      })
    )

    qase(33,
      it('Open new window with content', () => {
        cy.gui_validateNewTabOrWindowContent('[id="windowButton"]')

        cy.contains('This is a sample page').should('be.visible')
      })
    )
  })

  context('Alerts', () => {
    beforeEach(() => {
      cy.visit('/alerts')
    })

    qase(28,
      it('Handle immediate alert on button click', () => {
        cy.get('[id="alertButton"]').click()

        cy.on('window:alert', (text) => {
          expect(text).to.equal('You clicked a button')
        })
      })
    )

    qase(29,
      it('Handle delayed alert after 5 seconds', () => {
        cy.clock()

        cy.get('[id="timerAlertButton"]').click()

        cy.tick(5000)

        cy.on('window:alert', (text) => {
          expect(text).to.equal('This alert appeared after 5 seconds')
        })
      })
    )

    qase(30,
      it('Handle "OK" on confirm box on button click', () => {
        cy.on('window:confirm', (text) => {
          expect(text).to.equal('Do you confirm action?')
          return true
        })

        cy.get('[id="confirmButton"]').click()

        cy.contains('You selected Ok').should('be.visible')
      })
    )

    qase(39,
      it('Handle "Cancel" on confirm box on button click', () => {
        cy.on('window:confirm', (text) => {
          expect(text).to.equal('Do you confirm action?')
          return false
        })

        cy.get('[id="confirmButton"]').click()

        cy.contains('You selected Cancel').should('be.visible')
      })
    )

    qase(31,
      it('Handle prompt alert with text input', () => {
        const name = faker.person.firstName()

        cy.window().then((win) => {
          cy.stub(win, 'prompt').returns(name)
        })

        cy.get('[id="promtButton"]').click()

        cy.contains(`You entered ${name}`).should('be.visible')
      })
    )
  })
})