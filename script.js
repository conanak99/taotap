const btn = document.querySelector('#save')

btn.addEventListener('click', () => {
  domtoimage.toPng(document.querySelector('#card'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    
     var link = document.createElement('a');
        link.download = 'taotap-card.jpeg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})

var qrcode = new QRCode("qr-code", {
    text: "https://linktr.ee/codedao",
    width: 300,
    height: 300
});

function getBase64(src) {
    console.log('urlurlurlurl', src);
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous'; // 允许跨域
      img.onload = () => {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        var canvas = $('<canvas width="' + width + '" height="' + height + '"></canvas>')[0];
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      img.onerror = err => {
        console.error('图片转base64失败！');
        reject(err);
      };
      img.src = src;
    });
  }
