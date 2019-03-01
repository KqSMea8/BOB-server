setTimeout(() => {
	new TWEEN.Tween(camera.position).to({
		x: stacks[1].position.x,
		y: stacks[1].position.y,
		z: 30
	}, 8000).easing(TWEEN.Easing.Quintic.InOut).start().onComplete(function () {
		console.log('done!');
		highlightDot();
	});
}, 2000);


function highlightDot() {
	$('.mask').css('opacity', '0.8');
	setTimeout(() => {
		$('.user_dot').css({
			'opacity': '1',
			'width': '80px'
		});

		setTimeout(() => {
			$('.user_dot').css({
				'left': '23%'
			});

			showUserInfo();
		}, 2000);
	}, 500);
}


////////////////////////show user info carts
function showUserInfo() {
	$('#button1').css('opacity', '1');
	$('#button2').css('opacity', '1');
	$('#button3').css('opacity', '1');
	$('.mast__text').css('opacity', '0');

	$('.blue_figure').css('opacity', '1');
	$('.userName').css({
		'opacity': '1',
		'transform': 'none'
	});

	$('.chart_bg').css('opacity', '1');
	// $('.bg_img').css('opacity', '1');
}