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

      // Differenzia le animazioni per lostModel
      const isLostModel = model === lostModel;

      if (!isVisible) {
        // Mostra i bottoni e nasconde i balloon al primo click
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }
        if (balloon) {
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0.35 0.35 0.35; to: 0 0 0; dir: alternate; dur: 1000');
          setTimeout(() => {
            balloon.setAttribute('visible', 'false');
          }, 1000);
        }

        // Animazioni per arTarget
        if (!isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: -1 0 .5; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 2; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('visible', 'true');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 1 0 .5; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('visible', 'true');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 -.5; dur: 1000; easing: linear');
          }
        }

        // Animazioni per lostModel
        if (isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: -.5 0 .8; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 1.8; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('visible', 'true');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: .5 0 .8; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('visible', 'true');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 -.8; dur: 1000; easing: linear');
          }
        }

      } else {
        // Mostra i balloon e nasconde i bottoni al secondo click
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }
        if (balloon) {
          balloon.setAttribute('visible', 'true');
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
        }

        // Animazioni di chiusura per arTarget
        if (!isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: -1 0 .5; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 2; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 1 0 .5; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 -.5; to: 0 0 0; dur: 1000; easing: linear');
          }
        }

        // Animazioni di chiusura per lostModel
        if (isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: -.5 0 .8; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 1.8; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: .5 0 .8; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 -.8; to: 0 0 0; dur: 1000; easing: linear');
          }
        }

        setTimeout(() => {
          nextButton.setAttribute('visible', 'false');
          phoneButton.setAttribute('visible', 'false');
          mailButton.setAttribute('visible', 'false');
          vcfButton.setAttribute('visible', 'false');
        }, 1000);
      }
    };

    // Event listener per il click sul nextButton
    arTarget.nextButton.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      synchronizeModels(this.isVisible);
    });

    lostModel.nextButton.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      synchronizeModels(this.isVisible);
    });
  }
});
