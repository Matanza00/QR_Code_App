import * as React from "react";

function VariableIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M19.253 2.292a.75.75 0 01.955.461A28.123 28.123 0 0121.75 12c0 3.266-.547 6.388-1.542 9.247a.75.75 0 11-1.416-.494c.94-2.7 1.458-5.654 1.458-8.753s-.519-6.054-1.458-8.754a.75.75 0 01.461-.954zm-14.227.013a.75.75 0 01.414.976A23.183 23.183 0 003.75 12c0 3.085.6 6.027 1.69 8.718a.75.75 0 01-1.39.563c-1.161-2.867-1.8-6-1.8-9.281 0-3.28.639-6.414 1.8-9.281a.75.75 0 01.976-.414zm4.275 5.052a1.5 1.5 0 012.21.803l.716 2.148L13.6 8.246a2.438 2.438 0 012.978-.892l.213.09a.75.75 0 11-.584 1.381l-.214-.09a.937.937 0 00-1.145.343l-2.021 3.033 1.084 3.255 1.445-.89a.75.75 0 11.786 1.278l-1.444.889a1.5 1.5 0 01-2.21-.803l-.716-2.148-1.374 2.062a2.437 2.437 0 01-2.978.892l-.213-.09a.75.75 0 01.584-1.381l.214.09a.938.938 0 001.145-.344l2.021-3.032-1.084-3.255-1.445.89a.75.75 0 11-.786-1.278l1.444-.89z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(VariableIcon);
export default ForwardRef;