  var pageDiv = document.getElementsByClassName('transition-item'),
    loading = new TimelineMax({
      paused: true,
      repeat: 2
    }),
    _slideUp = new TimelineMax({
      paused: true
    }),
    loadAnimation = new TimelineMax({
      repeat: 0
    });

  _slideUp.staggerTo(pageDiv, 0.5, {
    bottom: "100%",
    ease: Power2.easeOut,
    delay: 1
  }, 0.2);

  $(document).ready(function () {
    loadAnimation.add(_slideUp.play(), 0.5)
  });