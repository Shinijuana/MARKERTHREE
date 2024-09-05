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
      const globalRotation = new THREE.Euler().setFromQuaternion(trackedModelObject.getWorldQuaternion(new THREE.Quaternion()));

      console.log('Global Position:', globalPosition);
      console.log('Global Rotation (radians):', globalRotation);

      // Convert global rotation to degrees
      const rotationDegrees = {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
      console.log('Global Rotation (degrees):', rotationDegrees);

      // Set the lost model's position and rotation
      lostModel.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      lostModel.setAttribute('rotation', `${rotationDegrees.x} ${rotationDegrees.y} ${rotationDegrees.z}`);

      // Make sure the lost model is visible
      lostModel.setAttribute('visible', 'true');

      // Debugging to ensure the model is correctly updated
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      const lostModelScale = lostModel.getAttribute('scale');
      console.log('Lost Model Position:', lostModelPosition);
      console.log('Lost Model Rotation:', lostModelRotation);
      console.log('Lost Model Scale:', lostModelScale);
    });
  }
});
