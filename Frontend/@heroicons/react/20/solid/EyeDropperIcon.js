const React = require("react");

function EyeDropperIcon({
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
    d: "M12.1 3.667a3.502 3.502 0 116.782 1.738 3.487 3.487 0 01-.907 1.57 3.495 3.495 0 01-1.617.919L16 7.99V10a.75.75 0 01-.22.53l-.25.25a.75.75 0 01-1.06 0l-.845-.844L7.22 16.34A2.25 2.25 0 015.629 17H5.12a.75.75 0 00-.53.22l-1.56 1.56a.75.75 0 01-1.061 0l-.75-.75a.75.75 0 010-1.06l1.56-1.561a.75.75 0 00.22-.53v-.508c0-.596.237-1.169.659-1.59l6.405-6.406-.844-.845a.75.75 0 010-1.06l.25-.25A.75.75 0 0110 4h2.01l.09-.333zM4.72 13.84l6.405-6.405 1.44 1.439-6.406 6.405a.75.75 0 01-.53.22H5.12c-.258 0-.511.044-.75.129a2.25 2.25 0 00.129-.75v-.508a.75.75 0 01.22-.53z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(EyeDropperIcon);
module.exports = ForwardRef;