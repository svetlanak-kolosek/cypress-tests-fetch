const Locators = require("../fixtures/Locators.json")

describe ("New Task", ()=>{

    let successfullLoginMess = "Signed in successfully"


    beforeEach (()=> {
        cy.Login()
        cy.get(Locators.NewTask.SignOut).should("be.visible")
        cy.get(Locators.NewTask.Message).should("be.visible").and("include.text", successfullLoginMess)
        cy.url().should("contains", "https://notify.kolosek.com/tasks?")
});

    it.only("Creating the New Task", ()=>{
        cy.get(Locators.NewTask.Task).eq(6).click()
        cy.get(Locators.NewTask.URL).type("https://www.tehnomanija.rs/")
        cy.get(Locators.NewTask.Keyword).type("tastatura")
        cy.get(Locators.NewTask.Private).click()
        cy.get(Locators.NewTask.CreateTask).eq(6).click()
        cy.url().should("contains", "https://notify.kolosek.com/tasks")
        cy.get(Locators.NewTask.Keywords).should("be.visible").contains("span", "tastatura")
    })

    it("Task Off button", ()=>{
        cy.get(Locators.NewTask.On).eq(0).click()
        cy.get(Locators.NewTask.Off).eq(0).should("be.visible")
    })

    it("Task On button", ()=>{
        cy.get(Locators.NewTask.Off).eq(0).click()
        cy.reload()
        cy.get(Locators.NewTask.On).eq(0).should("be.visible")
    })

    it.only("Delete button", ()=>{
        cy.get(Locators.NewTask.Delete).eq(0).click()
        cy.on(Locators.NewTask.AlertMessage, (str) => {
            expect(str).to.equal("Are you sure?")
          })
        cy.get("span").eq(0).should("be.visible").and("not.contain", "tastatura")
    })







})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})