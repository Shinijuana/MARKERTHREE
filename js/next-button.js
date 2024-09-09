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
        balloon,
        closeButton
      } = model;

      if (!isVisible) {
        // Scritta iniziale con delay
        setTimeout(() => {
          if (textElement) {
            textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
          }
        }, 6000);

        // Mostra i bottoni e nasconde i balloon al primo click
        if (balloon) {
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0 0 0; dir: alternate; dur: 1000');
          setTimeout(() => {
            balloon.setAttribute('visible', 'false');
          }, 1000);
        }

        // Animazioni di apertura specifiche per arTarget
        if (model === arTarget) {
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: -1 0 .5; dur: 1000; easing: linear');
            nextButton.onclick = () => {
              window.open('https://designopenspaces.it/', '_blank');
            };
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 2.2; dur: 1000; easing: linear');
            phoneButton.onclick = () => {
              window.open('tel:+393274942494', '_self');
            };
          }
          if (mailButton) {
            mailButton.setAttribute('visible', 'true');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 1 0 .5; dur: 1000; easing: linear');
            mailButton.onclick = () => {
              window.open('mailto:emilio.lonardo@designopenspaces.it', '_self');
            };
          }
          if (vcfButton) {
            vcfButton.setAttribute('visible', 'true');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 1 1 1; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 0 0; to: 0 0 -.5; dur: 1000; easing: linear');
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
        } else {
          // Animazioni di apertura specifiche per lostModel
          if (nextButton) {
            nextButton.setAttribute('visible', 'true');
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: -.5 .5 0; dur: 1000; easing: linear');
            nextButton.onclick = () => {
              window.open('https://designopenspaces.it/', '_blank');
            };
          }
          if (phoneButton) {
            phoneButton.setAttribute('visible', 'true');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: 0 1.15 0; dur: 1000; easing: linear');
            phoneButton.onclick = () => {
              window.open('tel:+393274942494', '_self');
            };
          }
          if (mailButton) {
            mailButton.setAttribute('visible', 'true');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: .5 .5 0; dur: 1000; easing: linear');
            mailButton.onclick = () => {
              window.open('mailto:emilio.lonardo@designopenspaces.it', '_self');
            };
          }
          if (vcfButton) {
            vcfButton.setAttribute('visible', 'true');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: .5 .5 .5; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from: 0 .5 0; to: 0 0 0; dur: 1000; easing: linear');
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
        }

        // Pulsante di chiusura
        if (closeButton) {
          closeButton.onclick = () => {
            const isBalloonVisible = balloon && balloon.getAttribute('visible') === 'true';
            this.handleCloseButton(isBalloonVisible, model);
          };
        }

        // Gestione del click su char
        if (char) {
          char.onclick = () => {
            this.isVisible = !this.isVisible; // Toggle visibilità
            synchronizeModels(this.isVisible); // Sincronizza entrambi i modelli
          };
        }
      } else {
        // Animazioni di chiusura per lostModel
        if (model === lostModel) {
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
        }

        // Animazioni di chiusura per arTarget
        if (model === arTarget) {
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
        }
      }
    };

    // Inizializza gli eventi per ar-target e lost-model
    const initializeEvents = (model) => {
      this.updateModelState(model, this.isVisible);

      // Event listener per il click del pulsante
      this.el.addEventListener('click', () => {
        this.isVisible = !this.isVisible;
        synchronizeModels(this.isVisible);
      });

      // Event listener per il click del pulsante di chiusura
      const closeButtons = [arTarget.closeButton, lostModel.closeButton];
      closeButtons.forEach(button => {
        if (button) {
          button.addEventListener('click', () => {
            this.isVisible = false;
            synchronizeModels(this.isVisible);
          });
        }
      });

      // Event listener per il click del pulsante di download
      const downloadButtons = [arTarget.download, lostModel.download];
      downloadButtons.forEach(button => {
        if (button) {
          button.addEventListener('click', () => {
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
          });
        }
      });

      // Event listener per il click del pulsante di refresh
      const refreshButtons = [arTarget.refr, lostModel.refr];
      refreshButtons.forEach(button => {
        if (button) {
          button.addEventListener('click', () => {
            location.reload();
          });
        }
      });

      // Event listener per il click del pulsante di finale
      const finalpageButtons = [arTarget.finalpage, lostModel.finalpage];
      finalpageButtons.forEach(button => {
        if (button) {
          button.addEventListener('click', () => {
            console.log('Final page action');
          });
        }
      });
    };

    initializeEvents(arTarget);
    initializeEvents(lostModel);
  },

  downloadFile(url, filename) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      });
  }
});
