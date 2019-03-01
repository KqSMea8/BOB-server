  var pageDiv = document.getElementsByClassName('transition-item'),
    slideDown = new TimelineMax({
      paused: true
    }),
    // loading = new TimelineMax({paused : true , repeat : 2}),
    slideUp = new TimelineMax({
      paused: true
    }),
    loadAnimation = new TimelineMax({
      repeat: 0
    });

  slideDown.staggerTo(pageDiv, 0.5, {
    bottom: "0%",
    ease: Power2.easeIn
  }, 0.2);

  slideUp.staggerTo(pageDiv, 0.5, {
    bottom: "100%",
    ease: Power2.easeOut,
    delay: 1
  }, 0.2);

  function slideDown() {
    loadAnimation.add(slideDown.play(), 0.5, function () {
      window.location.href = 'index.html';
      window.location.reload()
    })
  }

  $(document).ready(function () {
    loadAnimation.add(slideUp.play(), 0.5)
  });