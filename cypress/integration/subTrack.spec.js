const Locators = require("../fixtures/Locators.json")

describe ("Submitting tracking", ()=>{

    let successfulAddTaskMess = "Task was successfully created!"
    let successfulSignInMess = "Signed in successfully"



    it("Submit Tracking – public", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SubmitTracking.URL).type("https://www.tehnomanija.rs/")
        cy.get(Locators.SubmitTracking.TaskKeywords).type("frizider")
        cy.get(Locators.SubmitTracking.TaskEmail).type("kolosek@mailinator.com")
        cy.get(Locators.SubmitTracking.Public).click()
        cy.get(Locators.SubmitTracking.Submit).eq(3).click()
        cy.get(Locators.SubmitTracking.Message).should("be.visible").and("include.text", successfulAddTaskMess)
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
        cy.get(Locators.SubmitTracking.SignIn).should("be.visible").and("have.value", "Sign in")
    })

    it("Sign in – public", ()=>{
        cy.visit("https://notify.kolosek.com/users/sign_in")
        cy.get(Locators.SubmitTracking.Email).type("kolosek@mailinator.com")
        cy.get(Locators.SubmitTracking.Password).type("1234test")
        cy.get(Locators.SubmitTracking.SignIn).click()
        cy.get(Locators.SubmitTracking.Message).should("be.visible").and("include.text", successfulSignInMess)
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
        cy.get(Locators.SubmitTracking.NewTask).eq(6).should("be.visible").and("have.value", "+ New Task")
        cy.get(Locators.SubmitTracking.Keyword).should("be.visible").contains("span", "frizider")
    })

    it("Visibility of the public task", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SubmitTracking.PublicTasks).eq(2).click()
        cy.get(Locators.SubmitTracking.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get(Locators.SubmitTracking.Keyword).should("be.visible").contains("span", "frizider")
    })

    it("Submit Tracking – private", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SubmitTracking.URL).type("https://www.tehnomanija.rs/")
        cy.get(Locators.SubmitTracking.TaskKeywords).type("laptop")
        cy.get(Locators.SubmitTracking.TaskEmail).type("kolosek@mailinator.com")
        cy.get(Locators.SubmitTracking.Private).click()
        cy.get(Locators.SubmitTracking.Submit).eq(3).click()
        cy.get(Locators.SubmitTracking.Message).should("be.visible").and("include.text", successfulAddTaskMess)
        cy.url().should("contains", "https://notify.kolosek.com/users/sign_in")
        cy.get(Locators.SubmitTracking.SignIn).should("be.visible").and("have.value", "Sign in")
    })

    it("Sign in – private", ()=>{
        cy.visit("https://notify.kolosek.com/users/sign_in")
        cy.get(Locators.SubmitTracking.Email).type("kolosek@mailinator.com")
        cy.get(Locators.SubmitTracking.Password).type("1234test")
        cy.get(Locators.SubmitTracking.SignIn).click()
        cy.get(Locators.SubmitTracking.Message).should("be.visible").and("include.text", successfulSignInMess)
        cy.url().should("contains", "https://notify.kolosek.com/tasks?page=1")
        cy.get(Locators.SubmitTracking.NewTask).eq(6).should("be.visible").and("have.value", "+ New Task")
        cy.get(Locators.SubmitTracking.Keyword).should("be.visible").contains("span", "laptop")
    })

    it.only("Visibility of the private task in Public tasks", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.SubmitTracking.PublicTasks).eq(2).click()
        cy.get(Locators.SubmitTracking.Title).should("be.visible").and("include.text", "Public users tasks")
        cy.url().should("contains", "https://notify.kolosek.com/public")
        cy.get("span").should("be.visible").and("not.contain", "laptop")
    })

  







})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})