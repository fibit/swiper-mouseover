# Swiper-Mouseover
Small plugin for [Swiper](https://github.com/nolimits4web/swiper).
Adds the ability to automatically change slides with mouse movement.

## Demo
:point_right: https://codesandbox.io/p/sandbox/swiper-mouseover-q9h6cf

## How use

#### 1. Include Swiper
See https://swiperjs.com/get-started#installation

#### 2. Include Mouseover:
Pull-in a latest version with NPM:
```
npm i swiper-mouseover
```
and provide <link> to the required:
```html
<link href="/path/to/swiper-mouseover.min.css" rel="stylesheet">
<script src="/path/to/swiper-mouseover.min.js"></script>
```
or use CDN:
```html
<link href="https://cdn.jsdelivr.net/gh/fibit/swiper-mouseover@main/swiper-mouseover.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/fibit/swiper-mouseover@main/swiper-mouseover.min.js"></script>
```

#### 3. Add Swiper HTML Layout:
```html
<div class="swiper mySwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    ...
  </div>
  <div class="swiper-mouseover"></div>
</div>
```

#### 4. Initialize Swiper with Mouseover:
```js
const swiper = new Swiper('.mySwiper', {
  modules: [MouseoverPlugin],
  mouseover: {
    el: '.swiper-mouseover',
    reset: true // reset to first slide on mouseout
  }
});
```

## Key Features
- Native Swiper Integration: Works like other official Swiper modules;
- Touch Device Detection: Automatically disabled on touchscreen devices;
- Customizable: Specify your own mouseover element selector;
- Lightweight: Adds minimal overhead to your bundle;
- Accessible: Preserves standard Swiper functionality.

## Behavior Notes
- The plugin creates transparent overlay layers that intercept mouse events;
- Standard Swiper controls remain visible but non-interactive when mouseover is active;
- Slides automatically return to the first position when mouse leaves the container;
- Fully compatible with other Swiper plugins and features.
