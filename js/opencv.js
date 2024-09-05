 // Componente A-Frame
 AFRAME.registerComponent('tensorflow-contour-processor', {
    schema: {
      targetName: {type: 'string'},
    },
  
    init() {
      // Carica OpenCV.js
      this.loadOpenCV()
    },
  
    loadOpenCV() {
      // Aggiungi messaggio di debug
      console.log('Loading OpenCV.js...')
  
      // Carica OpenCV.js se non è già stato caricato
      if (!window.cv) {
        const opencvScript = document.createElement('script')
        opencvScript.src = 'https://docs.opencv.org/master/opencv.js'
        opencvScript.async = true
        opencvScript.onload = () => {
          console.log('OpenCV.js script loaded.')
        }
        opencvScript.onerror = () => {
          console.error('Failed to load OpenCV.js script.')
        }
        document.head.appendChild(opencvScript)
      } else {
        // Se OpenCV.js è già stato caricato, chiama direttamente l'inizializzazione
        console.log('OpenCV.js is already loaded.')
        onOpenCvReady()
      }
    },
  
    initializeWebcamAndCanvas() {
      const video = document.createElement('video')
      video.setAttribute('autoplay', '')
      document.body.appendChild(video)
  
      const canvas = document.createElement('canvas')
      document.body.appendChild(canvas)
      const ctx = canvas.getContext('2d')
  
      // Messaggio di debug
      console.log('Initializing webcam...')
  
      navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          video.srcObject = stream
          video.onloadedmetadata = () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
  
            // Messaggio di debug
            console.log('Webcam initialized. Video dimensions:', video.videoWidth, video.videoHeight)
  
            // Loop per il rilevamento
            const processFrame = () => {
              ctx.drawImage(video, 0, 0)
              const src = cv.imread(canvas)
              const dst = new cv.Mat()
              cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY)
              cv.Canny(src, dst, 50, 100)
              cv.imshow(canvas, dst)
  
              // Messaggi di debug
              console.log('Frame processed.')
              console.log('Source matrix shape:', src.rows, src.cols)
              console.log('Destination matrix shape:', dst.rows, dst.cols)
  
              src.delete()
              dst.delete()
              requestAnimationFrame(processFrame)
            }
            requestAnimationFrame(processFrame)
          }
        })
        .catch((err) => {
          console.error('Error accessing webcam:', err)
        })
    },
  
    remove() {
      // Pulizia
      const video = document.querySelector('video')
      const canvas = document.querySelector('canvas')
  
      if (video) {
        if (!video.paused) {
          video.pause()
        }
        if (video.srcObject) {
          video.srcObject.getTracks().forEach(track => track.stop())
        }
        document.body.removeChild(video)
      }
  
      if (canvas) {
        document.body.removeChild(canvas)
      }
  
      // Messaggio di debug
      console.log('Cleanup complete.')
    },
  })