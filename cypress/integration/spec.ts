describe('Homepage Initial Tender', () => {
  it('Visits the trips homepage', () => {
    cy.visit('/');
    cy.contains('ACME Explorer');
  });

  it('logins as a manager', () => {
    cy.get('[data-testid="login-button"]').click();

    cy.get('#email').type('test2@test.com');
    cy.get('#password').type('123456');
    cy.get('[data-testid="auth-login-button"]').click();
    cy.contains('ACME Explorer');
    cy.get('[data-testid="user-bar"]').contains('manager');
    cy.visit('/trips/self');
  });

  // it('goes to the self trips page', () => {
  // });
});
