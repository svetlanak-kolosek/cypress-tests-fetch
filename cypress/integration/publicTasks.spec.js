const Locators = require("../fixtures/Locators.json")

describe ("Public Users Tracks", ()=> {

    let successfulSignInMess = "Signed in successfully"



    it("Go to Public users tasks page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
    })

    it("Claim button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Claim).eq(0).click()
        cy.get(Locators.PublicUsersTasks.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
    })

    it("Flag button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Flag).eq(1).click()
        cy.get(Locators.PublicUsersTasks.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
    })

    it("Login and the user's task page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Claim).eq(0).click()
        cy.get(Locators.PublicUsersTasks.SignIn).should("be.visible").and("have.value", "Sign in")
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
        cy.get(Locators.PublicUsersTasks.Email).type("kolosek@mailinator.com")
        cy.get(Locators.PublicUsersTasks.Password).type("1234test")
        cy.get(Locators.PublicUsersTasks.SignIn).click()
        cy.get(Locators.PublicUsersTasks.Message).should("be.visible").and("include.text", successfulSignInMess)
        cy.get(Locators.PublicUsersTasks.NewTask).eq(6).should("be.visible").and("have.value", "+ New Task")
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
    })

    it("Next button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Next).click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(Locators.PublicUsersTasks.Previous).should("be.visible")        
    })

    it("Previous button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Next).click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(Locators.PublicUsersTasks.Previous).should("be.visible") 
        cy.get(Locators.PublicUsersTasks.Previous).click()
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Next).should("be.visible")        
    })

    it("Last button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Last).click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(Locators.PublicUsersTasks.First).should("be.visible")
    })

    it.only("First button", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.PublicUsersTasks.PublicTasks).eq(2).click()
        cy.get(Locators.PublicUsersTasks.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Last).click()
        cy.url().should("contains", "https://notify.kolosek.com/public?page=2")
        cy.get(Locators.PublicUsersTasks.First).should("be.visible")
        cy.get(Locators.PublicUsersTasks.First).click()
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.PublicUsersTasks.Last).should("be.visible")
    })












})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})