socket.on('message', function (msg) {
  doSlideDown(msg, () => {
    var json = {
      data: msg
    };

    if (json.data.text === "addUser") {
      console.log('addUser');
      $('.animatedText').css('opacity', '0');

      setTimeout(() => {
        // $('body').css('background', '#10b2aa');
        $('#overlay').css('opacity', '1')
      }, 700);

      var elapsed = 0,
        loader = new THREE.TextureLoader(),
        maxParticles = 5000,
        particlesDelay = 1,
        radius = 40,
        sphereGeometry,
        sphere,
        sphereGeometry,
        particleTexture,
        sphere_rotationX = 0.03,
        sphere_rotationY = 0.045;

      setTimeout(function () {

        sphereGeometry = new THREE.Geometry();
        loader.crossOrigin = true;

        particleTexture = loader.load('./assets/sphereTexture.png');
        var material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 2,
          transparent: true,
          blending: THREE.AdditiveBlending,
          map: particleTexture,
          depthWrite: false
        });

        for (let i = 0; i < maxParticles; i++) {

          let xPos = i % 2 === 0 ? radius : -radius,
            vertex = new THREE.Vector3(xPos, 0, 0);

          vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1);
          vertex.rotationAxis.normalize();
          vertex.delay = particlesDelay * i;
          sphereGeometry.vertices.push(vertex);
        }
        sphere = new THREE.Points(sphereGeometry, material);
        scene.add(sphere);
        update();

        setTimeout(() => {
          var reduceSphereRotatingSpeed = setInterval(function () {
            sphere_rotationX -= 0.0001;
            sphere_rotationY -= 0.00015;
          }, 10);
          setTimeout(() => {
            clearInterval(reduceSphereRotatingSpeed);

            new TWEEN.Tween(sphere.scale).to({
              x: 0.2,
              y: 0.2,
              z: 0.2
            }, 2000).easing(TWEEN.Easing.Quintic.InOut).start().onComplete(function () {
              addingTextAnimation();
            });
          }, 3000);
        }, 2000);
      }, 1000);

    } else {
      console.log(json.data.text);
    }


    function addingTextAnimation() {
      // $('.adding-new-user').toggleClass('is-visible');
      addParticleInCloud();

      // setTimeout(() => {
      //   $('.adding-new-user').toggleClass('is-visible');
      //   setTimeout(() => {
      //     $('.adding-new-user').text('正在录入您的信息...');
      //     $('.adding-new-user').toggleClass('is-visible');

      //     setTimeout(() => {
      //       $('.adding-new-user').toggleClass('is-visible');
      //       setTimeout(() => {
      //         $('.adding-new-user').text('正在将您添加到云海系统...');
      //         $('.adding-new-user').toggleClass('is-visible');

      //         setTimeout(() => {
      //           $('.adding-new-user').toggleClass('is-visible');

      //           addParticleInCloud();
      //         }, 4000);
      //       }, 2000);
      //     }, 2000);
      //   }, 2000);
      // }, 2000);
    }


    function addParticleInCloud() {
      setTimeout(() => {
        new TWEEN.Tween(sphere.position).to({
          x: (Math.random() * 2 - 1) * 800,
          y: (Math.random() * 2 - 1) * 300,
          z: -800
        }, 2000).easing(TWEEN.Easing.Quintic.InOut).start().onComplete(function () {
          // $('body').css('background-color', '#0a0f1f');
          $('#overlay').css('opacity', '0')
          disposeSphere();
        });
      }, 600);
    }

    function disposeSphere() {
      sphere.geometry.dispose();
      sphere.material.dispose();
      scene.remove(sphere);

      // $('.adding-new-user').toggleClass('is-visible');

      // setTimeout(() => {
      $('.bg_img').css('opacity', '1');
      $('.blue_figure').css('opacity', '1');
      $('.userName').css({
        'opacity': '1',
        'transform': 'none'
      });

      $('.chart_bg').css('opacity', '1');
      // $('.adding-new-user').text('添加成功!');
      // $('.adding-new-user').toggleClass('is-visible');
      // $('.adding-new-user').css({
      //   'left': '50%',
      //   'margin-left': '-400px',
      //   'letter-spacing': '1.5vw',
      //   'text-align': 'center'
      // });

      // setTimeout(() => {
      //   // $('.adding-new-user').toggleClass('is-visible');
      // }, 2000);
      // }, 200);
    }


    function update() {

      elapsed += 1;

      sphere.rotation.x += sphere_rotationX;
      sphere.rotation.y += sphere_rotationY;

      for (let i = 0; i < maxParticles; i++) {

        let particle = sphereGeometry.vertices[i];

        if (elapsed > particle.delay)
          particle.applyAxisAngle(particle.rotationAxis, 0.008);

      }

      sphere.geometry.verticesNeedUpdate = true;

      requestAnimationFrame(update);
    }

  })
})