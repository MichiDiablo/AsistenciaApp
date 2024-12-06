describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('cuenta-inexistente');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
        cy.contains('Ingresar');
      });
    });
  })

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
        cy.get('#logout').click();        
      });
    });
  })

  it('Agregar nueva publicación en foro', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
        cy.get('[ng-reflect-value="forum"]').click();
        cy.get('#titulo').type(`Título de prueba ${numero}`);
        cy.get('#contenido').type(`Contenido de prueba ${numero}`);
        cy.contains('Guardar').click();
        cy.wait(3000);      
        cy.contains(`Título de prueba ${numero}`).should('exist'); 
        cy.get('#logout').click();  
      });
    });
  })

  it('Eliminar la publicación creada en foro', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
        cy.get('[ng-reflect-value="forum"]').click();      
        cy.contains(`Título de prueba ${numero}`).should('exist').then(() =>{
          cy.contains(`Título de prueba ${numero}`);
          cy.wait(3000);
          cy.get('#delete').click();
          cy.get('#logout').click();
        }) 
      });
    });
  })

  it('Validar campos en mis datos', () => {
    cy.visit('/').then(() => {
      cy.contains('Asistencia DUOC');
      cy.get('#userName').invoke('val', '');
      cy.get('#userName').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/ingresar').as('route').then(() => {
        cy.get('[ng-reflect-value="mis-datos"]').click();
              
        
      });
    });
  })

  
})