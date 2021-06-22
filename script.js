const btn = document.querySelector('#save')

btn.addEventListener('click', () => {
  domtoimage.toPng(document.querySelector('#card'))
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})

var qrcode = new QRCode("qr-code", {
    text: "http://jindo.dev.naver.com/collie",
    width: 250,
    height: 250,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});