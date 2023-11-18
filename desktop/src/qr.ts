import QRCodeStyling, {Options} from "qr-code-styling";

const options: Options = {
    width: 300,
    height: 300,
    data: "",
    margin: 0,
    qrOptions: {

      mode: "Byte",
      errorCorrectionLevel: "Q"
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#2786ec"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#595959"
    },
    cornersDotOptions: {
      type: "square",
      color: "#595959"
    },
  }

  export function createQR(data: string) {
    return new QRCodeStyling({...options, data})
  }