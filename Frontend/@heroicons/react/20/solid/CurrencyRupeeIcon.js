const React = require("react");

function CurrencyRupeeIcon({
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
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM6 5.75A.75.75 0 016.75 5h6.5a.75.75 0 010 1.5h-2.127c.4.5.683 1.096.807 1.75h1.32a.75.75 0 010 1.5h-1.32a4.003 4.003 0 01-3.404 3.216l1.754 1.754a.75.75 0 01-1.06 1.06l-3-3a.75.75 0 01.53-1.28H8c1.12 0 2.067-.736 2.386-1.75H6.75a.75.75 0 010-1.5h3.636A2.501 2.501 0 008 6.5H6.75A.75.75 0 016 5.75z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(CurrencyRupeeIcon);
module.exports = ForwardRef;