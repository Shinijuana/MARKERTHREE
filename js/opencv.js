AFRAME.registerComponent('tensorflow-contour-processor', {
  schema: {
    targetName: { type: 'string' },
  },

  async init() {
    await this.loadTensorFlow();
    this.loadOpenCV();
  },

  async loadTensorFlow() {
    if (!window.tf) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
      script.async = true;
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
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
    this.initializeTracking();
  },

  initializeTracking() {
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

          const kalman = new cv.KalmanFilter(4, 2);
          kalman.transitionMatrix = cv.matFromArray(4, 4, cv.CV_32F, [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1]);
          cv.setIdentity(kalman.measurementMatrix);
          cv.setIdentity(kalman.processNoiseCov, new cv.Scalar(1e-2));
          cv.setIdentity(kalman.measurementNoiseCov, new cv.Scalar(1e-1));
          cv.setIdentity(kalman.errorCovPost, new cv.Scalar(1));

          const processFrame = async () => {
            ctx.drawImage(video, 0, 0);
            const src = cv.imread(canvas);
            const gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

            const edges = new cv.Mat();
            cv.Canny(gray, edges, 50, 150);

            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

            if (contours.size() > 0) {
              const contour = contours.get(0);
              const boundingRect = cv.boundingRect(contour);
              
              let prediction = kalman.predict();
              let measurement = cv.matFromArray(2, 1, cv.CV_32F, [boundingRect.x, boundingRect.y]);
              let corrected = kalman.correct(measurement);

              cv.rectangle(src, boundingRect, [0, 255, 0, 255], 2);
            }

            cv.imshow(canvas, src);
            src.delete();
            gray.delete();
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
