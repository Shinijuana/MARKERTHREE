AFRAME.registerComponent('next-button', {
  init() {
    // Dichiarazione delle costanti per ar-target
    const arTarget = {
      char: document.getElementById('tracked-model'),
      nextButton: document.getElementById('nextbutton'),
      phoneButton: document.getElementById('phoneButton'),
      mailButton: document.getElementById('emailButton'),
      vcfButton: document.getElementById('vcfButton'),
      textElement: document.querySelector('#balloon-text'),
      balloon: document.getElementById('balloon-plane'),
      closeButton: document.getElementById('closeButton'),
      finalpage: document.getElementById('finalp'),
      refr: document.getElementById('reload'),
      download: document.getElementById('down')
    };

    // Dichiarazione delle costanti per lost-model
    const lostModel = {
      char: document.querySelector('#lost-model #tracked-model'),
      nextButton: document.querySelector('#lost-model #nextbutton'),
      phoneButton: document.querySelector('#lost-model #phoneButton'),
      mailButton: document.querySelector('#lost-model #emailButton'),
      vcfButton: document.querySelector('#lost-model #vcfButton'),
      textElement: document.querySelector('#lost-model #balloon-text'),
      balloon: document.querySelector('#lost-model #balloon-plane'),
      closeButton: document.querySelector('#lost-model #closeButton'),
      finalpage: document.querySelector('#lost-model #finalp'),
      refr: document.querySelector('#lost-model #reload'),
      download: document.querySelector('#lost-model #down')
    };

    // Funzione per inizializzare gli eventi e le animazioni
    const initializeEvents = (model) => {
      const {
        char,
        nextButton,
        phoneButton,
        mailButton,
        vcfButton,
        textElement,
        balloon,
        closeButton,
        finalpage,
        refr,
        download
      } = model;

      // Scritta iniziale con delay
      setTimeout(() => {
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }
      }, 6000);

      // Funzioni bottoni
      if (nextButton) {
        nextButton.onclick = () => {
          window.open('https://designopenspaces.it/', '_blank');
        };
      }

      if (phoneButton) {
        phoneButton.onclick = () => {
          window.open('tel:+393274942494', '_self');
        };
      }

      if (mailButton) {
        mailButton.onclick = () => {
          window.open('mailto:emilio.lonardo@designopenspaces.it', '_self');
        };
      }

      if (vcfButton) {
        vcfButton.onclick = () => {
          const downloadUrl = 'https://drive.google.com/uc?export=download&id=1DqanjcQqU1FXM29gRwWMe5noW_TxAj2U';
          window.open(downloadUrl, '_self');
          if (textElement) {
            textElement.setAttribute('typewriting', 'value: Downloading contact info!');
          }
          if (balloon) {
            balloon.setAttribute('visible', 'true');
            balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
            setTimeout(() => {
              balloon.setAttribute('animation__pulse', 'property: scale; from: 0.35 0.35 0.35; to: 0 0 0; dir: alternate; dur: 1000');
              setTimeout(() => {
                balloon.setAttribute('visible', 'false');
              }, 1000);
            }, 3000);
          }
        };
      }

      if (closeButton) {
        closeButton.onclick = () => {
          const isBalloonVisible = balloon && balloon.getAttribute('visible') === 'true';
          this.handleCloseButton(isBalloonVisible, model);
        };
      }

      // Gestione del click su char
      if (char) {
        char.onclick = () => this.handleCharClick(model);
      }
    };

    // Inizializza gli eventi per ar-target e lost-model
    initializeEvents(arTarget);
    initializeEvents(lostModel);
  },

  handleCharClick(model) {
    const {
      char,
      nextButton,
      phoneButton,
      mailButton,
      vcfButton,
      textElement,
      balloon
    } = model;

    let isVisible = false;
    if (!isVisible) {
      if (textElement) {
        textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
      }
      if (balloon) {
        balloon.setAttribute('animation__pulse', 'property: scale; from: 0.35 0.35 0.35; to: 0 0 0; dir: alternate; dur: 1000');
        setTimeout(() => {
          balloon.setAttribute('visible', 'false');
        }, 1000);
      }
      [nextButton, phoneButton, mailButton, vcfButton].forEach((button) => {
        if (button) {
          button.setAttribute('visible', 'true');
          button.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
          button.setAttribute('animation__move', `property: position; from: 0 0 0; to: ${button.id === 'nextbutton' ? '-.8 0 .5' : button.id === 'phoneButton' ? '0 0 1.65' : button.id === 'emailButton' ? '.8 0 .5' : '0 0 -.5'}; dur: 1000; easing: linear`);
        }
      });
      isVisible = true;
    } else {
      if (textElement) {
        textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
      }
      if (balloon) {
        balloon.setAttribute('visible', 'true');
        balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
      }
      [nextButton, phoneButton, mailButton, vcfButton].forEach((button) => {
        if (button) {
          button.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
          button.setAttribute('animation__move', `property: position; from: ${button.id === 'nextbutton' ? '-.8 0 .5' : button.id === 'phoneButton' ? '0 0 1.65' : button.id === 'emailButton' ? '.8 0 .5' : '0 0 -.5'}; to: 0 0 0; dur: 1000; easing: linear`);
        }
      });

      setTimeout(() => {
        [nextButton, phoneButton, mailButton, vcfButton].forEach((button) => {
          if (button) button.setAttribute('visible', 'false');
        });
      }, 1000);
      isVisible = false;
    }
  },

  handleCloseButton(isBalloonVisible, model) {
    const {
      char,
      textElement,
      balloon,
      nextButton,
      phoneButton,
      mailButton,
      vcfButton,
      finalpage,
      refr,
      download
    } = model;

    if (isBalloonVisible) {
      textElement.setAttribute('typewriting', 'value: Bye Bye!');
      if (refr) {
        refr.onclick = () => {
          window.location.reload();
        };
      }

      if (download) {
        download.onclick = () => {
          const downloadUrl = 'https://drive.google.com/uc?export=download&id=1DqanjcQqU1FXM29gRwWMe5noW_TxAj2U';
          window.open(downloadUrl, '_self');
        };
      }

      // Animazioni alla chiusura
      setTimeout(() => {
        char.setAttribute('animation__pulse', 'property: scale; from: 1.5 1.5 1.5; to: 0 0 0; dir: alternate; dur: 1000');
        char.setAttribute('animation__rotation', 'property: rotation; from: 90 0 0; to: 720 0 0; dir: alternate; dur: 1000');
      }, 500);
      setTimeout(() => {
        if (balloon) {
          balloon.setAttribute('visible', 'false');
        }
        if (finalpage) {
          finalpage.setAttribute('visible', 'true');
        }
      }, 1500);
    }
  }
});
