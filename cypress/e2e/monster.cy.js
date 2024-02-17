import dragon from '../fixtures/adult-bronze-dragon.json';
import search_results from '../fixtures/search.json';

describe('template spec', () => {
  it('can search for a monster', () => {
    cy.visit('http://localhost:3000').wait(1000);
    cy.intercept(
      'GET',
      'https://api.open5e.com/search/?text=Adult%20Bronze%20Dragon',
      search_results
    );
    cy.intercept(
      'GET',
      'https://api.open5e.com/monsters/adult-bronze-dragon/',
      dragon
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
