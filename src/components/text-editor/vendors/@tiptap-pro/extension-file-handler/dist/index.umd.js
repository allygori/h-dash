!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@tiptap/core"),require("@tiptap/pm/state")):"function"==typeof define&&define.amd?define(["exports","@tiptap/core","@tiptap/pm/state"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["@tiptap-pro/extension-file-handler"]={},e.core,e.state)}(this,(function(e,t,o){"use strict";const i=({key:e,editor:t,onPaste:i,onDrop:n,allowedMimeTypes:r})=>new o.Plugin({key:e||new o.PluginKey("fileHandler"),props:{handleDrop(e,o){var i;if(!n)return!1;if(!(null===(i=o.dataTransfer)||void 0===i?void 0:i.files.length))return!1;const l=e.posAtCoords({left:o.clientX,top:o.clientY});let a=Array.from(o.dataTransfer.files);return r&&(a=a.filter((e=>r.includes(e.type)))),0!==a.length&&(o.preventDefault(),o.stopPropagation(),n(t,a,(null==l?void 0:l.pos)||0),!0)},handlePaste(e,o){var n;if(!i)return!1;if(!(null===(n=o.clipboardData)||void 0===n?void 0:n.files.length))return!1;let l=Array.from(o.clipboardData.files);const a=o.clipboardData.getData("text/html");return r&&(l=l.filter((e=>r.includes(e.type)))),0!==l.length&&(o.preventDefault(),o.stopPropagation(),i(t,l,a),!(a.length>0))}}}),n=t.Extension.create({name:"fileHandler",addOptions:()=>({onPaste:void 0,onDrop:void 0,allowedMimeTypes:void 0}),addProseMirrorPlugins(){return[i({key:new o.PluginKey(this.name),editor:this.editor,allowedMimeTypes:this.options.allowedMimeTypes,onDrop:this.options.onDrop,onPaste:this.options.onPaste})]}});e.FileHandlePlugin=i,e.FileHandler=n,e.default=n,Object.defineProperty(e,"__esModule",{value:!0})}));
