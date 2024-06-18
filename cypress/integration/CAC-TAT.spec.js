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
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009yahoocombr')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('verifica número de telefone', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009@yahoo.com.br')
        cy.get('#phone').type('abcdefghij').should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type("Winter")
        cy.get('#email').type('daniel_winter2009@yahoo.com.br')
        cy.get('#phone').type('abcdefghij').should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Daniel').should('have.value', 'Daniel').clear().should('have.value', '')
        cy.get('#lastName').type("Winter").should('have.value', 'Winter').clear().should('have.value', '')
        cy.get('#email').type('daniel_winter2009@yahoo.com.br').should('have.value', 'daniel_winter2009@yahoo.com.br').clear().should('have.value', '')
        cy.get('#phone').type('123123123').should('have.value', '123123123').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('eleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it.only('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
  })
  