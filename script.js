const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const readFile = file => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = function() {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
};

const getBackgrounds = () => {
  const backgrounds = [
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F1.jpg?v=1624806666676",
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F2.jpg?v=1624806671981",
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F3.jpg?v=1624806699166",
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F4.jpg?v=1624806704706",
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F5.jpg?v=1624806707766",
    "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2F6.jpg?v=1624806710754"
  ];

  return Promise.all(backgrounds.map(bg => toDataURL(bg)));
};

const app = new Vue({
  el: "#app",
  data: {
    name: "Phạm Huy Hoàng",
    url: "https://linktr.ee/codedao",
    backgrounds: [],
    background: "white",
    showLogo: true,
    logo:
      "https://cdn.glitch.com/d08bb326-e251-4744-9266-f454d653c7c1%2Fwhite-logo.png?v=1624366965601",
    fontSize: 85,
    qrCode: undefined
  },
  mounted: async function() {
    const qrCode = new QRCode("qr-code", {
      text: this.url,
      width: 275,
      height: 275
    });
    this.qrCode = qrCode;

    const backgrounds = await getBackgrounds();
    this.backgrounds = backgrounds;
    this.background = backgrounds[0];
  },
  watch: {
    url: function(value) {
      this.qrCode.clear();
      this.qrCode.makeCode(value);
    }
  },
  methods: {
    changeLogo: async function(event) {
      const file = event.target.files[0];
      this.logo = await readFile(file);
    },
    changeCustomBg: async function(event) {
      const file = event.target.files[0];
      this.background = await readFile(file);
      this.backgrounds.push(this.background);
    },
    exportCard: async () => {
      const dataUrl = await domtoimage.toPng(document.querySelector("#card"));

      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);

      const link = document.createElement("a");
      link.download = "taotap-card.png";
      link.href = dataUrl;
      link.click();
    },
    exportPDF: async () => {
      const { jsPDF } = window.jspdf;

      const dataUrl = await domtoimage.toPng(document.querySelector("#card"));

      const img = new Image();
      img.src = dataUrl;

      const doc = new jsPDF();
      const RATIO = 1.02;
      const WIDTH = 85.5 * RATIO;
      const HEIGHT = 54 * RATIO;
      doc.addImage(img, "JPEG", 10, 10, WIDTH, HEIGHT);
      doc.addImage(img, "JPEG", 10, 70, WIDTH, HEIGHT);
      doc.save("taotap.pdf");
    },
    setBackground: function(bg) {
      this.background = bg;
    }
  }
});
