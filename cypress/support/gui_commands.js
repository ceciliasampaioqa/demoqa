import { faker } from '@faker-js/faker'

Cypress.Commands.add('gui_fillFormElementsTextBox', () => {
  cy.visit('/text-box')
  cy.get('[id="userName"]').type('Cecilia Sampaio')
  cy.get('[id="userEmail"]').type('ceciliasampaio.qa@gmail.com')
  cy.get('[id="currentAddress"]').type('123 Main Street')
  cy.get('[id="permanentAddress"]').type('456 Secondary Street')
  cy.get('[id="submit"]').click()
})

Cypress.Commands.add('gui_checkingHomeCheckbox', () => {
  cy.visit('/checkbox')
  cy.get('[id="tree-node-home"]').invoke('show').check()
})

Cypress.Commands.add('gui_fillStudentRegistrationForm', () => {
  const data_user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
    subjects: 'Computer Science', // faker.helpers.arrayElement(['Math', 'Biology', 'Chemistry', 'Physics']),
    hobbies: faker.helpers.arrayElement(['Sports', 'Reading', 'Music']),
    picture: 'test_picture.jpg',
    address: faker.location.streetAddress(),
    state: 'NCR', // faker.helpers.arrayElement(['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan']),
    city: 'Delhi' // faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Noida'])
  }

  cy.get('[id="firstName"]').type(data_user.firstName)
  cy.get('[id="lastName"]').type(data_user.lastName)
  cy.get('[id="userEmail"]').type(data_user.email)
  cy.get(`label:contains("${data_user.gender}")`).click()
  cy.get('[id="userNumber"]').type(data_user.phone)
  cy.gui_selectDateOfBirth().then((birthDate) => {
    data_user.birthDate = birthDate
  })
  cy.get('[id="subjectsContainer"]').type(`${data_user.subjects}{enter}`)
  cy.get(`label:contains("${data_user.hobbies}")`).click()
  cy.get('[id="uploadPicture"]').selectFile(`cypress/fixtures/${data_user.picture}`)
  cy.get('[id="currentAddress"]').type(data_user.address)
  cy.get('[id="state"]').click().contains('div', data_user.state).click()
  cy.get('[id="city"]').click().contains('div', data_user.city).click()
  cy.get('[id="submit"]').click()

  return cy.wrap(data_user)
})

Cypress.Commands.add('gui_selectDateOfBirth', () => {
  const generateDynamicDate = () => {
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    const year = birthDate.getFullYear()
    const month = birthDate.toLocaleString('en-US', { month: 'long' })
    const day = birthDate.getDate()

    return { year, month, day, formattedDate: `${day} ${month},${year}` }
  }

  const { year, month, day, formattedDate } = generateDynamicDate()

  cy.get('[id="dateOfBirthInput"]').click()
  cy.get('.react-datepicker__year-select').select(`${year}`)
  cy.get('.react-datepicker__month-select').select(`${month}`)
  cy.get(`.react-datepicker__day--0${day.toString().padStart(2, '0')}[aria-label~="${month}"]`).click()

  return cy.wrap(formattedDate)
})

Cypress.Commands.add('gui_validateNewTabOrWindowContent', (buttonSelector) => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('tabOrWindowOpen')
  })

  cy.get(buttonSelector).click()

  cy.get('@tabOrWindowOpen').should('be.called')

  cy.get('@tabOrWindowOpen').then((stub) => {
    const newTabOrWindowUrl = stub.getCall(0).args[0]

    cy.visit(newTabOrWindowUrl)
  })
})
