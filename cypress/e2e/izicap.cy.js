describe('izicap.cy.js', () => {
  before(() => {
    cy.clearCookies();
    cy.visit('https://ismaestro.github.io/angular-example-app/');
    cy.url().should('include','https://ismaestro.github.io/angular-example-app/');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('accessToken','refreshToken');
  })

  it('should visit homepage', () => {
    cy.get('.header__title').should('be.visible').contains('Heroes published');
    cy.get('.mat-card').should('be.visible');
    cy.get('[href="/angular-example-app/auth/sign-up"]').should('be.visible').click();
  })

  it('register on the site', () => {
    cy.get('.signup--form__header-title').should('be.visible').contains('Give it a try!');
    cy.get('#mat-input-1').should('be.visible').type('firstnameQA').should('have.value', 'firstnameQA');
    cy.get('#mat-input-2').should('be.visible').type('lastnameQA').should('have.value', 'lastnameQA');
    cy.get('#mat-input-3').should('be.visible').type('lastnameQA@gmail.com').should('have.value', 'lastnameQA@gmail.com');
    cy.get('#mat-input-4').should('be.visible').type('testqa12Test').should('have.value', 'testqa12Test');
    cy.get('#mat-hint-0').should('be.visible').contains('Must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number');
    cy.get(':nth-child(5) > .mat-focus-indicator').should('be.visible').click();
    cy.url().should('include','https://ismaestro.github.io/angular-example-app/auth/log-in');
    cy.get('.mat-simple-snackbar').should('be.visible').contains('Cool! Now try to log in!');

  })

  it('Login with the created user ', () => {
    cy.get('.login--form__header-title').should('be.visible').contains('Try to log in!');
    cy.get('#mat-input-5').should('be.visible').type('lastnameQA@gmail.com').should('have.value', 'lastnameQA@gmail.com');
    cy.get('#mat-input-6').should('be.visible').type('testqa12Test').should('have.value', 'testqa12Test');
    cy.get('#mat-hint-1').should('be.visible').contains('Must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number');
    cy.get(':nth-child(3) > .mat-focus-indicator').should('be.visible').click();
    cy.url().should('include', 'https://ismaestro.github.io/angular-example-app/hero/my-heroes')
    cy.get('.mat-simple-snack-bar-content').should('be.visible').contains(`Nice! Let's create some heroes`);
  })
  
  it('create a new hero', () => {
    cy.get('#left > .header__title').should('be.visible').contains('My heroes');
    cy.get('#right > :nth-child(1)').should('be.visible').contains('Create a hero');
    cy.get('.my-heroes__no-heroes--message').should('be.visible').contains('No heroes yet, try to create one in the right side!');
    cy.get('#mat-input-7').should('be.visible').type('Namehero12345').should('have.value', 'Namehero12345');
    cy.get('#mat-input-8').should('be.visible').type('AlterEgohero12345').should('have.value', 'AlterEgohero12345');
    cy.get('#right >> form > button').should('be.visible').click();
    cy.get('.mat-simple-snack-bar-content').should('be.visible').contains('Hero created');

  })

  it('delete a hero', () => {
    cy.get('.mat-list-item-content').should('be.visible').contains('AlterEgohero12345');
    cy.get('.mat-list-item-content').should('be.visible').contains('Namehero12345');
    cy.get('.hero-actions > .mat-icon').should('be.visible').click();
    cy.get(`[class="mat-dialog-title"]`).should('be.visible').contains('Delete hero')
    cy.get(`[class="mat-dialog-content"]`).should('be.visible').contains('Are you sure?')
    cy.get(`[aria-label="no button"]`).should('be.visible').contains('No');
    cy.get(`[aria-label="yes button"]`).should('be.visible').contains('Yes').click();
  })

  it('log out user', () => {
    cy.get('body > app-root > div > app-header > header > nav > div > div:nth-child(1) > a:nth-child(3)').should('be.visible').contains('Log out').click();
    cy.get('[href="/angular-example-app/auth/log-in"]').should('be.visible').contains('Log In');
    cy.get('.header__title').should('be.visible').contains('Heroes published')
  })
})