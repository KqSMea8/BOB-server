$("#menu li").each(function(i) {
    $(this).delay(500 * i).fadeIn(500);
});

var easingFn = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
    }
    var options = {
      useEasing: true, 
      easingFn: easingFn, 
      useGrouping: true, 
      separator: ',', 
      decimal: '.', 
    };

    setTimeout(() => {
        var mainNum = new CountUp('mainNum', 0, 200000000, 0, 13, options);
        if (!mainNum.error) {
            mainNum.start();
        } else {
          console.error(mainNum.error);
        }
}, 2200);

    setTimeout(() => {
            var topNum = new CountUp('topNum', 0, 342, 0, 2.5, options);
            if (!topNum.error) {
                topNum.start();
            } else {
              console.error(topNum.error);
            }
    }, 3500);

    setTimeout(() => {
        var bottomNum = new CountUp('bottomNum', 0, 20070342, 0, 2.5, options);
            if (!bottomNum.error) {
                bottomNum.start();
            } else {
              console.error(bottomNum.error);
            }
    }, 4000);