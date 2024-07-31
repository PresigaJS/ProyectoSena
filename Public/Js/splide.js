document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      interval: 3000,
      autoplay: true,
      pagination: false,
      arrows: false,
  });

  splide.mount();
});
