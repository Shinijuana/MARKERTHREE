AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // Modello tracciato
    const lostModel = document.querySelector('#lost-model');  // Modello perso

    // Funzione per convertire la posizione locale in globale
    function localToGlobal(el) {
      const globalPos = new THREE.Vector3();
      el.object3D.getWorldPosition(globalPos);
      return globalPos;
    }

    // Eventi MindAR targetFound e targetLost
    sceneEl.addEventListener('targetFound', () => {
      console.log('Target found');
      const startImage = document.getElementById('startImage');
      startImage.setAttribute('visible', 'false');
      trackedModel.setAttribute('visible', 'true');
      lostModel.setAttribute('visible', 'false');
    });

    sceneEl.addEventListener('targetLost', () => {
      console.log('Target lost');

      // Assicurarsi che trackedModel.object3D sia disponibile
      const trackedModelObject = trackedModel.object3D;
      if (!trackedModelObject) {
        console.error('trackedModel.object3D is not available');
        return;
      }

      // Ottenere la posizione globale e la rotazione del modello tracciato
      const globalPosition = localToGlobal(trackedModel);
      const globalRotation = new THREE.Euler().setFromQuaternion(trackedModelObject.getWorldQuaternion(new THREE.Quaternion()));

      console.log('Global Position:', globalPosition);
      console.log('Global Rotation (radians):', globalRotation);

      // Convertire la rotazione globale in gradi
      const rotationDegrees = {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
      console.log('Global Rotation (degrees):', rotationDegrees);

      // Impostare la posizione e la rotazione del modello perso
      lostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      lostModel.setAttribute('rotation', `${rotationDegrees.x} ${rotationDegrees.y} ${rotationDegrees.z}`);

      // Disattivare il comportamento che lega lostModel alla camera
      lostModel.object3D.matrixAutoUpdate = false;

      // Forzare la posizione nel mondo reale
      lostModel.object3D.updateMatrixWorld(true);
      lostModel.setAttribute('visible', 'true');

      // Debugging per verificare se il modello è aggiornato correttamente
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      console.log('Lost Model Position:', lostModelPosition);
      console.log('Lost Model Rotation:', lostModelRotation);
    });
  }
});
