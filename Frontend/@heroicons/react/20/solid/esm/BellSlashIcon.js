import * as React from "react";

function BellSlashIcon({
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
    d: "M4 8c0-.26.017-.517.049-.77l7.722 7.723a33.56 33.56 0 01-3.722-.01 2 2 0 003.862.15l1.134 1.134a3.5 3.5 0 01-6.53-1.409 32.91 32.91 0 01-3.257-.508.75.75 0 01-.515-1.076A11.448 11.448 0 004 8zM17.266 13.9a.756.756 0 01-.068.116L6.389 3.207A6 6 0 0116 8c.001 1.887.455 3.665 1.258 5.234a.75.75 0 01.01.666zM3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06L3.28 2.22z"
  }));
}

const ForwardRef = React.forwardRef(BellSlashIcon);
export default ForwardRef;