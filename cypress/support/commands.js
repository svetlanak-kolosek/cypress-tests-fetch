// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("Login", () => {
    cy.visit("https://notify.kolosek.com/")
    const loginBtn = ".btn";
    const emailField = "#user_email";
    const passwordField = "#user_password";
    const sign_in = ".button";

    cy.get(loginBtn).eq(0).click()
    cy.get(sign_in).should("be.visible").and("have.value", "Sign in")
    cy.get(emailField).type("kolosek@mailinator.com")
    cy.get(passwordField).type("1234test")
    cy.get(sign_in).click()
    });