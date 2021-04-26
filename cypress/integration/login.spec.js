const Locators = require("../fixtures/Locators.json")

describe ("Login", ()=>{

    let successfulLoginMess = "Signed in successfully"
    let invalidEmailMess = "Invalid Email"
    let emailWithoutMonkey = "Please include an '@' in the email address. 'kolosekmailinator.com' is missing an '@'."
    let invalidPasswordMess = "Invalid Email or password"
    let shortPasswordMess = "Invalid Email or password"



it("Visit Login page", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
})

it("Login with valid data", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosek@mailinator.com")
    cy.get(Locators.Login.Password).type("1234test")
    cy.get(Locators.Login.SignIn).should('not.be.disabled')
    cy.get(Locators.Login.SignIn).should("exist").click()
    cy.get(Locators.Login.SignOut).should("be.visible")
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", successfulLoginMess)
    cy.url().should("contains", "https://notify.kolosek.com/tasks?")
})

it("N-Login without email", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Password).type("1234test")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", invalidEmailMess)
})

it("N-Login with invalid email", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosek@mail.com")
    cy.get(Locators.Login.Password).type("1234test")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", invalidEmailMess)
})

it("N-Login whit invalid email, using email without @", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosekmailinator.com")
    cy.get(Locators.Login.Password).type("1234test")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Email).eq(0).then(($input)=>{
        expect($input[0].validationMessage).to.eq(emailWithoutMonkey)
    })
})

it("N-Login without password", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosek@mailinator.com")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", invalidPasswordMess)
})

it("N-Login with invalid password", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosek@mailinator.com")
    cy.get(Locators.Login.Password).type("123456")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", invalidPasswordMess)
})

it.only("N-Login with invalid password, using less than 6 characters", ()=>{
    cy.visit("https://notify.kolosek.com/")
    cy.get(Locators.Login.Submit).eq(0).click()
    cy.get(Locators.Login.SignIn).should("be.visible").and("have.value", "Sign in")
    cy.get(Locators.Login.Email).type("kolosek@mailinator.com")
    cy.get(Locators.Login.Password).type("1234")
    cy.get(Locators.Login.SignIn).click()
    cy.get(Locators.Login.Message).should("be.visible").and("include.text", shortPasswordMess)
})













})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})