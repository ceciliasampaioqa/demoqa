Cypress.Commands.add('api_login', () => {
  cy.api({
    method: 'POST',
    url: '/Account/v1/Login',
    body: {
      userName: Cypress.env('user_name'),
      password: Cypress.env('password')
    }
  }).then((response) => {
    const access_token = response.body.token
    const user_id = response.body.userId

    Cypress.env('access_token', access_token)
    Cypress.env('user_id', user_id)
  })
})

Cypress.Commands.add('api_getUser', () => {
  cy.api({
    method: 'GET',
    url: `/Account/v1/User/${Cypress.env('user_id')}`,
    headers: {
      Authorization: `Bearer ${Cypress.env('access_token')}`
    }
  })
})

Cypress.Commands.add('api_createUser', () => {
  cy.api({
    method: 'POST',
    url: '/Account/v1/User',
    body: {
      userName: Cypress.env('user_name'),
      password: Cypress.env('password'),
    }
  }).then((response) => {
    const user_id = response.body.userId
    Cypress.env('user_id', user_id)
  })
})

Cypress.Commands.add('api_getAllBooks', () => {
  cy.api({
    method: 'GET',
    url: '/BookStore/v1/Books'
  })
})