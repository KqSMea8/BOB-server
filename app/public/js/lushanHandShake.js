socket.on('message', function (msg) {
  doSlideDown(msg, () => {
    var json = {
      data: msg
    };

    var holderArray = [];

    if (json.data.text !== undefined) {
      if (holderArray.indexOf(json.data.text) > -1) {
        var search_term = json.data.text;

        for (var i = holderArray.length - 1; i >= 0; i--) {
          if (holderArray[i] === search_term) {
            holderArray.splice(i, 1);
          }
        }
        removeCertainProgressBar();
      } else {
        holderArray.push(json.data.text);
        console.log(holderArray);

        // 这里变更云团
        fadeOutWords();
        handlePregressBar(1);
        updateStacks();
      }
    } else {
      console.log('json.data.text is undefined', json.data.text);
    }

    function fadeOutWords() {
      $(`.label_1`).css({
        'opacity': '0'
      });
      $(`.label_2`).css({
        'opacity': '0'
      });
    }

    //insert progress bar
    function handlePregressBar(index) {
      var myvar = '<div' + ' ' + 'id=' + json.data.text + ' ' + 'class="barWrapper">' +
        '				 <span class="progressText" style="color: #42f4dc;"><B>' + json.data.text + '</B></span>' +
        '				<div class="progress">' +
        '         <span  class="new-label"> </span>' +
        '				  <div class="progress-bar" role="progressbar" aria-valuenow=' + Math.random() * 100 + ' ' + 'aria-valuemin="0" aria-valuemax="100" >   ' +
        '						<!-- <span  class="popOver" data-toggle="tooltip" data-placement="top" title="85%"> </span>      -->' +
        '				  </div>' +
        '				</div>' +
        '				</div>';

      var elemDiv = document.createElement('div');
      elemDiv.innerHTML = myvar;

      $(elemDiv).insertBefore($("#sectionContainer")[0].children[0]);
      $(".progress-bar").each(function (i) {
        var each_bar_width = $(this).attr('aria-valuenow');
        $(this).delay(i * 500).width(each_bar_width + '%');
      });

      $('.new-label').css('opacity', '1');
      var removedId = `#${json.data.text}`;
      console.log($(removedId));
    }


    function removeCertainProgressBar() {
      var removedId = `#${json.data.text}`;
      $($(removedId)[0].children[1].children[0]).css('opacity', '0');
      setTimeout(() => {
        $(removedId).remove();
      }, 500);
    }


    //update words positions
    function updateWordsPositions() {
      for (let i = 0; i < stacks.length; i++) {
        insertKeyWords(i);
      }
    }

    function insertKeyWords(index) {
      setTimeout(function () {
        initLabels(index)
      }, 200);
    }


    function updateStacks() {
      const stack = createOneParticleSystem(256 * 4, 100, 0.005, new THREE.Color(0x111111).setHex(Math.random() * 0xffffff))
      // stack.position.set((Math.random() - Math.random()) * 50, (Math.random() - Math.random()) * 80, (Math.random() - Math.random()) * 20);
      stacks.push(stack)
      scene.add(stack);
      stack.geometry.verticesNeedUpdate = true;

      stack.geometry.vertices.forEach((vertice, i) => {
        var coords = randomSpherePoint(0, 0, 0, 16 + Math.random() * 30);
        var x = Math.random();
        var y = (1 - x) * Math.random();
        var z = 1 - x - y;
        vertice.axis = new THREE.Vector3(x, y, z);
        vertice.spherePosition = new THREE.Vector3(coords[0], coords[1], coords[2]);
        new TWEEN.Tween(stack.geometry.vertices[i]).to({
          x: coords[0],
          y: coords[1],
          z: coords[2]
        }, 7000).easing(TWEEN.Easing.Quintic.InOut).start();
      })

      for (var i = 0; i < stacks.length; i++) {
        new TWEEN.Tween(stacks[i].position).to({
          x: (Math.random() - Math.random()) * 140,
          y: (Math.random() - Math.random()) * 80,
          z: (Math.random() - Math.random()) * 30
        }, 7000).easing(TWEEN.Easing.Quintic.InOut).start();
      }

      setTimeout(() => {
        updateWordsPositions();
      }, 7000);
    }
  })
})