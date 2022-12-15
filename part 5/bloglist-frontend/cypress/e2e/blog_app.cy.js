describe('blog app', () => {
  const user = {
    name: 'Agustin',
    username: 'Agustin',
    password: 'AgusMonc'
  }

  const blog1 = {
    title: 'A new note can be created',
    author: 'Cypress',
    url: 'cypress.com'
  }

  const blog2 = {
    title: 'Title with least blogs',
    author: 'Cypress',
    url: 'cypress.com'
  }

  const blog3 = {
    title: 'Title with most blogs',
    author: 'Cypress',
    url: 'cypress.com'
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

  })

  it('Login form is shown', () => {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('fails with wrong crdentials', () => {
      cy.get('#username').type('wrong name')
      cy.get('#password').type('worngPassword')
  
      cy.get('#login-button').click()
  
      cy.get('.error').contains('Wrong name or password')

      cy.get('html').should('not.contain', 'Welcome AGUSTIN')
    })
  
    it('succeeds with right credentials', () => {
      cy.get('#username').type('Agustin')
      cy.get('#password').type('AgusMonc')
  
      cy.get('#login-button').click()
  
      cy.contains('Create New')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login(user)
    })

    it('a blog can be created', () => {
      cy.contains('new blog').click()

      cy.get('#title').type(blog1.title)
      cy.get('#author').type(blog1.author)
      cy.get('#url').type(blog1.url)

      cy.contains('create').click()

      cy.get('.blog').contains('A new note can be created')
    })

    describe('and blogs exists', () => {
      beforeEach(() => {
        cy.createBlog(blog1)
        cy.createBlog(blog2)
        cy.createBlog(blog3)
      })

      it('one can be liked', () => {
        cy.get('.blog')
          .eq(2)
          .contains('view')
          .click()
          .parent()
          .find('.like')
          .click()
          .parent()
          .should('contain', '1')
      })

      it('one can be deleted by the user', () => {
        cy.get('.blog')
          .eq(2)
          .contains('view')
          .click()
          .parent()
          .contains('remove')
          .click()
      })

      it.only ('the most liked one is on top', () => {
        cy.get('.blog').eq(2).contains('view').click().parent().find('.like').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').click()
        cy.get('@theButton').click()
        cy.get('@theButton').click()

        cy.get('.blog').eq(1).contains('view').click().parent().find('.like').click()

        cy.get('.blog').eq(0).should('contain', 'Title with most blogs')
        cy.get('.blog').eq(2).should('contain', 'Title with least blogs')
      })
    })

  })
}) 