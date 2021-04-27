const Locators = require("../fixtures/Locators.json")

describe ("Sign Out", ()=>{

    let successfulLoginMess = "Signed in successfully"
    let successfulSignoutMess = "Signed out successfully"



    it("Visit Login page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).click()
        cy.get(Locators.SignOut.SignIn).should("be.visible").and("have.value", "Sign in")
    })

    it("Login with valid data", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).click()
        cy.get(Locators.SignOut.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.get(Locators.SignOut.Email).type("kolosek@mailinator.com")
        cy.get(Locators.SignOut.Password).type("1234test")
        cy.get(Locators.SignOut.SignIn).should('not.be.disabled')
        cy.get(Locators.SignOut.SignIn).click()
        cy.get(Locators.SignOut.LogOut).should("be.visible")
        cy.get(Locators.SignOut.Message).should("be.visible").and("include.text", successfulLoginMess)
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
    })

    it.only("Sign Out", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).click()
        cy.get(Locators.SignOut.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.get(Locators.SignOut.Email).type("kolosek@mailinator.com")
        cy.get(Locators.SignOut.Password).type("1234test")
        cy.get(Locators.SignOut.SignIn).should('not.be.disabled')
        cy.get(Locators.SignOut.SignIn).click()
        cy.get(Locators.SignOut.LogOut).should("be.visible")
        cy.get(Locators.SignOut.Message).should("be.visible").and("include.text", successfulLoginMess)
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
        cy.get(Locators.SignOut.LogOut).click()
        cy.get(Locators.SignOut.Message).should("be.visible").and("include.text", successfulSignoutMess)
        cy.url().should("contains", "https://notify.kolosek.com/")
        cy.get(Locators.SignOut.Login).eq(0).should("be.visible")
    })








})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})