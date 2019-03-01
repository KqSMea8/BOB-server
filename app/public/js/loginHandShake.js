socket.on('message', function (msg) {
  doSlideDown(msg, () => {
    var json = {
      data: msg
    };

    console.log(JSON.parse(json.data.text.replace(/&quot;/g, '"')).data.cust_core_no);
    updateLoginPageUI();

    function updateLoginPageUI() {
      $('.processing').css('opacity', '1');
      $('#side_decoration_center').attr('src', '../assets/fly.gif');
      $('#side_decoration_center').css({
        'opacity': '1',
        'transform': 'translateY(0)'
      });
      $('#mainTitle').text('0');

      setTimeout(() => {
        var mainNum = new CountUp('mainTitle', 0, '100', 0, 8, options);
        if (!mainNum.error) {
          mainNum.start();
        } else {
          console.error(mainNum.error);
        }
        setTimeout(() => {
          const data = JSON.parse(json.data.text.replace(/&quot;/g, '"'))
          console.log(data)
          slideDown('persona.html', `custCoreNo=${data.data.cust_core_no}`);
        }, 8000);
      }, 1000);
    }
  })
})