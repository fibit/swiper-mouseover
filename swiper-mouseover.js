/**
 * Swiper-Mouseover v1.0.0 for Swiper (https://github.com/fibit/swiper-mouseover)
 * Author Pavel Romanov
 * Released under the MIT License
 */
Swiper.prototype.mouseover = function() {
  const swiper = this;
  const container = swiper.wrapperEl.parentElement;
  const mouseoverLayerClass = 'swiper-mouseover-layer';
  let mouseover = container.querySelector('.swiper-mouseover');

  if ('ontouchstart' in window) {
    if (mouseover) {
      mouseover.remove();
    }
    return false;
  }

  if (!mouseover) {
    mouseover = document.createElement('div');
    mouseover.className = 'swiper-mouseover';
    container.appendChild(mouseover);
  } else {
    mouseover.innerHTML = '';
  }

  mouseover.querySelectorAll(`.${mouseoverLayerClass}`).forEach(element => {
    element.removeEventListener('mouseover', handleMouseOver);
    element.removeEventListener('mouseout', handleMouseOut);
  });

  for (let i = 0; i < swiper.snapGrid.length; i++) {
    const mouseoverLayer = document.createElement('div');
    mouseoverLayer.className = mouseoverLayerClass;
    mouseoverLayer.setAttribute('swiper-slide-index', i);
    mouseover.appendChild(mouseoverLayer);
    mouseoverLayer.addEventListener('mouseover', handleMouseOver);
    mouseoverLayer.addEventListener('mouseout', handleMouseOut);
  }

  function handleMouseOver() {
    const index = this.getAttribute('swiper-slide-index');
    swiper.slideTo(index, swiper.params.speed);
  }

  function handleMouseOut() {
    swiper.slideTo(0, swiper.params.speed);
  }
};