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

fetch("https://covidtracking.com/api/us/daily")
  .then((res) => res.json())
  .then((dataObj) => {
    let seriesArr = [];
    console.log(dataObj);
    for (let index = 10; index > 0; index--) {
      const day = dataObj[index];
      let dateStr = day.date.toString();
      chartData.labels.push(
        `${dateStr.substr(4, 2)}/${dateStr.substr(6, 2)}/${dateStr.substr(
          0,
          4
        )}}`
      );
      seriesArr.push(day.death);
    }
    chartData.series.push(seriesArr);
    new Chartist.Line(".ct-chart", chartData);
  });
