/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Funcionalidade: Catálogo de livros', () => {

    beforeEach(() => {
        cy.visit('catalog.html')
    });

    it('Deve clicar em todos os botões Adicionar a cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
    });

    it('Deve clicar no primeiro botão Adicionar a cesta', () => {
        cy.get('.btn-primary').first().click()
    });

    it('Deve clicar no ultimo botão Adicionar a cesta', () => {
        cy.get('.btn-primary').last().click()
    });

    it('Deve validar mensagem que a cesta de livros esta vazia', () => {
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('h3').should('contain', 'Sua cesta está vazia')
        cy.get('p.text-muted').should('contain', 'Adicione alguns livros à sua cesta para fazer reservas')
    });

    it.only('Deve clicar no nome do livro e direcionar para a tela do livro', () => {
        let observaçao = faker.word.words({ count: { min: 5, max: 10 } })
        let senha = faker.internet.password()
        let telefone = faker.string.numeric(11)
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.contains('A Revolução dos Bichos').click()
        cy.url().should('include', 'book-details')
        cy.get('#add-to-cart-btn').click()
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso')
        cy.get('.btn-outline-info').click()
        cy.get('#checkout-btn').click()
        cy.get('[href="/register.html?redirect=/checkout.html"]').click()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
        cy.get('#password').type(senha)
        cy.get('#confirm-password').type(senha)
        cy.get('#terms-agreement').click()
        cy.get('#register-btn').click()
        cy.get('#user-phone').type(telefone)
        cy.get('#pickup-preference').select('Manhã (8h-12h)')
        cy.get('#general-notes').type(observaçao)
        cy.get('#confirm-reservations-btn.btn.btn-success.btn-lg').click()
    });

});