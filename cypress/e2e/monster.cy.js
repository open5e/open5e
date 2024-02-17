describe('template spec', () => {
  it('can search for a monster', () => {
    cy.visit('http://localhost:3000');
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
