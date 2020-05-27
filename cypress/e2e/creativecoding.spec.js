/// <reference types="Cypress" />
describe('Creative Coding Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check the creative coding section', () => {
    cy.findByText(/creative coding/, { selector: 'a' })
      .click()
      .get('#creative-coding')
      .within(() => {
        cy.get('.gatsby-image-wrapper')
          .get('img')
          .should('exist');
        cy.get('h4').should('exist');
        cy.findAllByLabelText(/Live Demo/i).should('have.attr', 'href');
        cy.findAllByLabelText(/Source Code/i).should('have.attr', 'href');
      });
  });
});
