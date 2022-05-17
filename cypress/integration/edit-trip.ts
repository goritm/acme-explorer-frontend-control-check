describe('Edit Trip e2e', () => {
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
    cy.saveLocalStorage();
  });

  it('edits first self trip', () => {
    const titleText = 'hello from cypress :)';
    cy.byTestId('self-trip-card').first().click();
    cy.byTestId('edit-trip-button').click();

    cy.restoreLocalStorage();
    cy.get('#title').clear().type(titleText);
    cy.byTestId('submit-edit-button').click();

    cy.wait(1000);

    cy.contains(titleText);
    cy.visit('/trips/self');
    cy.byTestId('self-trip-card').first().contains(titleText);
  });
});
