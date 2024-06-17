/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009@yahoo.com.br')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009yahoocombr')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it('verifica número de telefone', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009@yahoo.com.br')
        cy.get('#phone').type('abcdefghij').should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009@yahoo.com.br')
        cy.get('#phone').type('abcdefghij').should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
  })
  