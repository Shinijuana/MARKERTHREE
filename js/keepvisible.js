AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // Il modello tracciato nell'AR target
    const lostModel = document.querySelector('#lost-model');  // Il modello che rimane visibile

    // Ascolta gli eventi targetFound e targetLost di MindAR
    sceneEl.addEventListener('targetFound', () => {
      console.log('Target trovato');
      const startImage = document.getElementById('startImage');
      startImage.setAttribute('visible', 'false');
      trackedModel.setAttribute('visible', 'true');
      lostModel.setAttribute('visible', 'false');
    });

    sceneEl.addEventListener('targetLost', () => {
      console.log('Target perso');

      // Imposta la posizione e la rotazione del modello perso ai valori desiderati
      const fixedPosition = { x: 0, y: -1000, z: -5500.345635017298 };
      const fixedRotation = { x: 0, y: 0, z: 0 };

      lostModel.setAttribute('position', `${fixedPosition.x} ${fixedPosition.y} ${fixedPosition.z}`);
      lostModel.setAttribute('rotation', `${fixedRotation.x} ${fixedRotation.y} ${fixedRotation.z}`);

      // Assicurati che il modello perso sia visibile
      lostModel.setAttribute('visible', 'true');

      // Debug per verificare i valori di posizione e rotazione
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      console.log('Posizione Modello Perso:', lostModelPosition);
      console.log('Rotazione Modello Perso:', lostModelRotation);
    });
  }
});
