!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports, require("../../extension-drag-handle"), require("react"))
    : "function" == typeof define && define.amd
      ? define(["exports", "../../extension-drag-handle", "react"], n)
      : n(
          ((e = "undefined" != typeof globalThis ? globalThis : e || self)[
            "../../extension-drag-handle-react"
          ] = {}),
          e.extensionDragHandle,
          e.React,
        );
})(this, function (e, n, t) {
  "use strict";
  function r(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var a = r(t);
  const i = (e) => {
    const {
        className: r = "drag-handle",
        children: i,
        editor: l,
        pluginKey: o = n.dragHandlePluginDefaultKey,
        onNodeChange: u,
        tippyOptions: d = {},
      } = e,
      [s, p] = t.useState(null),
      f = t.useRef(null);
    return (
      t.useEffect(
        () =>
          s
            ? l.isDestroyed
              ? () => null
              : (f.current ||
                  ((f.current = n.DragHandlePlugin({
                    editor: l,
                    element: s,
                    pluginKey: o,
                    tippyOptions: d,
                    onNodeChange: u,
                  })),
                  l.registerPlugin(f.current)),
                () => {
                  l.unregisterPlugin(o);
                })
            : () => null,
        [s, l, u, o],
      ),
      a.default.createElement("div", { className: r, ref: p }, i)
    );
  };
  (e.DragHandle = i),
    (e.default = i),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
