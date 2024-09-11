AFRAME.registerComponent('tensorflow-contour-processor', {
  schema: {
    targetName: {type: 'string'},
  },

  init() {
    this.loadOpenCV();
  },

  loadOpenCV() {
    console.log('Loading OpenCV.js...');

    if (!window.cv) {
      const opencvScript = document.createElement('script');
      opencvScript.src = 'https://docs.opencv.org/master/opencv.js';
      opencvScript.async = true;
      opencvScript.onload = () => {
        console.log('OpenCV.js script loaded.');
        this.onOpenCvReady();
      };
      opencvScript.onerror = () => {
        console.error('Failed to load OpenCV.js script.');
      };
      document.head.appendChild(opencvScript);
    } else {
      console.log('OpenCV.js is already loaded.');
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

    console.log('Initializing webcam...');

    navigator.mediaDevices.getUserMedia({video: true})
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          console.log('Webcam initialized. Video dimensions:', video.videoWidth, video.videoHeight);

          const processFrame = () => {
            ctx.drawImage(video, 0, 0);
            const src = cv.imread(canvas);
            const edges = new cv.Mat();

            // Convert to grayscale
            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);

            // Apply Canny edge detection
            cv.Canny(src, edges, 50, 100);

            // Do not display the edges on the canvas
            // cv.imshow(canvas, edges); // Comment this line to disable visual feedback

            // You can add additional logic here if needed to use the edge data
            // For example, process edges for further use or analysis

            console.log('Frame processed.');
            console.log('Edges matrix shape:', edges.rows, edges.cols);

            src.delete();
            edges.delete();
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

    console.log('Cleanup complete.');
  },
});
