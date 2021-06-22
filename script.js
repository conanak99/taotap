const app = new Vue({
  el: "#app",
  data: {
    name: "Phạm Huy Hoàng",
    url: "https://linktr.ee/codedao",
    qrCode: undefined
  },
  mounted: function() {
    const qrCode = new QRCode("qr-code", {
      text: this.url,
      width: 300,
      height: 300
    });
    this.qrCode = qrCode;
  },
  methods: {
    exportCard: async () => {
      const dataUrl = await domtoimage.toPng(document.querySelector("#card"))
      
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);

        const link = document.createElement("a");
        link.download = "taotap-card.jpeg";
        link.href = dataUrl;
        link.click();
      
    }
  }
});
