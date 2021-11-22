require('cypress-get-table');

const startupScreenDuration = 1500;
const pageTransitionDuration = 1000;

describe('Application with all background services', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
  });

  it('allows a single voter session to be registered on the board', () => {
    let submissionRowCount = 0;
    let voterRegistrationRowCount = 0;

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
    cy.wait(1000); // Wait for email to be sent
    return cy.request('http://localhost:1080/messages').then((response) => {
      const messages = response.body;
      if (messages.length == 0) {
        throw 'No email messages were found';
      }
      const lastMessageId = messages[messages.length - 1].id;
      return cy
        .request(`http://localhost:1080/messages/${lastMessageId}.plain`)
        .then((response) => {
          const message = response.body;
          const otpPattern = /\d{5}/g;
          const oneTimePassword = otpPattern.exec(message)[0];
          const otpDigits = oneTimePassword.split('');
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
        })
        .then(() => {
          cy.viewport('macbook-11');
          cy.forceVisit('http://us-avx:3000/us/board/table').then(() => {
            cy.get('#board-items')
              .getTable()
              .each((row) => {
                if (row.Activity == 'Vote submission') {
                  submissionRowCount++;
                } else if (row.Activity == 'Voter configuration') {
                  voterRegistrationRowCount++;
                }
              })
              .then(() => {
                // One vote is assumed only with a freshly reset AVX database
                cy.expect(submissionRowCount).to.equal(1);
                cy.expect(voterRegistrationRowCount).to.equal(1);
              });
          });
        });
    });
  });
});
