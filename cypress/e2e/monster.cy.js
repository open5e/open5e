describe('template spec', () => {
  it('can search for a monster', () => {
    cy.visit('http://localhost:3000').wait(1000);
    cy.intercept(
      'GET',
      'https://api.open5e.com/search/?text=Adult%20Bronze%20Dragon',
      { fixture: 'search.json' }
    );
    cy.intercept(
      'GET',
      'https://api.open5e.com/monsters/adult-bronze-dragon/',
      { fixture: 'adult-bronze-dragon.json' }
    );
    cy.get('input').type('Adult Bronze Dragon{enter}');
    cy.contains('.search-result a', 'Adult Bronze Dragon').click();
    cy.contains('section', 'The dragon can use its Frightful Presence.');
    cy.contains(
      'section',
      'The dragon exhales lightning in a 90-foot line that is 5 feet wide.'
    );
    cy.contains('section', 'Wing Attack (Costs 2 Actions).');
  });
});
