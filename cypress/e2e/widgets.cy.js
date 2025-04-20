import { qase } from 'cypress-qase-reporter/mocha'

describe('Widgets', () => {
  context('Progress Bar', () => {
    qase(40,
      it('Check Progress Bar progress, completion and reset', () => {
        cy.visit('/progress-bar')
        cy.clock()

        cy.get('[id="startStopButton"]').click()

        cy.tick(10000)
        cy.get('[id="progressBar"] [role="progressbar"]').should('have.attr', 'aria-valuenow', '100')

        cy.get('[id="resetButton"]').click()

        cy.get('[id="progressBar"] [role="progressbar"]').should('have.attr', 'aria-valuenow', '0')
      })
    )
  })
})