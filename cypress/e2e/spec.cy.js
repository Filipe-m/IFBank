// cypress/e2e/api_spec.js

describe('API Tests', () => {
  it('should create users', () => {
    cy.request('POST', 'http://localhost:7091/users', {
      username: 'John Doe',
      email: 'filipe.coelho@estudantes.ifg.edu.br'
    }).then(response => {
      expect(response.status).to.eq(201)
    })
  })
  it('should create users and retrieve them', () => {
    cy.request('POST', 'http://localhost:7091/users', {
      username: 'John Doe',
      email: 'victor.cruz@estudantes.ifg.edu.br'
    }).then(response => {
      expect(response.status).to.eq(201)
      const user_id = response.body.id;
      expect(response.body).to.have.property('id');
      
      return cy.request('GET', `http://localhost:7091/users/${user_id}`);
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.username).to.eq('John Doe');
      expect(response.body.email).to.eq('victor.cruz@estudantes.ifg.edu.br');
    });
  });
})
