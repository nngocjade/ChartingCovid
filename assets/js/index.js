var data = {
  // A labels array that can contain any sort of values
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0],
    [0, 3, 4, 3, 1],
  ],
};

// // Create a new line chart object where as first parameter we pass in a selector
// // that is resolving to our chart container element. The Second parameter
// // is the actual data object.
new Chartist.Line(".ct-chart", data);

let chartData = {
  labels: [],
  series: [],
};

let charOptions = {
  high: 0,
  low: 0,
  filWidth: true,
};

let variableData = {
  deathSeries: [],
  hospitalizedSeries: [],
  totalCasesSeries: [],
};

let myChart;

fetch("https://covidtracking.com/api/us/daily")
  .then((res) => res.json())
  .then((dataArr) => {
    for (let index = 10; index >= 0; index--) {
      console.log(dataArr);
      const daydata = data[index];
      console.log(daydata);
      let dateStr = day.date.toString();
      chartData.labels.push(
        `${dateStr.substr(4, 2)}/${dateStr.substr(6, 2)}/${dateStr.substr(
          0,
          2
        )}}`
      );
      //add data point to series
      variableData.deathSeries.push(dayData.death);
      //set highest y axis point
      if (daydata.death > chartOptions.high) {
        chartOptions.high = dayData.death;
      }
      //add data point to series
      variableData.hospitalizedSeries.push(dayData.hospitalized);
      //set highest y axis point
      if (dayData.hospitalized > chartOptions.high) {
        chartOptions.high = dayData.hospitalized;
      }
      //add data point to series
      variableData.totalCasesSeries.push(dayData.total);
      //set highest y axis point
      if (dayData.total > chartOptions.high) {
        chartOptions.high = dayData.total;
      }
    }
    chartData.series[0] = variableData.totalCasesSeries;
    myChart = new Chartist.Line(".ct-chart", chartData, chartOptions);
    creatButton();
  })


function creatButton(){
    let buttons = 
}
