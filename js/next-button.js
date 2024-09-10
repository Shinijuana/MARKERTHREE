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

    // Variabile per tenere traccia dello stato di visibilità dei bottoni
    this.isVisible = false;

    // Funzione per sincronizzare gli eventi tra i due modelli
    const synchronizeModels = (isVisible) => {
      this.updateModelState(arTarget, isVisible);
      this.updateModelState(lostModel, isVisible);
    };

    // Funzione per aggiornare lo stato di un modello
    this.updateModelState = (model, isVisible) => {
      const {
        char,
        nextButton,
        phoneButton,
        mailButton,
        vcfButton,
        textElement,
        balloon
      } = model;

      const isLostModel = model === lostModel;

      if (!isVisible) {
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }

        if (balloon) {
          if (!isLostModel) {
            // Animazioni balloon per arTarget
            balloon.setAttribute('animation__pulse', 'property: scale; from: 0.35 0.35 0.35; to: 0 0 0; dir: alternate; dur: 1000');
          } else {
            // Animazioni balloon per lostModel
            balloon.setAttribute('animation__pulse', 'property: scale; from: 0.25 0.25 0.25; to: 0 0 0; dir: alternate; dur: 1000');
          }
          setTimeout(() => {
            balloon.setAttribute('visible', 'false');
          }, 1000);
        }

        // Animazioni di apertura per arTarget e lostModel
        this.handleButtonAnimations(model, true);
      } else {
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }

        if (balloon) {
          if (!isLostModel) {
            // Animazioni balloon per arTarget
            balloon.setAttribute('visible', 'true');
            balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
          } else {
            // Animazioni balloon per lostModel
            balloon.setAttribute('visible', 'true');
            balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.25 0.25 0.25; dir: alternate; dur: 1000');
          }
        }

        // Animazioni di chiusura per arTarget e lostModel
        this.handleButtonAnimations(model, false);
      }
    };

    // Funzione per gestire le animazioni dei bottoni
    this.handleButtonAnimations = (model, isOpening) => {
      const {
        nextButton,
        phoneButton,
        mailButton,
        vcfButton
      } = model;

      const isLostModel = model === lostModel;

      const scaleStart = isOpening ? '0 0 0' : isLostModel ? '.5 .5 .5' : '1 1 1';
      const scaleEnd = isOpening ? isLostModel ? '.5 .5 .5' : '1 1 1' : '0 0 0';

      const buttons = [nextButton, phoneButton, mailButton, vcfButton];
      buttons.forEach(button => {
        if (button) {
          button.setAttribute('animation__pulse', `property: scale; from: ${scaleStart}; to: ${scaleEnd}; dir: alternate; dur: 1000`);
        }
      });
    };

    // Funzione per inizializzare gli eventi
    const initializeEvents = (model) => {
      const {
        char,
        textElement,
        balloon,
        closeButton
      } = model;

      setTimeout(() => {
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }
      }, 6000);

      // Gestione del click su char
      if (char) {
        char.onclick = () => {
          this.isVisible = !this.isVisible;
          synchronizeModels(this.isVisible);
        };
      }

      if (closeButton) {
        closeButton.onclick = () => {
          const isBalloonVisible = balloon && balloon.getAttribute('visible') === 'true';
          this.handleCloseButton(isBalloonVisible, model);
        };
      }
    };

    // Inizializza gli eventi per ar-target e lost-model
    initializeEvents(arTarget);
    initializeEvents(lostModel);
  },

  handleCloseButton(isBalloonVisible, model) {
    const {
      char,
      textElement,
      balloon,
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
