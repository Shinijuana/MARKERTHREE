AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // Il modello all'interno del target AR
    const lostModel = document.querySelector('#lost-model');  // Il modello che resta visibile

    // Funzione di aiuto per convertire la posizione locale in globale
    function localToGlobal(el) {
      const globalPos = new THREE.Vector3();
      el.object3D.getWorldPosition(globalPos);
      return globalPos;
    }

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

      // Assicurarsi che trackedModel object3D sia disponibile
      const trackedModelObject = trackedModel.object3D;
      if (!trackedModelObject) {
        console.error('trackedModel.object3D non è disponibile');
        return;
      }

      // Ottenere la posizione globale e la rotazione del modello tracciato
      const globalPosition = localToGlobal(trackedModel);
      const globalRotation = new THREE.Euler().setFromQuaternion(trackedModelObject.getWorldQuaternion(new THREE.Quaternion()));

      console.log('Posizione Globale:', globalPosition);
      console.log('Rotazione Globale (radianti):', globalRotation);

      // Converti la rotazione globale in gradi
      const rotationDegrees = {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
      console.log('Rotazione Globale (gradi):', rotationDegrees);

      // Imposta la posizione e la rotazione del modello perso usando i template literals correttamente
      lostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      lostModel.setAttribute('rotation', `${rotationDegrees.x} ${rotationDegrees.y} ${rotationDegrees.z}`);

      // Assicurarsi che il modello perso sia visibile
      lostModel.setAttribute('visible', 'true');

      // Debug per garantire che il modello sia aggiornato correttamente
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      const lostModelScale = lostModel.getAttribute('scale');
      console.log('Posizione Modello Perso:', lostModelPosition);
      console.log('Rotazione Modello Perso:', lostModelRotation);
      console.log('Scala Modello Perso:', lostModelScale);
    });
  }
});
