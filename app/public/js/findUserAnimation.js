let rotateCam;

let randomPoints = [];

for (var i = 0; i < 100; i++) {
	randomPoints.push(
		new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100)
	);
}

let spline = new THREE.SplineCurve3(randomPoints);
let camPosIndex = 0;

(function update() {
	rotateCam = requestAnimationFrame(update);

	camPosIndex += 0.4;

	if (camPosIndex > 300) {
		cancelAnimationFrame(rotateCam);

		new TWEEN.Tween(camera.position).to({
			x: 0,
			y: 0,
			z: -300
		}, 5000).easing(TWEEN.Easing.Quintic.InOut).start().onComplete(function () {
			console.log('done!');
			showUserInfo();
		});
	}

	let camPos = spline.getPoint(camPosIndex / 10000);
	let camRot = spline.getTangent(camPosIndex / 1000000);

	camera.position.x = camPos.x;
	camera.position.y = camPos.y;
	camera.position.z = camPos.z;

	camera.rotation.x = camRot.x;
	camera.rotation.y = camRot.y;
	camera.rotation.z = camRot.z;

	let target = [];
	target[0] = camera.position.x;
	target[1] = camera.position.y;
	target[2] = camera.position.z;

	camera.lookAt(spline.getPoint((camPosIndex + 1) / 100000));
}).call(this);

////////////////////////show user info carts
function showUserInfo () {
	$('.mast__title').css('opacity', '0');
	$('hr').css('opacity', '0');
	$('.mast__text').css('opacity', '0');

	$('.userName').css('opacity', '1');

	setTimeout(() => {
		$('.bg_img').css('opacity', '1');
		$('.mainWords').css('opacity', '1');
		$('.topMenu').css('opacity', '1');
		$('.blue_figure').css('opacity', '1');
		$('.charts').css('opacity', '1');

		setTimeout(() => {
			animateBar();
		}, 1000);
	}, 1500);
}

setTimeout(() => {
	$('.animatedText').css('opacity', '1');
	(function($) {
		var s,
		spanizeLetters = {
			settings: {
				letters: $('.js-spanize'),
			},
			init: function() {
				s = this.settings;
				this.bindEvents();
			},
			bindEvents: function(){
				s.letters.html(function (i, el) {
					//spanizeLetters.joinChars();
					var spanizer = $.trim(el).split("");
					return '<span>' + spanizer.join('</span><span>') + '</span>';
				});
			},
		};
		spanizeLetters.init();
	})(jQuery);
}, 2000);

function animateBar () {
	bar.text.style.fontSize = '0.5rem';

  bar.animate(0.75);

  // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar2.text.style.fontSize = '0.5rem';

  bar2.animate(0.87);


  var ctx = document.getElementById("bar_chart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      datasets: [{
        label: 'age',
        data: [100, 87, 86, 57, 39, 63],
        backgroundColor: 'rgba(78, 216, 218, 1)',
        borderColor: 'rgba(50,50,50,1)',
        borderWidth: 0
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}