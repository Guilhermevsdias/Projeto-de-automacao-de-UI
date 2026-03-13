/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Funcionalidade: Testes de UI', () => {

    beforeEach(() => {
        cy.visit("index.html")
    });

    it('Deve preencher formulário de contato com sucesso', () => {
        let mensagem = faker.word.words({ count: { min: 5, max: 10 } })
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('[name="name"]').type(nome)
        cy.get('[name="email"]').type(email)
        cy.get('[name="subject"]').select("Sugestões")
        cy.get('[name="message"]').type(mensagem)
        cy.get('#btn-submit').click()
        //Resultado esperado
        cy.contains("Contato enviado com sucesso").should("exist")
    });

    it('Deve validar mensagem de erro ao enviar sem preencher nome', () => {
        let mensagem = faker.word.words({ count: { min: 5, max: 10 } })
        let email = faker.internet.email()
        cy.get('[name="name"]').clear()
        cy.get('[name="email"]').type(email)
        cy.get('[name="subject"]').select("Sugestões")
        cy.get('[name="message"]').type(mensagem)
        cy.get('#btn-submit').click()
        //Resultado esperado
        cy.get('#alert-container').should("contain", "Por favor, preencha o campo Nome")

    });

    it('Deve validar mensagem de erro ao enviar sem preencher email', () => {
        let mensagem = faker.word.words({ count: { min: 5, max: 10 } })
        let nome = faker.person.fullName()
        cy.get('[name="name"]').type(nome)
        cy.get('[name="email"]').clear()
        cy.get('[name="subject"]').select("Parcerias")
        cy.get('[name="message"]').type(mensagem)
        cy.get('#btn-submit').click()
        //Resultado esperado
        cy.get('#alert-container').should("contain", "Por favor, preencha o campo E-mail")
    });

    it('Deve validar mensagem de erro ao enviar sem selecionar o assunto', () => {
        let mensagem = faker.word.words({ count: { min: 5, max: 10 } })
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('[name="name"]').type(nome)
        cy.get('[name="email"]').type(email)
        cy.get('[name="message"]').type(mensagem)
        cy.get('#btn-submit').click()
        //Resultado esperado
        cy.get('#alert-container').should("contain", "Por favor, selecione o Assunto")
    });

    it('Deve validar mensagem de erro ao enviar sem preencher a mensagem', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('[name="name"]').type(nome)
        cy.get('[name="email"]').type(email)
        cy.get('[name="subject"]').select("Dúvidas Gerais")
        cy.get('[name="message"]').clear()
        cy.get('#btn-submit').click()
        //Resultado esperado
        cy.get('#alert-container').should("contain", "Por favor, escreva sua Mensagem")
    });







});