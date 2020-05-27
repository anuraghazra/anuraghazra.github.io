/// <reference types="Cypress" />
describe('Contact Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not submit form with invalid inputs', () => {
    cy.visit('/#contact');

    cy.get('[name="_replyto"]')
      .focus()
      .type('not an email')
      .should('have.class', 'invalid');
    cy.get('[name="name"]')
      .focus()
      .type(' ')
      .should('have.class', 'invalid');
    cy.get('[name="message"]')
      .focus()
      .type('>><<')
      .should('have.class', 'invalid');
    cy.findByText(/submit/i)
      .should('have.attr', 'disabled')
      .url()
      .should('eq', 'http://localhost:8000/#contact');
  });
  it('should submit form with valid inputs', () => {
    cy.visit('/#contact');

    cy.get('[name="_replyto"]')
      .focus()
      .type('myemail@gmail.com')
      .should('not.have.class', 'invalid');
    cy.get('[name="name"]')
      .focus()
      .type('Cypress testing')
      .should('not.have.class', 'invalid');
    cy.get('[name="message"]')
      .focus()
      .type('Hello From Cypress')
      .should('not.have.class', 'invalid');
  });
});
