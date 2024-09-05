AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // The model inside the AR target
    const lostModel = document.querySelector('#lost-model');  // The free model

    // Create an anchor entity to hold the lostModel
    const anchor = document.createElement('a-entity');
    anchor.setAttribute('id', 'lost-model-anchor');
    anchor.setAttribute('position', '0 0 0');
    sceneEl.appendChild(anchor);
    console.log('Anchor entity created and appended to the scene:', anchor);

    // Helper function to convert local position to global
    function localToGlobal(el) {
      const globalPos = new THREE.Vector3();
      el.object3D.getWorldPosition(globalPos);
      return globalPos;
    }

    // Helper function to convert global rotation to Euler angles
    function quaternionToEuler(quat) {
      const euler = new THREE.Euler().setFromQuaternion(quat);
      return euler;
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

      // Get rotation as a quaternion and then convert to Euler angles
      const globalQuaternion = trackedModelObject.getWorldQuaternion(new THREE.Quaternion());
      const globalRotation = quaternionToEuler(globalQuaternion);
      console.log('Global Position:', globalPosition);
      console.log('Global Rotation (radians):', globalRotation);

      // Convert global rotation to degrees
      const rotationDegrees = {
        x: THREE.MathUtils.radToDeg(globalRotation.x),
        y: THREE.MathUtils.radToDeg(globalRotation.y),
        z: THREE.MathUtils.radToDeg(globalRotation.z)
      };
      console.log('Global Rotation (degrees):', rotationDegrees);

      // Set the lost model's position and rotation relative to the anchor
      anchor.setAttribute('position', `${globalPosition.x} ${globalPosition.y} ${globalPosition.z}`);
      anchor.setAttribute('rotation', `${rotationDegrees.x} ${rotationDegrees.y} ${rotationDegrees.z}`);
      console.log('Anchor entity position and rotation set to:', anchor.getAttribute('position'), anchor.getAttribute('rotation'));

      // Attach the lostModel to the anchor
      anchor.appendChild(lostModel);
      console.log('Lost model appended to anchor:', lostModel);

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
