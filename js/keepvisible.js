AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // The model inside the AR target
    const lostModel = document.querySelector('#lost-model');  // The free model

    // Helper function to convert local position to global
    function localToGlobal(el) {
      const globalPos = new THREE.Vector3();
      el.object3D.getWorldPosition(globalPos);
      return globalPos;
    }

    // Helper function to convert local rotation to global
    function localToGlobalRotation(el) {
      const globalRotation = el.object3D.rotation.clone();
      return {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
    }

    sceneEl.addEventListener('targetFound', () => {
      console.log('Target found');
      const startImage = document.getElementById('startImage');
      startImage.setAttribute('visible', 'false');
      trackedModel.setAttribute('visible', 'true');
      lostModel.setAttribute('visible', 'false');
    });

    sceneEl.addEventListener('targetLost', () => {
      console.log('Target lost');

      // Ensure trackedModel object3D is available
      const trackedModelObject = trackedModel.object3D;
      if (!trackedModelObject) {
        console.error('trackedModel.object3D is not available');
        return;
      }

      // Get the global position and rotation of the tracked model
      const globalPosition = localToGlobal(trackedModel);
      const globalRotation = localToGlobalRotation(trackedModel);
      console.log('Global Position:', globalPosition);
      console.log('Global Rotation (degrees):', globalRotation);

      // Remove any previous instance of the lost model from the scene
      const existingLostModel = document.querySelector('#lost-model');
      if (existingLostModel) {
        sceneEl.removeChild(existingLostModel);
      }

      // Create a new entity for the lost model
      const newLostModel = document.createElement('a-entity');
      newLostModel.setAttribute('id', 'lost-model');
      newLostModel.setAttribute('gltf-model', '#busto');  // Ensure this is correct
      newLostModel.setAttribute('scale', '2000 2000 2000');  // Use original scale
      newLostModel.setAttribute('visible', 'true');

      // Set position and rotation
      newLostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      newLostModel.setAttribute('rotation', `${globalRotation.x} ${globalRotation.y} ${globalRotation.z}`);

      // Append to scene and log confirmation
      sceneEl.appendChild(newLostModel);
      console.log('Lost model appended to scene with position and rotation');
      
      // Debugging to ensure the model is correctly updated
      const lostModelPosition = newLostModel.getAttribute('position');
      const lostModelRotation = newLostModel.getAttribute('rotation');
      const lostModelScale = newLostModel.getAttribute('scale');
      console.log('Lost Model Position:', lostModelPosition);
      console.log('Lost Model Rotation:', lostModelRotation);
      console.log('Lost Model Scale:', lostModelScale);
    });
  }
});
