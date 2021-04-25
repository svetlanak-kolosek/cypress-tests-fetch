const Locators = require("../fixtures/Locators.json")

describe ("Sign Out", ()=>{

    it("Visit Login page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).click()
        cy.get(Locators.SignOut.SignIn).should("be.visible").and("have.value", "Sign in")
    })

    it.only("Login with valid data and Sign out", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).click()
        cy.get(Locators.SignOut.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.get(Locators.SignOut.Email).type("kolosek@mailinator.com")
        cy.get(Locators.SignOut.Password).type("1234test")
        cy.get(Locators.SignOut.SignIn).should('not.be.disabled')
        cy.get(Locators.SignOut.SignIn).click()
        cy.get(Locators.SignOut.SignOut).should("be.visible")
        cy.get(Locators.SignOut.Message).should("be.visible").and("include.text", "Signed in successfully")
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
        cy.get(Locators.SignOut.SignOut).click()
        cy.get(Locators.SignOut.Message).should("be.visible").and("include.text", "Signed out successfully")
        cy.url().should("contains", "https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).should("be.visible")
    })









})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})