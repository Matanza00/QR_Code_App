const React = require("react");

function ArrowUturnDownIcon({
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
    d: "M2.232 12.207a.75.75 0 011.06.025l3.958 4.146V6.375a5.375 5.375 0 0110.75 0V9.25a.75.75 0 01-1.5 0V6.375a3.875 3.875 0 00-7.75 0v10.003l3.957-4.146a.75.75 0 011.085 1.036l-5.25 5.5a.75.75 0 01-1.085 0l-5.25-5.5a.75.75 0 01.025-1.06z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(ArrowUturnDownIcon);
module.exports = ForwardRef;