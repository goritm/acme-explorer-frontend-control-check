describe('Homepage Initial Tender', () => {
  const managerCreds = {
    email: 'test2@test.com',
    password: '123456'
  };

  it('Visits the trips homepage', () => {
    cy.visit('/');
    cy.contains('ACME Explorer');
  });

  it('logins as a manager', () => {
    cy.byTestId('login-button').click();

    cy.get('#email').type(managerCreds.email);
    cy.get('#password').type(managerCreds.password);
    cy.byTestId('auth-login-button').click();
    cy.contains('ACME Explorer');
    cy.byTestId('user-bar').contains('manager');
    cy.visit('/trips/self');
  });

  // it('goes to the self trips page', () => {
  // });
});
