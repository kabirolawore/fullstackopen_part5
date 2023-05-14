describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'olawore',
      username: 'super',
      password: 'super',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    // cy.contains('Log in to Application');
    // cy.contains('username');
    // cy.contains('password');
    cy.get('html')
      .should('contain', 'Log in to Application')
      .and('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login');
  });
});
