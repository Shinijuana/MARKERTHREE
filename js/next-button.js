AFRAME.registerComponent('next-button', {
  init() {
    // Dichiarazione delle costanti
    const char = document.getElementById('tracked-model');
    const nextButton = document.getElementById('nextbutton');
    const phoneButton = document.getElementById('phoneButton');
    const mailButton = document.getElementById('emailButton');
    const vcfButton = document.getElementById('vcfButton');
    const textElement = document.querySelector('#balloon-text');
    const balloon = document.getElementById('balloon-plane');
    const closeButton = document.getElementById('closeButton');
    const finalpage = document.getElementById('finalp');
    const refr = document.getElementById('reload');
    const download = document.getElementById('down');

    // Scritta iniziale con delay
    setTimeout(() => {
      textElement.setAttribute('typewriting', 'value: Hello, I\'m Emilio Lonardo, Ceo & Co-Founder of D.O.S.. Tap for more!');
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
        const isBalloonVisible = balloon.getAttribute('visible') === 'true';
        // Quando il balloon è visibile
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
            balloon.setAttribute('animation__pulse', 'property: scale; from: .35 .35 .35; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('visible', 'false');
            phoneButton.setAttribute('visible', 'false');
            mailButton.setAttribute('visible', 'false');
            vcfButton.setAttribute('visible', 'false');
          }, 1000);

          setTimeout(() => {
            char.setAttribute('visible', 'false');
            closeButton.setAttribute('visible', 'false');
            finalpage.setAttribute('visible', 'true');
            finalpage.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 3.5 7 1; dir: alternate; dur: 100');
            refr.setAttribute('visible', 'true');
            download.setAttribute('visible', 'true');
            balloon.setAttribute('visible', 'false'); // Assicurati che il balloon venga nascosto dopo la chiusura
          }, 2000);
        } else {
          // Balloon non visibile
          balloon.setAttribute('visible', 'true');
          balloon.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 0.35 0.35 0.35; dir: alternate; dur: 1000');
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
            nextButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            nextButton.setAttribute('animation__move', 'property: position; from:-.8 0 .5 ; to: 0 0 0; dur: 1000; easing: linear');
            phoneButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            phoneButton.setAttribute('animation__move', 'property: position; from: 0 0 1.65 ; to: 0 0 0; dur: 1000; easing: linear');
            mailButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            mailButton.setAttribute('animation__move', 'property: position; from:.8 0 .5 ; to: 0 0 0; dur: 1000; easing: linear');
            vcfButton.setAttribute('animation__pulse', 'property: scale; from: 1 1 1; to: 0 0 0; dir: alternate; dur: 1000');
            vcfButton.setAttribute('animation__move', 'property: position; from:0 0 -.5 ; to: 0 0 0; dur: 1000; easing: linear');
          }, 1000);

          setTimeout(() => {
            char.setAttribute('visible', 'false');
            closeButton.setAttribute('visible', 'false');
            finalpage.setAttribute('visible', 'true');
            finalpage.setAttribute('animation__pulse', 'property: scale; from: 0 0 0; to: 3.5 7 1; dir: alternate; dur: 100');
            refr.setAttribute('visible', 'true');
            download.setAttribute('visible', 'true');
            balloon.setAttribute('visible', 'false'); // Assicurati che il balloon venga nascosto dopo la chiusura
          }, 2000);
        }
      };
    }

    // Animazioni e opzione di frasi
    let isVisible = false;
    if (char) {
      char.onclick = () => {
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
      };
    }
  },
});
