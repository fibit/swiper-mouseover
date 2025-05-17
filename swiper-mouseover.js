/**
 * Swiper-Mouseover v2.0.1 for Swiper (https://github.com/fibit/swiper-mouseover)
 * Author Pavel Romanov
 * Released under the MIT License
 */
function MouseoverPlugin({ swiper, extendParams, on }) {
  extendParams({
    mouseover: {
      el: null
    }
  });

  const initMouseover = () => {
    const { el } = swiper.params.mouseover;
    
    if (!el) return;
    
    const mouseoverEl = typeof el === 'string' 
      ? document.querySelector(el) 
      : el;
    
    if (!mouseoverEl) return;

    if ('ontouchstart' in window) {
      mouseoverEl.remove();
      return;
    }

    mouseoverEl.innerHTML = '';

    mouseoverEl.querySelectorAll('.swiper-mouseover-layer').forEach(el => {
      el.removeEventListener('mouseover', handleMouseOver);
      el.removeEventListener('mouseout', handleMouseOut);
    });

    for (let i = 0; i < swiper.snapGrid.length; i++) {
      const layer = document.createElement('div');
      layer.className = 'swiper-mouseover-layer';
      layer.setAttribute('data-swiper-slide-index', i);
      mouseoverEl.appendChild(layer);
      layer.addEventListener('mouseover', handleMouseOver);
      layer.addEventListener('mouseout', handleMouseOut);
    }

    function handleMouseOver() {
      const slideIndex = parseInt(this.getAttribute('data-swiper-slide-index'));
      swiper.slideTo(slideIndex, swiper.params.speed);
    }

    function handleMouseOut() {
      swiper.slideTo(0, swiper.params.speed);
    }
  };

  on('afterInit', initMouseover);
  on('destroy', () => {
    const { el } = swiper.params.mouseover;
    if (el) {
      const mouseoverEl = typeof el === 'string' ? document.querySelector(el) : el;
      if (mouseoverEl) mouseoverEl.remove();
    }
  });
};
