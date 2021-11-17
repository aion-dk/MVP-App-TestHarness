describe('Voter', () => {
  const e2e = Cypress.env('END_TO_END');

  beforeEach(() => {
    cy.viewport('iphone-5');
  });

  it('casts a vote', () => {
    let otpDigits = null;
    const pageTransitionDuration = 500;
    const startupScreenDuration = 500;

    cy.visit('/');
    cy.wait(startupScreenDuration);

    cy.get('input[placeholder="First Name"]').type('Zebra');
    // Special CVR constructed for any name that does not start with A, B or C.
    cy.get('input[placeholder="Last Name"]').type('Yak');
    cy.contains('Next').click();
    cy.wait(pageTransitionDuration);
    cy.contains('app-ballot-form', 'Welcome Zebra').should('be.visible');

    cy.contains('app-ballot-form ion-button', 'Start').click();
    cy.wait(pageTransitionDuration);
    cy.contains('app-ballot-complete', 'Your ballot is complete').should('be.visible');
    cy.contains('app-ballot-complete', 'Choose A Return').should('be.visible');

    cy.contains('app-ballot-complete .bottom-div-text', 'Digital Return').click();
    cy.wait(pageTransitionDuration);
    cy.contains('app-request-access-code', 'To use digital return, touch Next').should('be.visible');

    cy.contains('app-request-access-code ion-button', 'Next').click();
    cy.wait(pageTransitionDuration);
    cy.contains('app-access-code', 'Enter Access Code').should('be.visible');
    if (e2e) {
      cy.wait(1000); // Wait for email to be sent
      cy.request('http://localhost:1080/messages').then((response) => {
        const messages = response.body;
        if (messages.length == 0) {
          throw 'Email message with an OTP was not found';
        }
        const lastMessageId = messages[messages.length - 1].id;
        cy.request(`http://localhost:1080/messages/${lastMessageId}.plain`).then((response) => {
          const message = response.body;
          const otpPattern = /\d{5}/g;
          otpDigits = otpPattern.exec(message)[0].split('');

          cy.get('app-access-code input[tabindex="1"]').type(otpDigits[0]);
          cy.get('app-access-code input[tabindex="2"]').type(otpDigits[1]);
          cy.get('app-access-code input[tabindex="3"]').type(otpDigits[2]);
          cy.get('app-access-code input[tabindex="4"]').type(otpDigits[3]);
          cy.get('app-access-code input[tabindex="5"]').type(otpDigits[4]);

          cy.contains('app-access-code ion-button', 'Next').click();
          cy.wait(pageTransitionDuration);
          cy.contains('app-before-you-finish', 'Before You Finish').should('be.visible');

          cy.contains('app-before-you-finish ion-button', 'Next').click();
          cy.wait(pageTransitionDuration);
          cy.contains('app-ballot-fingerprint', 'Your Ballot Has Been Sealed and Is Ready To Cast').should('be.visible');

          cy.contains('app-ballot-fingerprint ion-button', 'Cast Ballot Now').click();
          cy.wait(pageTransitionDuration);
          cy.contains('app-sending-confirmation', 'Congrats! Your ballot has been cast!').should('be.visible');
        });
      });
    } else {
      otpDigits = '12345'.split('');

      cy.get('app-access-code input[tabindex="1"]').type(otpDigits[0]);
      cy.get('app-access-code input[tabindex="2"]').type(otpDigits[1]);
      cy.get('app-access-code input[tabindex="3"]').type(otpDigits[2]);
      cy.get('app-access-code input[tabindex="4"]').type(otpDigits[3]);
      cy.get('app-access-code input[tabindex="5"]').type(otpDigits[4]);

      cy.contains('app-access-code ion-button', 'Next').click();
      cy.wait(pageTransitionDuration);
      cy.contains('app-before-you-finish', 'Before You Finish').should('be.visible');

      cy.contains('app-before-you-finish ion-button', 'Next').click();
      cy.wait(pageTransitionDuration);
      cy.contains('app-ballot-fingerprint', 'Your Ballot Has Been Sealed and Is Ready To Cast').should('be.visible');

      cy.contains('app-ballot-fingerprint ion-button', 'Cast Ballot Now').click();
      cy.wait(pageTransitionDuration);
      cy.contains('app-sending-confirmation', 'Congrats! Your ballot has been cast!').should('be.visible');
    }
  });
});
