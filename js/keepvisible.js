AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // The model inside the AR target
    const lostModel = document.querySelector('#lost-model');  // The free model

    // Listen for MindAR targetFound and targetLost events
    sceneEl.addEventListener('targetFound', () => {
      console.log('Target found');
      const startImage = document.getElementById('startImage');
      startImage.setAttribute('visible', 'false');  // Hide start image
      trackedModel.setAttribute('visible', 'true');  // Show tracked model
      lostModel.setAttribute('visible', 'false');    // Hide lost model
    });

    sceneEl.addEventListener('targetLost', () => {
      console.log('Target lost');
      
      // Simply manage the visibility: hide tracked model, show lost model
      trackedModel.setAttribute('visible', 'false');  // Hide tracked model
      lostModel.setAttribute('visible', 'true');      // Show lost model

      // Debugging to check visibility state
      console.log('Tracked Model Visible:', trackedModel.getAttribute('visible'));
      console.log('Lost Model Visible:', lostModel.getAttribute('visible'));
    });
  }
});
