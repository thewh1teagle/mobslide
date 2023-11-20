import QRCodeStyling, { Options } from "qr-code-styling";

const options: Options = {
  width: 300,
  height: 300,
  data: "",
  margin: 0,
  qrOptions: {
    mode: "Byte",
    errorCorrectionLevel: "Q",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
  },
  dotsOptions: {
    type: "extra-rounded",
    color: "#000000",
  },
  backgroundOptions: {
    color: "transparent",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#1FB1E2",
  },
  cornersDotOptions: {
    type: "square",
    color: "#1FB1E2",
  },
};

function getOptions(url: string) {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    ...options,
    data: url,
    dotsOptions: {
      type: "extra-rounded",
      color: isDark ? "white" : "black",
    },
  } as Options;
}

export function createQR(data: string) {
  return new QRCodeStyling(getOptions(data));
}

export function updateQR(url: string, qr: QRCodeStyling) {
  qr.update(getOptions(url));
}
