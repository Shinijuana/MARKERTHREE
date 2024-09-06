AFRAME.registerComponent('keep-visible-on-lost', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const trackedModel = document.querySelector('#tracked-model');  // The model inside the AR target
    const lostModel = document.querySelector('#lost-model');  // The free model

    let usingMindAR = true;

    // Helper function to convert local position to global
    function localToGlobal(el) {
      const globalPos = new THREE.Vector3();
      el.object3D.getWorldPosition(globalPos);
      return globalPos;
    }

    // Helper function to switch tracking systems
    function switchToARJS() {
      // Make MindAR inactive and AR.js active
      sceneEl.setAttribute('mindar-image', 'enabled: false');
      sceneEl.setAttribute('arjs-nft', 'enabled: true');
    }

    function switchToMindAR() {
      // Make AR.js inactive and MindAR active
      sceneEl.setAttribute('mindar-image', 'enabled: true');
      sceneEl.setAttribute('arjs-nft', 'enabled: false');
    }

    // Listen for MindAR targetFound and targetLost events
    sceneEl.addEventListener('targetFound', () => {
      console.log('MindAR Target found');
      if (usingMindAR) {
        const startImage = document.getElementById('startImage');
        startImage.setAttribute('visible', 'false');
        trackedModel.setAttribute('visible', 'true');
        lostModel.setAttribute('visible', 'false');
      }
    });

    sceneEl.addEventListener('targetLost', () => {
      console.log('MindAR Target lost');
      if (usingMindAR) {
        // Switch to AR.js for NFT tracking
        switchToARJS();
        usingMindAR = false;

        // Get the global position and rotation of the tracked model
        const globalPosition = localToGlobal(trackedModel);
        const globalRotation = new THREE.Euler().setFromQuaternion(trackedModel.object3D.getWorldQuaternion(new THREE.Quaternion()));

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
        lostModel.setAttribute('visible', 'true');

        // Debugging to ensure the model is correctly updated
        const lostModelPosition = lostModel.getAttribute('position');
        const lostModelRotation = lostModel.getAttribute('rotation');
        const lostModelScale = lostModel.getAttribute('scale');
        console.log('Lost Model Position:', lostModelPosition);
        console.log('Lost Model Rotation:', lostModelRotation);
        console.log('Lost Model Scale:', lostModelScale);
      }
    });

    // Listen for AR.js NFT found and lost events
    sceneEl.addEventListener('nftFound', () => {
      console.log('AR.js NFT found');
      if (!usingMindAR) {
        // Switch back to MindAR
        switchToMindAR();
        usingMindAR = true;

        // Hide the lost model and show the tracked model
        lostModel.setAttribute('visible', 'false');
        trackedModel.setAttribute('visible', 'true');

        const startImage = document.getElementById('startImage');
        startImage.setAttribute('visible', 'false');
      }
    });

    sceneEl.addEventListener('nftLost', () => {
      console.log('AR.js NFT lost');
      if (!usingMindAR) {
        // Keep the lost model visible and keep tracking with AR.js
        lostModel.setAttribute('visible', 'true');
        trackedModel.setAttribute('visible', 'false');
      }
    });
  }
});
