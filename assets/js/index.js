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
  fullWidth: true,
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
      const dayData = data[index];
      console.log(dayData);
      let dateStr = dayData.date.toString();
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
    console.log("Chart Data:", chartData);
    myChart = new Chartist.Line(".ct-chart", chartData, chartOptions);
    creatButton();
  });

function creatButton() {
  let buttons = document.createElement("div");
  buttons.classList.add("buttons");
  let buttonInfo = [
    {
      txt: "Hospitalized",
      attr: "hospitalized",
    },
    {
      txt: "Deceased",
      attr: "death",
    },
    {
      txt: "Total Cases",
      attr: "totalCases",
    },
  ];
  buttonInfo.forEach((buttonObj) => {
    let btn = document.createElement("div");
    btn.classList.add("toggle-btn");
    if (buttonObj.attr === "totalCases") {
      btn.classList.add("active");
    }
    btn.innerHTML = buttonObj.txt;
    btn.addEventListener("click", toggleChartData);
    btn.setAttribute("data-data_line", buttonObj.attr);
    buttons.appendChild(btn);
  });
  document.body.prepend(buttons);
}

function toggleChartData(e) {
  let dataLine = e.target.dataset.data_line;
  chartData.series[0] = variableData["${dataLine}Series"];
  animate();
  myChart.update(chartData);
  toggleActiveBtn(e.target);
}

function toggleActiveBtn(clickedBtn) {
  let btns = Array.from(document.getElementsByClassName("toggle-btn"));
  btns.forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
}

function animate() {
  myChart.on("draw", function (data) {
    if (data.type === "line") {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 1000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint,
        },
      });
    }
  });
}
