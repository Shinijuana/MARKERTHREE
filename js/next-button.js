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
      closeButton : document.getElementById('closeButton'),
      finalpage : document.getElementById('finalp'),
      refr : document.getElementById('reload'),
      download : document.getElementById('down')
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
      closeButton : document.getElementById('closeButton'),
      finalpage : document.getElementById('finalp'),
      refr : document.getElementById('reload'),
      download : document.getElementById('down')
    };


    const tar = document.getElementById('ar-target');
    const lost = document.getElementById('lost-model');
    
    // Variabile per tenere traccia dello stato di visibilità dei bottoni
    this.isVisible = true;

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
       

        // Animazioni di apertura specifiche per arTarget
        if (!isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: -1 0 .5; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 2.2; dur: 1000; easing: linear');
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
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0.35 0.35 0.35; to: 0 0 0; dir: alternate; dur: 1000');
          setTimeout(() => {
            balloon.setAttribute('visible', 'false');
          }, 1000);
        }

        // Animazioni di apertura specifiche per lostModel
        if (isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: -.5 .5 0; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: 0 1.15 0; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('visible', 'true');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: .5 .5 0; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('visible', 'true');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: 0 0 0; dur: 1000; easing: linear');
          }
           balloon.setAttribute('animation__pulse', 'property: scale; from: 0.22 0.22 0.22; to: 0 0 0; dir: alternate; dur: 1000');
          setTimeout(() => {
            balloon.setAttribute('visible', 'false');
          }, 1000);
        }
      } else {
        // Mostra i balloon e nasconde i bottoni al secondo click
        if (textElement) {
          textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
        }
       
        

        // Animazioni di chiusura per arTarget
        if (!isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: -1 0 .5; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 2.2; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 1 0 .5; to: 0 0 0; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 -.5; to: 0 0 0; dur: 1000; easing: linear');
          }
          balloon.setAttribute('visible', 'true');
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
        }

        // Animazioni di chiusura per lostModel
        if (isLostModel) {
          if (nextButton) {
            nextButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: -.5 .5 0; to: 0 .5 0; dur: 1000; easing: linear');
          }
          if (phoneButton) {
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 1.15 0; to: 0 .5 0; dur: 1000; easing: linear');
          }
          if (mailButton) {
            mailButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: .5 .5 0; to: 0 .5 0; dur: 1000; easing: linear');
          }
          if (vcfButton) {
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: .5 .5 .5; to: 0 0 0; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 .5 0; dur: 1000; easing: linear');
          }
          balloon.setAttribute('visible', 'true');
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.22 0.22 0.22; dir: alternate; dur: 1000');
        }
      }
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
          
          finalpage.setAttribute('visible', 'true');
          finalpage.setAttribute('scale', '6 12 2')
          refr.setAttribute('visible', 'true');
          refr.setAttribute('scale', '1 1 1')
          download.setAttribute('visible', 'true');
          download.setAttribute('scale', '.8 .8 .8')
          closeButton.setAttribute('visible', 'false');
          tar.setAttribute('visible', 'false');
          lost.setAttribute('visible', 'false');
        };
      }

      // Gestione del click su char
      if (char) {
        char.onclick = () => {
          
          this.isVisible = !this.isVisible; // Toggle visibilità
          synchronizeModels(this.isVisible); // Sincronizza entrambi i modelli
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
})
