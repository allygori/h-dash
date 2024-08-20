"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e = require("@tiptap/core"),
  t = require("@tiptap/extension-collaboration"),
  n = require("@tiptap/pm/state"),
  o = require("tippy.js"),
  r = require("y-prosemirror"),
  i = require("../../extension-node-range");
function s(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
var l = s(o);
function d(e) {
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
const a = (e) => {
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
function p(e = 0, t = 0, n = 0) {
  return Math.min(Math.max(e, t), n);
}
function u(e) {
  var t;
  null === (t = e.parentNode) || void 0 === t || t.removeChild(e);
}
function g(e, t) {
  const { doc: n } = t.view.state,
    o = a({ editor: t, x: e.clientX, y: e.clientY, direction: "right" });
  if (!o.resultNode || null === o.pos) return [];
  const r = e.clientX,
    s = (function (e, t, n) {
      const o = parseInt(c(e.dom, "paddingLeft"), 10),
        r = parseInt(c(e.dom, "paddingRight"), 10),
        i = parseInt(c(e.dom, "borderLeftWidth"), 10),
        s = parseInt(c(e.dom, "borderLeftWidth"), 10),
        l = e.dom.getBoundingClientRect();
      return { left: p(t, l.left + o + i, l.right - r - s), top: n };
    })(t.view, r, e.clientY),
    l = t.view.posAtCoords(s);
  if (!l) return [];
  const { pos: d } = l;
  if (!n.resolve(d).parent) return [];
  const u = n.resolve(o.pos),
    g = n.resolve(o.pos + 1);
  return i.getSelectionRanges(u, g, 0);
}
const m = (e, t) => {
    const n = e.resolve(t),
      { depth: o } = n;
    if (0 === o) return t;
    return n.pos - n.parentOffset - 1;
  },
  f = (e, t) => {
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
  y = (e, t) => {
    const n = r.ySyncPluginKey.getState(e);
    return n
      ? r.absolutePositionToRelativePosition(t, n.type, n.binding.mapping)
      : null;
  },
  h = (e, t) => {
    let n = t;
    for (; n && n.parentNode && n.parentNode !== e.dom; ) n = n.parentNode;
    return n;
  },
  v = new n.PluginKey("dragHandle"),
  x = ({
    pluginKey: e = v,
    element: o,
    editor: s,
    tippyOptions: c,
    onNodeChange: p,
  }) => {
    const x = document.createElement("div");
    let C,
      E = null,
      D = !1,
      M = null,
      P = -1;
    return (
      o.addEventListener("dragstart", (e) => {
        !(function (e, t) {
          const { view: n } = t;
          if (!e.dataTransfer) return;
          const { empty: o, $from: r, $to: s } = n.state.selection,
            l = g(e, t),
            a = i.getSelectionRanges(r, s, 0),
            c = a.some((e) =>
              l.find((t) => t.$from === e.$from && t.$to === e.$to),
            ),
            p = o || !c ? l : a;
          if (!p.length) return;
          const { tr: m } = n.state,
            f = document.createElement("div"),
            y = p[0].$from.pos,
            h = p[p.length - 1].$to.pos,
            v = i.NodeRangeSelection.create(n.state.doc, y, h),
            x = v.content();
          p.forEach((e) => {
            const t = d(n.nodeDOM(e.$from.pos));
            f.append(t);
          }),
            (f.style.position = "absolute"),
            (f.style.top = "-10000px"),
            document.body.append(f),
            e.dataTransfer.clearData(),
            e.dataTransfer.setDragImage(f, 0, 0),
            (n.dragging = { slice: x, move: !0 }),
            m.setSelection(v),
            n.dispatch(m),
            document.addEventListener("drop", () => u(f), { once: !0 });
        })(e, s),
          setTimeout(() => {
            o && (o.style.pointerEvents = "none");
          }, 0);
      }),
      o.addEventListener("dragend", () => {
        o && (o.style.pointerEvents = "auto");
      }),
      new n.Plugin({
        key: "string" == typeof e ? new n.PluginKey(e) : e,
        state: {
          init: () => ({ locked: !1 }),
          apply(e, n, i, l) {
            const d = e.getMeta("lockDragHandle"),
              a = e.getMeta("hideDragHandle");
            if ((void 0 !== d && (D = d), a && E))
              return (
                E.hide(),
                (D = !1),
                (M = null),
                (P = -1),
                null == p || p({ editor: s, node: null, pos: -1 }),
                n
              );
            if (e.docChanged && -1 !== P && o && E)
              if (t.isChangeOrigin(e)) {
                const e = ((e, t) => {
                  const n = r.ySyncPluginKey.getState(e);
                  return n
                    ? r.relativePositionToAbsolutePosition(
                        n.doc,
                        n.type,
                        t,
                        n.binding.mapping,
                      ) || 0
                    : -1;
                })(l, C);
                e !== P && (P = e);
              } else {
                const t = e.mapping.map(P);
                t !== P && ((P = t), (C = y(l, P)));
              }
            return n;
          },
        },
        view: (e) => {
          var t;
          return (
            (o.draggable = !0),
            (o.style.pointerEvents = "auto"),
            null === (t = s.view.dom.parentElement) ||
              void 0 === t ||
              t.appendChild(x),
            x.appendChild(o),
            (x.style.pointerEvents = "none"),
            (x.style.position = "absolute"),
            (x.style.top = "0"),
            (x.style.left = "0"),
            (E = l.default(e.dom, {
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
              ...c,
              appendTo: x,
              content: o,
            })),
            {
              update(t, n) {
                if (!o || !E) return;
                if (((o.draggable = !D), e.state.doc.eq(n.doc) || -1 === P))
                  return;
                let r = e.nodeDOM(P);
                if (((r = h(e, r)), r === e.dom)) return;
                if (1 !== (null == r ? void 0 : r.nodeType)) return;
                const i = e.posAtDOM(r, 0),
                  l = f(s.state.doc, i),
                  d = m(s.state.doc, i);
                (M = l),
                  (P = d),
                  (C = y(e.state, P)),
                  null == p || p({ editor: s, node: M, pos: P }),
                  E.setProps({
                    getReferenceClientRect: () => r.getBoundingClientRect(),
                  });
              },
              destroy() {
                null == E || E.destroy(), o && u(x);
              },
            }
          );
        },
        props: {
          handleDOMEvents: {
            mouseleave: (e, t) => (
              D ||
                (t.target &&
                  !x.contains(t.relatedTarget) &&
                  (null == E || E.hide(),
                  (M = null),
                  (P = -1),
                  null == p || p({ editor: s, node: null, pos: -1 }))),
              !1
            ),
            mousemove(e, t) {
              if (!o || !E || D) return !1;
              const n = a({
                x: t.clientX,
                y: t.clientY,
                direction: "right",
                editor: s,
              });
              if (!n.resultElement) return !1;
              let r = n.resultElement;
              if (((r = h(e, r)), r === e.dom)) return !1;
              if (1 !== (null == r ? void 0 : r.nodeType)) return !1;
              const i = e.posAtDOM(r, 0),
                l = f(s.state.doc, i);
              if (l !== M) {
                const t = m(s.state.doc, i);
                (M = l),
                  (P = t),
                  (C = y(e.state, P)),
                  null == p || p({ editor: s, node: M, pos: P }),
                  E.setProps({
                    getReferenceClientRect: () => r.getBoundingClientRect(),
                  }),
                  E.show();
              }
              return !1;
            },
          },
        },
      })
    );
  },
  C = e.Extension.create({
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
        x({
          tippyOptions: this.options.tippyOptions,
          element: e,
          editor: this.editor,
          onNodeChange: this.options.onNodeChange,
        }),
      ];
    },
  });
(exports.DragHandle = C),
  (exports.DragHandlePlugin = x),
  (exports.default = C),
  (exports.dragHandlePluginDefaultKey = v);
