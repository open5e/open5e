describe('Monster endpoint', () => {
  it('displays the WotC Acolyte', () => {
    cy.visit('http://localhost:3000/monsters/acolyte');
    cy.intercept('GET', 'https://api.open5e.com/monsters/acolyte/', {
      fixture: 'acolyte.json',
    }).as('monster');

    cy.get('h2').should(($h2) => {
      expect($h2).to.contain('Actions');

      expect($h2).to.not.contain('Bonus Actions'); // This monster does not have bonus actions
      expect($h2).to.not.contain('Reactions'); // This monster does not have bonus actions
      expect($h2).to.not.contain('Legendary Actions'); // This monster does not have legendary actions
    });
  });
  it('displays the WoTC Silver Dragon', () => {
    cy.visit('http://localhost:3000/monsters/adult-silver-dragon');
    cy.intercept(
      'GET',
      'https://api.open5e.com/monsters/adult-silver-dragon/',
      {
        fixture: 'adult-silver-dragon.json',
      }
    ).as('monster');

    cy.get('h2').should(($h2) => {
      expect($h2).to.contain('Actions');
      expect($h2).to.contain('Legendary Actions');

      expect($h2).to.not.contain('Bonus Actions'); // This monster does not have bonus actions
      expect($h2).to.not.contain('Reactions'); // This monster does not have bonus actions
    });
  });
});
