AFRAME.registerComponent('advanced-tracking', {
 init() {
    this.setupMediapipe();
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
  },

  setupMediapipe() {
    // Creazione del video
    const video = document.createElement("video");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.style.display = "none";
    document.body.appendChild(video);
    this.videoElement = video;

    // Creazione del canvas
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    canvas.style.display = "none";
    document.body.appendChild(canvas);
    this.canvasElement = canvas;
    this.canvasCtx = canvas.getContext("2d");

    // Configura MediaPipe Objectron
    const objectron = new Objectron({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`,
    });

    objectron.setOptions({
      modelName: "card",
      maxNumObjects: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    objectron.onResults((results) => this.onResults(results));

    // Avvia la webcam
    this.startVideo(objectron);
  },

  startVideo(objectron) {
    // Richiesta di accesso alla webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.srcObject = stream;
        this.videoElement.addEventListener("loadeddata", () => {
          this.processVideo(objectron); // Avvia Mediapipe quando il video è pronto
        });
      })
      .catch((err) => {
        console.error("Errore con la webcam:", err);
      });
  },

  processVideo(objectron) {
    const onFrame = () => {
      if (this.videoElement.readyState >= 2) {
        objectron.send({ image: this.videoElement });
      }
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);
  },

  onResults(results) {
    const entity = document.querySelector("#tracked-model");

    if (results.detectedObjects.length > 0) {
      const object = results.detectedObjects[0];
      const center = object.keypoints[0];
      const x = (center.x - 0.5) * 5;
      const y = -(center.y - 0.5) * 5;

      if (entity) {
        entity.setAttribute("position", `${x} ${y} -2`);
      }
    }

    // Disegna sul canvas (opzionale)
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

    results.detectedObjects.forEach((detectedObject) => {
      drawConnectors(this.canvasCtx, detectedObject.keypoints, OBJECTRON_CONNECTIONS, {
        color: "#FF0000",
        lineWidth: 2,
      });
      drawLandmarks(this.canvasCtx, detectedObject.keypoints, { color: "#00FF00", lineWidth: 2 });
    });

    this.canvasCtx.restore();
  },
});
