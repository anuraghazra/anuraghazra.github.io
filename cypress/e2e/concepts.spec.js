/// <reference types="Cypress" />
describe('Concept Section', () => {
  beforeEach(() => {
    cy.visit('/#concepts');
  });

  it('should have title, img, and link', () => {
    cy.get('#concepts').within(() => {
      cy.get('.gatsby-image-wrapper')
        .get('img')
        .should('exist');
      cy.get('.ccard__footer')
        .should('exist')
        .get('p')
        .should('exist');
      cy.findAllByLabelText(/Dribble Shot/i).should('have.attr', 'href');
    });
  });

  it('should check the lightbox behaviour', () => {
    cy.findByText(/DevGuard/i, { selector: 'p' })
      .parent()
      .parent()
      .first()
      .click();
    cy.findByTestId('lightbox')
      .should('be.visible')
      .click(-50, -50, { force: true })
      .should('not.exist');
  });
});
