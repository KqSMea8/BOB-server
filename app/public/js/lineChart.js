function DrawChart(e, chartType, dataSource)
{
  var ctx = e.getContext('2d');
  var chartData = GetChartData(dataSource)

  var myChart = new Chart(ctx, {
    type: chartType,
    data: chartData
  });
}

function GetChartData(type)
{
  // This will come from the database
  var data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'December 2016',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(0, 102, 204,0.6)"
    }, {
      label: 'January 2017',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(0, 153, 153,0.6)"
    }]
  }
  
  return(data);
}

var elem = document.getElementById('line-chart');