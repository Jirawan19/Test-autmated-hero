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

Cypress.Commands.add("login", (username, password) => {
    cy.visit("https://herodemo.autopair.co/")
    // cy.get('form > .col-sm-12 > :nth-child(1) > label').should("contain.text", "ชื่อผู้ใช้งาน")
    cy.get('#username').click().type(username)
    // cy.get('form > .col-sm-12 > :nth-child(2) > label').should("contain.text", "รหัสผ่าน")
    cy.get('#password').click().type(password)
    cy.get('.btn-global').click()
})

Cypress.Commands.add("logOut", () => {
    cy.get('#dropdownMenuOffset').click()
    cy.get('.dropdown-menu > :nth-child(2)').click()

})
Cypress.Commands.add("loginSupplier", (username, password) => {
    cy.visit("https://herodemo.autopair.co/")
    // cy.get('form > .col-sm-12 > :nth-child(1) > label').should("contain.text", "ชื่อผู้ใช้งาน")
    cy.get('#username').click().type(username)
    // cy.get('form > .col-sm-12 > :nth-child(2) > label').should("contain.text", "รหัสผ่าน")
    cy.get('#password').click().type(password)
    cy.get('.btn-global').click()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})