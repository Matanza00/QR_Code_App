const React = require("react");

function SignalSlashIcon({
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
    d: "M2.47 2.47a.75.75 0 011.06 0l8.407 8.407a1.125 1.125 0 011.186 1.186l1.462 1.461a3.001 3.001 0 00-.464-3.645.75.75 0 111.061-1.061 4.501 4.501 0 01.486 5.79l1.072 1.072a6.001 6.001 0 00-.497-7.923.75.75 0 011.06-1.06 7.501 7.501 0 01.505 10.05l1.064 1.065a9 9 0 00-.508-12.176.75.75 0 011.06-1.06c3.923 3.922 4.093 10.175.512 14.3l1.594 1.594a.75.75 0 11-1.06 1.06l-2.106-2.105-2.121-2.122h-.001l-4.705-4.706a.747.747 0 01-.127-.126L2.47 3.53a.75.75 0 010-1.061zm1.189 4.422a.75.75 0 01.326 1.01 9.004 9.004 0 001.651 10.462.75.75 0 11-1.06 1.06C1.27 16.12.63 11.165 2.648 7.219a.75.75 0 011.01-.326zM5.84 9.134a.75.75 0 01.472.95 6 6 0 001.444 6.159.75.75 0 01-1.06 1.06A7.5 7.5 0 014.89 9.606a.75.75 0 01.95-.472zm2.341 2.653a.75.75 0 01.848.638c.088.62.37 1.218.849 1.696a.75.75 0 01-1.061 1.061 4.483 4.483 0 01-1.273-2.546.75.75 0 01.637-.848z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(SignalSlashIcon);
module.exports = ForwardRef;