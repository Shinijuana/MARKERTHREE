AFRAME.registerComponent('tensorflow-contour-processor', {
  schema: {
    targetName: { type: 'string' },
  },

  init() {
    this.loadOpenCV();
  },

  loadOpenCV() {
    if (!window.cv) {
      const opencvScript = document.createElement('script');
      opencvScript.src = 'https://docs.opencv.org/master/opencv.js';
      opencvScript.async = true;
      opencvScript.onload = () => this.onOpenCvReady();
      document.head.appendChild(opencvScript);
    } else {
      this.onOpenCvReady();
    }
  },

  onOpenCvReady() {
    this.initializeWebcamAndCanvas();
  },

  initializeWebcamAndCanvas() {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const processFrame = () => {
            ctx.drawImage(video, 0, 0);
            const src = cv.imread(canvas);
            const edges = new cv.Mat();

            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
            cv.Canny(src, edges, 50, 150);

            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

            for (let i = 0; i < contours.size(); i++) {
              const contour = contours.get(i);
              const approx = new cv.Mat();
              cv.approxPolyDP(contour, approx, 3, true);

              const boundingRect = cv.boundingRect(approx);
              cv.rectangle(src, boundingRect, [255, 0, 0, 255], 2);
              approx.delete();
            }

            cv.imshow(canvas, src);
            src.delete();
            edges.delete();
            contours.delete();
            hierarchy.delete();

            requestAnimationFrame(processFrame);
          };

          requestAnimationFrame(processFrame);
        };
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  },

  remove() {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    if (video) {
      video.pause();
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
      document.body.removeChild(video);
    }

    if (canvas) {
      document.body.removeChild(canvas);
    }
  },
});
