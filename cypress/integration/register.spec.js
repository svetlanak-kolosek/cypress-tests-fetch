const Locators = require("../fixtures/Locators.json")

describe ("Registration", ()=>{

    it("Visit Register page", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
    })

    it.only("Register with valid data", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("mail9mail@mail.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).should('not.be.disabled')
        cy.get(Locators.Register.SignUp).click()
        cy.get(".alert").should("be.visible").and("include.text", "Welcome!")
        cy.get(".btn").eq(4).should("be.visible").and("have.text", "Sign out")
        cy.url().should("contains", "https://notify.kolosek.com/tasks")
    })

    it("N -Register without Email", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(".alert").should("be.visible").and("include.text", "Email can't be blank")
    })

    it("N - Register without Password and Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", "Password can't be blank")
    })
   
    it("N - Register with without Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", "Password confirmation doesn't match Password")
    })

    it("N - Register with wrong Password confirmation", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("test1234")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", "Password confirmation doesn't match Password")
    })

    it("Register whit invalid email, using email whitout @", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("testermailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Email).eq(0).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'testermailinator.com' is missing an '@'.")
        })
    })

    it("N - Register with invalid password, using less than 6 characters", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("tester@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", "Password is too short (minimum is 6 characters)")
    })

    it("Register with an already registered email address", ()=>{
        cy.visit("https://notify.kolosek.com/")
        cy.get(Locators.Register.Register).eq(1).click()
        cy.get(Locators.Register.SignUp).should("be.visible").and("have.value", "Sign up")
        cy.get(Locators.Register.Email).eq(0).type("kolosek@mailinator.com")
        cy.get(Locators.Register.Password).eq(1).type("1234test")
        cy.get(Locators.Register.PasswordConf).eq(2).type("1234test")
        cy.get(Locators.Register.SignUp).click()
        cy.get(Locators.Register.Message).should("be.visible").and("include.text", "Email has already been taken")
    })















})

afterEach("Clear cash", ()=>{
    cy.clearLocalStorage()
})