var bar = new ProgressBar.Circle(chart_1, {
    color: '#fff',
    strokeWidth: 8,
    trailWidth: 8,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: true
    },
    from: {
      color: '#f4425f',
      width: 8
    },
    to: {
      color: '#f4425f',
      width: 8
    },
    // Set default step function for all animate calls
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
  
      var value = Math.round(circle.value() * 9204);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }
  
    }
  });
  
  setTimeout(() => {
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

    bar.animate(Math.random());
  }, 15000);