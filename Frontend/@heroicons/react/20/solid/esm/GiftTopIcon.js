import * as React from "react";

function GiftTopIcon({
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
    d: "M9.25 3H3.5A1.5 1.5 0 002 4.5v4.75h3.365A2.75 2.75 0 019.25 5.362V3zM2 10.75v4.75A1.5 1.5 0 003.5 17h5.75v-4.876A4.75 4.75 0 015 14.75a.75.75 0 010-1.5 3.251 3.251 0 003.163-2.5H2zM10.75 17h5.75a1.5 1.5 0 001.5-1.5v-4.75h-6.163A3.251 3.251 0 0015 13.25a.75.75 0 010 1.5 4.75 4.75 0 01-4.25-2.626V17zM18 9.25V4.5A1.5 1.5 0 0016.5 3h-5.75v2.362a2.75 2.75 0 013.885 3.888H18zm-4.496-2.755a1.25 1.25 0 00-1.768 0c-.36.359-.526.999-.559 1.697-.01.228-.006.443.004.626.183.01.398.014.626.003.698-.033 1.338-.2 1.697-.559a1.25 1.25 0 000-1.767zm-5.24 0a1.25 1.25 0 00-1.768 1.767c.36.36 1 .526 1.697.56.228.01.443.006.626-.004.01-.183.015-.398.004-.626-.033-.698-.2-1.338-.56-1.697z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(GiftTopIcon);
export default ForwardRef;