/**
 * Swiper-Mouseover v2.1.0 for Swiper (https://github.com/fibit/swiper-mouseover)
 * Author Pavel Romanov
 * Released under the MIT License
 */
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

  const isTouchDevice = () => 'ontouchstart' in window;

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
