describe('Burrito User Flow', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {
      method: 'GET',
      fixture: '../fixtures/burritoGET.json'
    })
    cy.visit('http://localhost:3000/')
  })

  it('When a user visits the page, they can view the page title and the existing orders', () => {
    cy.get('h1').should('contain', 'Burrito Builder')
    cy.get('.order').eq(0).should('contain', 'Pat')
      .and('contain', 'beans')
      .and('contain', 'lettuce')
      .and('contain', 'carnitas')
      .and('contain', 'queso fresco')
      .and('contain', 'jalapeno')
  })

  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('input').should('be.visible')

    cy.get('button').eq(0).should('contain', 'beans').and('be.visible')
    cy.get('button').eq(1).should('contain', 'steak').and('be.visible')
    cy.get('button').eq(2).should('contain', 'carnitas').and('be.visible')
    cy.get('button').eq(3).should('contain', 'sofritas').and('be.visible')
    cy.get('button').eq(4).should('contain', 'lettuce').and('be.visible')
    cy.get('button').eq(5).should('contain', 'queso fresco').and('be.visible')
    cy.get('button').eq(6).should('contain', 'pico de gallo').and('be.visible')
    cy.get('button').eq(7).should('contain', 'hot sauce').and('be.visible')
    cy.get('button').eq(8).should('contain', 'guacamole').and('be.visible')
    cy.get('button').eq(9).should('contain', 'jalapenos').and('be.visible')
    cy.get('button').eq(10).should('contain', 'cilantro').and('be.visible')
    cy.get('button').eq(11).should('contain', 'sour cream').and('be.visible')

    cy.get('button').eq(12).should('contain', 'Submit Order').and('be.visible')
  })

  it('When a user fills out the form, the information is reflected in the input field\'s value', () => {
    cy.get('input').type('Bob').should('have.attr', 'value', 'Bob')
    cy.get('button').eq(0).click()
    cy.get('button').eq(5).click()
    cy.get('p').should('contain', 'Order: beans, queso fresco')
  })
})