const Locators = require("../fixtures/Locators.json")

describe ("Public Users Tracks", ()=> {

    it("Go to Public users tasks page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
    })

    it("Claim button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".button_to").eq(0).click()
        cy.get(".button").should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
    })

    it("Flag button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".button_to").eq(1).click()
        cy.get(".button").should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
    })

    it("Login and the user's task page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".button_to").eq(0).click()
        cy.get(".button").should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
        cy.get("#user_email").type("kolosek@mailinator.com")
        cy.get("#user_password").type("1234test")
        cy.get(".button").click()
        cy.get(".alert").should("be.visible").and("include.text", "Signed in successfully")
        cy.get(".btn").eq(6).should("be.visible").and("have.value", "+ New Task")
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
    })

    it("Next button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".next").click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(".prev").should("be.visible")        
    })

    it("Previous button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".next").click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(".prev").should("be.visible") 
        cy.get(".prev").click()
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".next").should("be.visible")        
    })

    it("Last button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".last").click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(".first").should("be.visible")
    })

    it.only("First button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(".btn").eq(2).click()
        cy.get(".flex-column").should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".last").click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(".first").should("be.visible")
        cy.get(".first").click()
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(".last").should("be.visible")
    })












})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})