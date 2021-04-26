const Locators = require("../fixtures/Locators.json")

describe ("Registration", ()=>{

    let successfulRegistrationMess = "Welcome! You have signed up successfully."
    let blankEmailMess = "Email can't be blank"
    let blankPasswordMess = "Password can't be blank"
    let passwordConfMess = "Password confirmation doesn't match Password"
    let emailWithoutMonkey = "Please include an '@' in the email address. 'testermailinator.com' is missing an '@'."
    let shortPasswordMess = "Password is too short (minimum is 6 characters)"
    let existingEmailMess = "Email has already been taken"



    it("Visit Register page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
    })

    it("Register with valid data", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("mail369mail@mail.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).should('not.be.disabled')
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", successfulRegistrationMess)
        cy.get(Locators.Register.Submit).eq(4).should("be.visible").and("have.text", "Sign out")
        cy.url().should("contains", "https://notify.kolosek.com/tasks")
    })

    it("N -Register without Email", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", blankEmailMess)
    })

    it("N - Register without Password and Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", blankPasswordMess)
    })
   
    it("N - Register with without Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", passwordConfMess)
    })

    it("N - Register with wrong Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("test1234")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", passwordConfMess)
    })

    it("Register whit invalid email, using email whitout @", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("testermailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Email).eq(0).then(($input)=>{
            expect($input[0].validationMessage).to.eq(emailWithoutMonkey)
        })
    })

    it("N - Register with invalid password, using less than 6 characters", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", shortPasswordMess)
    })

    it.only("Register with an already registered email address", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Submit).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("kolosek@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", existingEmailMess)
    })















})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})