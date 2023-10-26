# Swiper-Mouseover
Small plugin for [Swiper](https://github.com/nolimits4web/swiper).
Adds the ability to automatically change slides with mouse movement.

## Demo
:point_right: https://codesandbox.io/s/magical-sea-zxwfjs

## How use

#### 1. Include Swiper
See https://swiperjs.com/get-started#installation

#### 2. Include Mouseover:
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
</div>
```

#### 4. Initialize Swiper with Mouseover:
```js
const swiper = new Swiper('.mySwiper', {
  on: {
    init: function() {
      this.mouseover();
    },
  },
});
```

## Important features
- Swiper-Mouseover generates hidden layers over the slides to monitor mouse movements, rendering all active slider elements unclickable. For instance, if you incorporate pagination or navigation elements, they will serve a purely decorative purpose;
- Swiper-Mouseover is automatically disabled on devices with touchscreen support. In other words, Swiper will function as usual on all mobile devices.
