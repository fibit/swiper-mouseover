var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// swiper-mouseover.js
var require_swiper_mouseover = __commonJS({
  "swiper-mouseover.js"(exports, module) {
    (function(root, factory) {
      if (typeof module === "object" && module.exports) {
        const plugin2 = factory();
        module.exports = plugin2;
        module.exports.MouseoverPlugin = plugin2;
        module.exports.default = plugin2;
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.MouseoverPlugin = factory();
      }
    })(typeof globalThis !== "undefined" ? globalThis : exports, function() {
      "use strict";
      function MouseoverPlugin({ swiper, extendParams, on }) {
        const CLASS_LAYER = "swiper-mouseover-layer";
        extendParams({
          mouseover: {
            el: null,
            reset: true
          }
        });
        const resolveElement = (selector) => {
          return typeof selector === "string" ? document.querySelector(selector) : selector;
        };
        const isTouchDevice = () => {
          if (typeof window.matchMedia === "function") {
            const hoverNone = window.matchMedia("(hover: none)").matches;
            const hoverHover = window.matchMedia("(hover: hover)").matches;
            if (hoverNone || hoverHover) return hoverNone;
          }
          return "ontouchstart" in window;
        };
        const createMouseHandler = (slideToIndex) => function(slideIndex) {
          return function() {
            swiper.slideTo(slideToIndex ?? slideIndex, swiper.params.speed);
          };
        };
        const cleanupLayers = (container) => {
          const layers = container.querySelectorAll(`.${CLASS_LAYER}`);
          layers.forEach((layer) => {
            const mouseOverHandler = layer._mouseOverHandler;
            const mouseOutHandler = layer._mouseOutHandler;
            if (mouseOverHandler) {
              layer.removeEventListener("mouseover", mouseOverHandler);
            }
            if (mouseOutHandler) {
              layer.removeEventListener("mouseout", mouseOutHandler);
            }
            delete layer._mouseOverHandler;
            delete layer._mouseOutHandler;
          });
          container.innerHTML = "";
        };
        const createLayers = (container) => {
          swiper.snapGrid.forEach((_, index) => {
            const layer = document.createElement("div");
            layer.className = CLASS_LAYER;
            container.appendChild(layer);
            const mouseOverHandler = createMouseHandler()(index);
            layer._mouseOverHandler = mouseOverHandler;
            layer.addEventListener("mouseover", mouseOverHandler);
            if (swiper.params.mouseover.reset) {
              const mouseOutHandler = createMouseHandler(0)(index);
              layer._mouseOutHandler = mouseOutHandler;
              layer.addEventListener("mouseout", mouseOutHandler);
            }
          });
        };
        const initMouseover = () => {
          const { el } = swiper.params.mouseover;
          if (!el) return;
          const mouseoverEl = resolveElement(el);
          if (!mouseoverEl) return;
          if (isTouchDevice()) {
            mouseoverEl.remove();
            return;
          }
          cleanupLayers(mouseoverEl);
          createLayers(mouseoverEl);
        };
        const cleanup = () => {
          const { el } = swiper.params.mouseover;
          if (el) {
            const mouseoverEl = resolveElement(el);
            if (mouseoverEl) mouseoverEl.remove();
          }
        };
        on("afterInit", initMouseover);
        on("destroy", cleanup);
      }
      return MouseoverPlugin;
    });
  }
});

// <stdin>
var import_swiper_mouseover = __toESM(require_swiper_mouseover());
var stdin_default = import_swiper_mouseover.default;
var export_MouseoverPlugin = import_swiper_mouseover.default;
export {
  export_MouseoverPlugin as MouseoverPlugin,
  stdin_default as default
};
