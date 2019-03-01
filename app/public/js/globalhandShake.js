  var socket = io('http://localhost:8004', {

    // 实际使用中可以在这里传递参数
    query: {},

    transports: ['websocket']
  });

  socket.on('connect', function () {
    console.log('open');
  });

  //handle sliding animations between different scenes
  function slideDown(url, data) {
    console.log(url, data)
    var pageDiv = document.getElementsByClassName('transition-item'),
      _slideDown = new TimelineMax({
        paused: true
      }),
      slideUp = new TimelineMax({
        paused: true
      }),
      loadAnimation = new TimelineMax({
        repeat: 0
      });

    _slideDown.staggerTo(pageDiv, 0.5, {
      bottom: "0%",
      ease: Power2.easeIn
    }, 0.2);

    slideUp.staggerTo(pageDiv, 0.5, {
      bottom: "100%",
      ease: Power2.easeOut,
      delay: 1
    }, 0.2);

    loadAnimation.add(_slideDown.play(), 0.5)
    setTimeout(function () {
      window.location.href = '/' + url + (data ? `?${data}` : '');
    }, 2000);
  }

  //handle Lushan button on click
  function showWelcomeElements() {
    new TWEEN.Tween(camera.position).to({
      x: 0,
      y: 0,
      z: 300
    }, 1000).easing(TWEEN.Easing.Quintic.InOut).start();
    setTimeout(() => {
      $('ul').css('opacity', '1');
    }, 500)
    TweenMax.staggerFrom(".item", 0.5, {
      opacity: 0,
      y: -100,
      delay: 0.5,
      ease: Back.easeIn
    }, 0.2)
    setTimeout(() => {
      $('#text').css('opacity', '1');
      $('#text').css('transform', 'translateY(-20px)');
    }, 2000);
    setTimeout(() => {
      $('#text').css('opacity', '0');
      $('#text').css('transform', 'none');
      new TWEEN.Tween(camera.position).to({
        x: 0,
        y: 0,
        z: 100
      }, 1000).easing(TWEEN.Easing.Quintic.InOut).start();
      //   slideDown('lushan.html');
    }, 7500);
  }

  var doSlideDown = (msg, cb) => {
    var json = {
      data: msg
    };

    if (json.data.text === "initLushan") {
      console.log('initializing lushan page');
      slideDown('lushan.html');
    } else if (json.data.text === "mainEntry") {
      console.log('main entry !');
      showWelcomeElements();
    } else if (json.data.text === "initDenglu") {
      console.log('initializing denglu page');
      slideDown('denglu.html');
    } else if (json.data.text === "backToIndex") {
      console.log('going back to home page');
      slideDown('index.html');
    } else if (json.data.text === "initTianjia") {
      console.log('initializing tianjia page', slideDown);
      slideDown('tianjia.html');
    } else {
      cb()
    }
  }