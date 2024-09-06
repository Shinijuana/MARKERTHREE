AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // The model inside the AR target
    const lostModel = document.querySelector('#lost-model');  // The free model

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

      // Set the lost model to be centered on the screen
      const centerPosition = '0 1.6 -2';  // Example values: center screen position, adjust as necessary
      const defaultRotation = '0 0 0';   // Default rotation for the lost model

      // Apply fixed position and rotation
      lostModel.setAttribute('position', centerPosition);
      lostModel.setAttribute('rotation', defaultRotation);

      // Make sure the lost model is visible
      lostModel.setAttribute('visible', 'true');

      // Debugging to ensure the model is correctly updated
      const lostModelPosition = lostModel.getAttribute('position');
      const lostModelRotation = lostModel.getAttribute('rotation');
      console.log('Lost Model Position (fixed):', lostModelPosition);
      console.log('Lost Model Rotation (fixed):', lostModelRotation);
    });
  }
});
