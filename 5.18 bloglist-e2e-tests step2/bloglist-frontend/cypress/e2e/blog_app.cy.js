describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'kabir',
      username: 'admin',
      password: 'admin',
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

  describe('Login', function () {
    //
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();

      cy.contains('logout');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
