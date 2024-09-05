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

      // Listen for MindAR targetFound and targetLost events
      sceneEl.addEventListener('targetFound', () => {
        console.log('Target found');
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

        // Get the global position of the tracked model
        const globalPosition = localToGlobal(trackedModel);
        console.log('Global Position:', globalPosition);

        // Set the lost model's position to the global position of the tracked model
        lostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
        lostModel.setAttribute('rotation', '0 0 0'); // Reset rotation

        // Set the scale to 100
        lostModel.setAttribute('scale', '100 100 100');
        console.log('Scale set to 100');

        // Make sure the lost model is visible
        lostModel.setAttribute('visible', 'true');

        // Debugging to ensure the model is correctly updated
        const lostModelPosition = lostModel.getAttribute('position');
        const lostModelScale = lostModel.getAttribute('scale');
        console.log('Lost Model Position:', lostModelPosition);
        console.log('Lost Model Scale:', lostModelScale);
      });
    }
  });

  // Apply the keep-visible-on-lost component to the scene
  document.querySelector('a-scene').setAttribute('keep-visible-on-lost', '');
