AFRAME.registerComponent('ending', {
  init() {
    const refr = document.getElementById('reload');
    const download = document.getElementById('down');

    if (refr) {
      refr.onclick = () => {
        window.location.reload();
      };
    }

    if (download) {
      download.onclick = () => {
        const downloadUrl = 'https://drive.google.com/uc?export=download&id=1DqanjcQqU1FXM29gRwWMe5noW_TxAj2U';
        window.open(downloadUrl, '_self');
      };
    }
  }
});
