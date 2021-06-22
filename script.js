const btn = document.querySelector("#save");

btn.addEventListener("click", () => {
  domtoimage.toPng(document.querySelector("#card")).then(function(dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);

    const link = document.createElement("a");
    link.download = "taotap-card.jpeg";
    link.href = dataUrl;
    link.click();
  });
});

const qrcode = new QRCode("qr-code", {
  text: "https://linktr.ee/codedao",
  width: 300,
  height: 300
});
