!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("@tiptap/core"),
        require("@tiptap/extension-collaboration"),
        require("@tiptap/pm/state"),
        require("tippy.js"),
        require("y-prosemirror"),
        require("../../extension-node-range"),
      )
    : "function" == typeof define && define.amd
      ? define(
          [
            "exports",
            "@tiptap/core",
            "@tiptap/extension-collaboration",
            "@tiptap/pm/state",
            "tippy.js",
            "y-prosemirror",
            "../../extension-node-range",
          ],
          t,
        )
      : t(
          ((e = "undefined" != typeof globalThis ? globalThis : e || self)[
            "../../extension-drag-handle"
          ] = {}),
          e.core,
          e.extensionCollaboration,
          e.state,
          e.tippy,
          e.yProsemirror,
          e.extensionNodeRange,
        );
})(this, function (e, t, n, o, r, i, s) {
  "use strict";
  function l(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  var d = l(r);
  function a(e) {
    const t = e.cloneNode(!0),
      n = [e, ...Array.from(e.getElementsByTagName("*"))],
      o = [t, ...Array.from(t.getElementsByTagName("*"))];
    return (
      n.forEach((e, t) => {
        o[t].style.cssText = (function (e) {
          let t = "";
          const n = getComputedStyle(e);
          for (let e = 0; e < n.length; e += 1)
            t += `${n[e]}:${n.getPropertyValue(n[e])};`;
          return t;
        })(e);
      }),
      t
    );
  }
  const p = (e) => {
    const { x: t, y: n, direction: o, editor: r } = e;
    let i = null,
      s = null,
      l = null,
      d = t;
    for (; null === s && d < window.innerWidth && d > 0; ) {
      const e = document.elementsFromPoint(d, n),
        t = e.findIndex((e) => e.classList.contains("ProseMirror")),
        a = e.slice(0, t);
      if (a.length > 0) {
        const e = a[0];
        if (((i = e), (l = r.view.posAtDOM(e, 0)), l >= 0)) {
          (s = r.state.doc.nodeAt(Math.max(l - 1, 0))),
            (null == s ? void 0 : s.isText) &&
              (s = r.state.doc.nodeAt(Math.max(l - 1, 0))),
            s || (s = r.state.doc.nodeAt(Math.max(l, 0)));
          break;
        }
      }
      "left" === o ? (d -= 1) : (d += 1);
    }
    return { resultElement: i, resultNode: s, pos: null != l ? l : null };
  };
  function c(e, t) {
    return window.getComputedStyle(e)[t];
  }
  function u(e = 0, t = 0, n = 0) {
    return Math.min(Math.max(e, t), n);
  }
  function g(e) {
    var t;
    null === (t = e.parentNode) || void 0 === t || t.removeChild(e);
  }
  function f(e, t) {
    const { doc: n } = t.view.state,
      o = p({ editor: t, x: e.clientX, y: e.clientY, direction: "right" });
    if (!o.resultNode || null === o.pos) return [];
    const r = e.clientX,
      i = (function (e, t, n) {
        const o = parseInt(c(e.dom, "paddingLeft"), 10),
          r = parseInt(c(e.dom, "paddingRight"), 10),
          i = parseInt(c(e.dom, "borderLeftWidth"), 10),
          s = parseInt(c(e.dom, "borderLeftWidth"), 10),
          l = e.dom.getBoundingClientRect();
        return { left: u(t, l.left + o + i, l.right - r - s), top: n };
      })(t.view, r, e.clientY),
      l = t.view.posAtCoords(i);
    if (!l) return [];
    const { pos: d } = l;
    if (!n.resolve(d).parent) return [];
    const a = n.resolve(o.pos),
      g = n.resolve(o.pos + 1);
    return s.getSelectionRanges(a, g, 0);
  }
  const m = (e, t) => {
      const n = e.resolve(t),
        { depth: o } = n;
      if (0 === o) return t;
      return n.pos - n.parentOffset - 1;
    },
    y = (e, t) => {
      const n = e.nodeAt(t),
        o = e.resolve(t);
      let { depth: r } = o,
        i = n;
      for (; r > 0; ) {
        const e = o.node(r);
        (r -= 1), 0 === r && (i = e);
      }
      return i;
    },
    h = (e, t) => {
      const n = i.ySyncPluginKey.getState(e);
      return n
        ? i.absolutePositionToRelativePosition(t, n.type, n.binding.mapping)
        : null;
    },
    v = (e, t) => {
      let n = t;
      for (; n && n.parentNode && n.parentNode !== e.dom; ) n = n.parentNode;
      return n;
    },
    x = new o.PluginKey("dragHandle"),
    b = ({
      pluginKey: e = x,
      element: t,
      editor: r,
      tippyOptions: l,
      onNodeChange: c,
    }) => {
      const u = document.createElement("div");
      let b,
        C = null,
        E = !1,
        P = null,
        D = -1;
      return (
        t.addEventListener("dragstart", (e) => {
          !(function (e, t) {
            const { view: n } = t;
            if (!e.dataTransfer) return;
            const { empty: o, $from: r, $to: i } = n.state.selection,
              l = f(e, t),
              d = s.getSelectionRanges(r, i, 0),
              p = d.some((e) =>
                l.find((t) => t.$from === e.$from && t.$to === e.$to),
              ),
              c = o || !p ? l : d;
            if (!c.length) return;
            const { tr: u } = n.state,
              m = document.createElement("div"),
              y = c[0].$from.pos,
              h = c[c.length - 1].$to.pos,
              v = s.NodeRangeSelection.create(n.state.doc, y, h),
              x = v.content();
            c.forEach((e) => {
              const t = a(n.nodeDOM(e.$from.pos));
              m.append(t);
            }),
              (m.style.position = "absolute"),
              (m.style.top = "-10000px"),
              document.body.append(m),
              e.dataTransfer.clearData(),
              e.dataTransfer.setDragImage(m, 0, 0),
              (n.dragging = { slice: x, move: !0 }),
              u.setSelection(v),
              n.dispatch(u),
              document.addEventListener("drop", () => g(m), { once: !0 });
          })(e, r),
            setTimeout(() => {
              t && (t.style.pointerEvents = "none");
            }, 0);
        }),
        t.addEventListener("dragend", () => {
          t && (t.style.pointerEvents = "auto");
        }),
        new o.Plugin({
          key: "string" == typeof e ? new o.PluginKey(e) : e,
          state: {
            init: () => ({ locked: !1 }),
            apply(e, o, s, l) {
              const d = e.getMeta("lockDragHandle"),
                a = e.getMeta("hideDragHandle");
              if ((void 0 !== d && (E = d), a && C))
                return (
                  C.hide(),
                  (E = !1),
                  (P = null),
                  (D = -1),
                  null == c || c({ editor: r, node: null, pos: -1 }),
                  o
                );
              if (e.docChanged && -1 !== D && t && C)
                if (n.isChangeOrigin(e)) {
                  const e = ((e, t) => {
                    const n = i.ySyncPluginKey.getState(e);
                    return n
                      ? i.relativePositionToAbsolutePosition(
                          n.doc,
                          n.type,
                          t,
                          n.binding.mapping,
                        ) || 0
                      : -1;
                  })(l, b);
                  e !== D && (D = e);
                } else {
                  const t = e.mapping.map(D);
                  t !== D && ((D = t), (b = h(l, D)));
                }
              return o;
            },
          },
          view: (e) => {
            var n;
            return (
              (t.draggable = !0),
              (t.style.pointerEvents = "auto"),
              null === (n = r.view.dom.parentElement) ||
                void 0 === n ||
                n.appendChild(u),
              u.appendChild(t),
              (u.style.pointerEvents = "none"),
              (u.style.position = "absolute"),
              (u.style.top = "0"),
              (u.style.left = "0"),
              (C = d.default(e.dom, {
                getReferenceClientRect: null,
                interactive: !0,
                trigger: "manual",
                placement: "left-start",
                hideOnClick: !1,
                duration: 100,
                popperOptions: {
                  modifiers: [
                    { name: "flip", enabled: !1 },
                    {
                      name: "preventOverflow",
                      options: { rootBoundary: "document", mainAxis: !1 },
                    },
                  ],
                },
                ...l,
                appendTo: u,
                content: t,
              })),
              {
                update(n, o) {
                  if (!t || !C) return;
                  if (((t.draggable = !E), e.state.doc.eq(o.doc) || -1 === D))
                    return;
                  let i = e.nodeDOM(D);
                  if (((i = v(e, i)), i === e.dom)) return;
                  if (1 !== (null == i ? void 0 : i.nodeType)) return;
                  const s = e.posAtDOM(i, 0),
                    l = y(r.state.doc, s),
                    d = m(r.state.doc, s);
                  (P = l),
                    (D = d),
                    (b = h(e.state, D)),
                    null == c || c({ editor: r, node: P, pos: D }),
                    C.setProps({
                      getReferenceClientRect: () => i.getBoundingClientRect(),
                    });
                },
                destroy() {
                  null == C || C.destroy(), t && g(u);
                },
              }
            );
          },
          props: {
            handleDOMEvents: {
              mouseleave: (e, t) => (
                E ||
                  (t.target &&
                    !u.contains(t.relatedTarget) &&
                    (null == C || C.hide(),
                    (P = null),
                    (D = -1),
                    null == c || c({ editor: r, node: null, pos: -1 }))),
                !1
              ),
              mousemove(e, n) {
                if (!t || !C || E) return !1;
                const o = p({
                  x: n.clientX,
                  y: n.clientY,
                  direction: "right",
                  editor: r,
                });
                if (!o.resultElement) return !1;
                let i = o.resultElement;
                if (((i = v(e, i)), i === e.dom)) return !1;
                if (1 !== (null == i ? void 0 : i.nodeType)) return !1;
                const s = e.posAtDOM(i, 0),
                  l = y(r.state.doc, s);
                if (l !== P) {
                  const t = m(r.state.doc, s);
                  (P = l),
                    (D = t),
                    (b = h(e.state, D)),
                    null == c || c({ editor: r, node: P, pos: D }),
                    C.setProps({
                      getReferenceClientRect: () => i.getBoundingClientRect(),
                    }),
                    C.show();
                }
                return !1;
              },
            },
          },
        })
      );
    },
    C = t.Extension.create({
      name: "dragHandle",
      addOptions: () => ({
        render() {
          const e = document.createElement("div");
          return e.classList.add("drag-handle"), e;
        },
        tippyOptions: {},
        locked: !1,
        onNodeChange: () => null,
      }),
      addCommands() {
        return {
          lockDragHandle:
            () =>
            ({ editor: e }) => (
              (this.options.locked = !0),
              e.commands.setMeta("lockDragHandle", this.options.locked)
            ),
          unlockDragHandle:
            () =>
            ({ editor: e }) => (
              (this.options.locked = !1),
              e.commands.setMeta("lockDragHandle", this.options.locked)
            ),
          toggleDragHandle:
            () =>
            ({ editor: e }) => (
              (this.options.locked = !this.options.locked),
              e.commands.setMeta("lockDragHandle", this.options.locked)
            ),
        };
      },
      addProseMirrorPlugins() {
        const e = this.options.render();
        return [
          b({
            tippyOptions: this.options.tippyOptions,
            element: e,
            editor: this.editor,
            onNodeChange: this.options.onNodeChange,
          }),
        ];
      },
    });
  (e.DragHandle = C),
    (e.DragHandlePlugin = b),
    (e.default = C),
    (e.dragHandlePluginDefaultKey = x),
    Object.defineProperty(e, "__esModule", { value: !0 });
});