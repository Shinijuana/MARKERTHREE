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

    // Funzione per convertire la scala locale in scala globale
    function localToGlobalScale(el) {
      const globalScale = new THREE.Vector3();
      el.object3D.getWorldScale(globalScale);
      return globalScale;
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

      // Ottenere la posizione globale, la rotazione e la scala del modello tracciato
      const globalPosition = localToGlobal(trackedModel);
      const globalRotation = new THREE.Euler().setFromQuaternion(trackedModelObject.getWorldQuaternion(new THREE.Quaternion()));
      const globalScale = localToGlobalScale(trackedModel);

      console.log('Global Position:', globalPosition);
      console.log('Global Rotation (radians):', globalRotation);
      console.log('Global Scale:', globalScale);

      // Convertire la rotazione globale in gradi
      const rotationDegrees = {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
      console.log('Global Rotation (degrees):', rotationDegrees);

      // Impostare la posizione, rotazione e scala del modello perso
      lostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      lostModel.setAttribute('rotation', `${rotationDegrees.x} ${rotationDegrees.y} ${rotationDegrees.z}`);
      lostModel.setAttribute('scale', `${globalScale.x} ${globalScale.y} ${globalScale.z}`);

      // Aggiornare la matrice del lostModel manualmente per assicurare che resti fisso nel mondo
      lostModel.object3D.matrixAutoUpdate = false;
      lostModel.object3D.updateMatrixWorld(true);

      // Assicurarsi che il modello perso sia visibile
      lostModel.setAttribute('visible', 'true');

      // Debugging per verificare che il modello sia aggiornato correttamente
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      const lostModelScale = lostModel.getAttribute('scale');
      console.log('Lost Model Position:', lostModelPosition);
      console.log('Lost Model Rotation:', lostModelRotation);
      console.log('Lost Model Scale:', lostModelScale);
    });
  }
});
