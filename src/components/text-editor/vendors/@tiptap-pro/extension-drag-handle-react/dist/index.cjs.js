"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e = require("../../extension-drag-handle"),
  t = require("react");
function r(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
var n = r(t);
const l = (r) => {
  const {
      className: l = "drag-handle",
      children: u,
      editor: a,
      pluginKey: i = e.dragHandlePluginDefaultKey,
      onNodeChange: s,
      tippyOptions: d = {},
    } = r,
    [o, p] = t.useState(null),
    c = t.useRef(null);
  return (
    t.useEffect(
      () =>
        o
          ? a.isDestroyed
            ? () => null
            : (c.current ||
                ((c.current = e.DragHandlePlugin({
                  editor: a,
                  element: o,
                  pluginKey: i,
                  tippyOptions: d,
                  onNodeChange: s,
                })),
                a.registerPlugin(c.current)),
              () => {
                a.unregisterPlugin(i);
              })
          : () => null,
      [o, a, s, i],
    ),
    n.default.createElement("div", { className: l, ref: p }, u)
  );
};
(exports.DragHandle = l), (exports.default = l);
