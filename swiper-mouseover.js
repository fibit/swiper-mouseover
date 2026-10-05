/**
 * Swiper-Mouseover v2.2.0 for Swiper (https://github.com/fibit/swiper-mouseover)
 * Author Pavel Romanov
 * Released under the MIT License
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    const plugin = factory();

    module.exports = plugin;
    module.exports.MouseoverPlugin = plugin;
    module.exports.default = plugin;
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.MouseoverPlugin = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function MouseoverPlugin({ swiper, extendParams, on }) {
    const CLASS_LAYER = 'swiper-mouseover-layer';

    extendParams({
      mouseover: {
        el: null,
        reset: true
      }
    });

    const resolveElement = (selector) => {
      return typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
    };

    const isTouchDevice = () => {
      if (typeof window.matchMedia === 'function') {
        const hoverNone = window.matchMedia('(hover: none)').matches;
        const hoverHover = window.matchMedia('(hover: hover)').matches;

        if (hoverNone || hoverHover) return hoverNone;
      }

      return 'ontouchstart' in window;
    };

    const createMouseHandler = (slideToIndex) => function(slideIndex) {
      return function() {
        swiper.slideTo(slideToIndex ?? slideIndex, swiper.params.speed);
      };
    };

    const cleanupLayers = (container) => {
      const layers = container.querySelectorAll(`.${CLASS_LAYER}`);
      layers.forEach(layer => {
        const mouseOverHandler = layer._mouseOverHandler;
        const mouseOutHandler = layer._mouseOutHandler;

        if (mouseOverHandler) {
          layer.removeEventListener('mouseover', mouseOverHandler);
        }
        if (mouseOutHandler) {
          layer.removeEventListener('mouseout', mouseOutHandler);
        }

        delete layer._mouseOverHandler;
        delete layer._mouseOutHandler;
      });
      container.innerHTML = '';
    };

    const createLayers = (container) => {
      swiper.snapGrid.forEach((_, index) => {
        const layer = document.createElement('div');
        layer.className = CLASS_LAYER;
        container.appendChild(layer);

        const mouseOverHandler = createMouseHandler()(index);
        layer._mouseOverHandler = mouseOverHandler;
        layer.addEventListener('mouseover', mouseOverHandler);

        if (swiper.params.mouseover.reset) {
          const mouseOutHandler = createMouseHandler(0)(index);
          layer._mouseOutHandler = mouseOutHandler;
          layer.addEventListener('mouseout', mouseOutHandler);
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

    on('afterInit', initMouseover);
    on('destroy', cleanup);
  }

  return MouseoverPlugin;
});
