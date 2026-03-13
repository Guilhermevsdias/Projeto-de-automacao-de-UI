/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => { 

    beforeEach(() => {
        cy.visit("register.html")
    });

    it('Deve fazer cadastro com sucesso, usando faker', () => {
        let senha = faker.internet.password()
        let telefone = faker.string.numeric(11)
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
        cy.get('#password').type(senha)
        cy.get('#confirm-password').type(senha)
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should("include", "dashboard")

    });

    it('Deve validar mensagem de alerta pois as senhas não coincidem, usando faker', () => {
        let senhadif = faker.internet.password({ length: 20 })
        let senha = faker.internet.password()
        let telefone = faker.string.numeric(11)
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
        cy.get('#password').type(senha)
        cy.get('#confirm-password').type(senhadif)
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.get(':nth-child(5) > .invalid-feedback')

    });

    })