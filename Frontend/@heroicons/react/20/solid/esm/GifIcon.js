import * as React from "react";

function GifIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 001.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 00.133-.427V10a.75.75 0 00-.75-.75H6.25a.75.75 0 000 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871zM10.75 6a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75zm3 0h2.5a.75.75 0 010 1.5H14.5v1.75h.75a.75.75 0 010 1.5h-.75v2.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(GifIcon);
export default ForwardRef;