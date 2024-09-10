AFRAME.registerComponent('tensorflow-contour-processor', {
  schema: {
    targetName: { type: 'string' },
  },

  init() {
    this.loadOpenCV();
    this.src = new cv.Mat(); // Pre-alloca le matrici
    this.dst = new cv.Mat();
  },

  loadOpenCV() {
    console.log('Loading OpenCV.js...');

    if (!window.cv) {
      const opencvScript = document.createElement('script');
      opencvScript.src = 'https://docs.opencv.org/master/opencv.js';
      opencvScript.async = true;
      opencvScript.onload = () => {
        console.log('OpenCV.js script loaded.');
        this.initializeWebcamAndCanvas();
      };
      opencvScript.onerror = () => {
        console.error('Failed to load OpenCV.js script.');
      };
      document.head.appendChild(opencvScript);
    } else {
      console.log('OpenCV.js is already loaded.');
      this.initializeWebcamAndCanvas();
    }
  },

  initializeWebcamAndCanvas() {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    console.log('Initializing webcam...');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          console.log('Webcam initialized. Video dimensions:', video.videoWidth, video.videoHeight);

          const processFrame = () => {
            ctx.drawImage(video, 0, 0);
            cv.imread(canvas, this.src);
            
            // Pre-processing
            cv.cvtColor(this.src, this.src, cv.COLOR_RGBA2GRAY);
            cv.GaussianBlur(this.src, this.src, new cv.Size(5, 5), 0); // Aggiungi Gaussian Blur
            cv.Canny(this.src, this.dst, 50, 150); // Rilevamento bordi

            cv.imshow(canvas, this.dst);

            console.log('Frame processed.');
            requestAnimationFrame(processFrame);
          };
          requestAnimationFrame(processFrame);
        };
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  },

  remove() {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    if (video) {
      if (!video.paused) {
        video.pause();
      }
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
      document.body.removeChild(video);
    }

    if (canvas) {
      document.body.removeChild(canvas);
    }

    this.src.delete();  // Elimina le matrici quando il componente viene rimosso
    this.dst.delete();

    console.log('Cleanup complete.');
  },
});
