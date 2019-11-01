/// <reference types="Cypress" />
describe("Project Section", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('should check the project\'s and case-studies', () => {
    cy.findByText(/projects/, { selector: 'a' }).click()

    cy.findAllByText(/case study/i, { selector: 'a' }).first()
      .click()
      .get('.case__title').should('exist')
      .findByText(/Verly Range Slider/, { selector: 'h1' })
      .findByText(/Share on/i, { selector: 'h4' })

  })
})