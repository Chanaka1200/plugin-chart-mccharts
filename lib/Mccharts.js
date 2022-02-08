"use strict";

exports.__esModule = true;
exports.default = Mccharts;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@superset-ui/core");

var _reactChartjs = require("react-chartjs-2");

var _reactTabs = require("react-tabs");

require("react-tabs/style/react-tabs.css");

var _react2 = require("@emotion/react");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts
const Styles = _core.styled.div`
  
  padding: ${({
  theme
}) => theme.gridUnit * 4}px;
  border-radius: ${({
  theme
}) => theme.gridUnit * 2}px;
  height: ${({
  height
}) => height};
  width: ${({
  width
}) => width};
  overflow-y: scroll;

  h3 {
    /* You can use your props to control CSS! */
    font-size: ${({
  theme,
  headerFontSize
}) => theme.typography.sizes[headerFontSize]};
    font-weight: ${({
  theme,
  boldText
}) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  .chart-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .chart-header .chart-count-item h3 {
    color: #0a6a99;
  }

  .table-container {
    margin: 10px;
    padding: 0;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
  
  tr.expandable > td {
    box-shadow: inset 0 3px 6px -3px rgba(0, 0, 0, .2);
    padding: 0;
  }
  
  tr.expandable > td > .inner {
    margin: 15px;
    overflow: hidden;
  }
  #chartjs-tooltip {
    background: #fff;
    padding: 10px 10px;
    border-radius: 4px;
    box-shadow: 0px 0px 7px rgba(0,0,0,0.5);
}

.tooltip-item-holder {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tooltip-text {
  margin-left: 10px;
}

.react-tabs__tab-list {
  border-bottom: none;
}

.react-tabs__tab {
  border: none;
  padding: 6px 0px;
  margin: 0 20px 0 0;
  text-transform: uppercase;
  font-weight: 800;
}

.react-tabs__tab--selected{
  border-bottom: 2px solid #005073;
}
`;
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

function Mccharts(props) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    data,
    height,
    width,
    formData,
    chartType,
    colorScheme,
    numberType
  } = props;
  const rootElem = /*#__PURE__*/(0, _react.createRef)(); // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.

  (0, _react.useEffect)(() => {
    const root = rootElem.current;
    console.log('Plugin element', root);
  });

  const colorFn = _core.CategoricalColorNamespace.getScale(colorScheme);

  const chartData = {
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    }]
  }; // const chartOptions = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  data.forEach(dataItem => {
    chartData.labels.push(dataItem[formData.cols[0]]);
    chartData.datasets[0].data.push(dataItem[formData.metrics[0]]);
  });
  console.log(chartData);
  let chartHtml;

  if (chartType === 'line') {
    chartHtml = (0, _react2.jsx)(_reactChartjs.Line, {
      data: chartData
    });
  } else if (chartType === 'pie') {
    const pieOptions = {
      plugins: {
        tooltip: {
          // Disable the on-canvas tooltip
          enabled: false,
          external: function (context) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip'); // Create element on first render

            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            } // Hide if no tooltip


            var tooltipModel = context.tooltip;

            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0';
              return;
            } // Set caret Position


            tooltipEl.classList.remove('above', 'below', 'no-transform');

            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            } // Set Text


            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<thead>';
              titleLines.forEach(function (title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';
              bodyLines.forEach(function (body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                style += '; width: 10px';
                style += '; height: 10px';
                var span = '<div style="' + style + '"></div>';
                var bodstxt = '<div class="tooltip-text">' + body + '</div>';
                innerHtml += '<tr><td class="tooltip-item-holder">' + span + bodstxt + '</td></tr>';
              });
              innerHtml += '</tbody>';
              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            var position = context.chart.canvas.getBoundingClientRect(); // Display, position, and set styles for font

            tooltipEl.style.opacity = '1';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        }
      }
    };
    chartHtml = (0, _react2.jsx)(_reactChartjs.Pie, {
      data: chartData,
      options: pieOptions
    });
  } else if (chartType === 'bar') {
    chartHtml = (0, _react2.jsx)(_reactChartjs.Bar, {
      data: chartData
    });
  } else if (chartType === 'hbar') {
    const options = {
      indexAxis: 'y',
      plugins: {
        tooltip: {
          // Disable the on-canvas tooltip
          enabled: false,
          external: function (context) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip'); // Create element on first render

            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            } // Hide if no tooltip


            var tooltipModel = context.tooltip;

            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0';
              return;
            } // Set caret Position


            tooltipEl.classList.remove('above', 'below', 'no-transform');

            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            } // Set Text


            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<thead>';
              titleLines.forEach(function (title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';
              bodyLines.forEach(function (body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                var span = '<span style="' + style + '"></span>';
                innerHtml += '<tr><td>' + span + body + '</td></tr>';
              });
              innerHtml += '</tbody>';
              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            var position = context.chart.canvas.getBoundingClientRect(); // Display, position, and set styles for font

            tooltipEl.style.opacity = '1';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.width = '150px';
            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        }
      }
    };
    chartHtml = (0, _react2.jsx)(_reactChartjs.Bar, {
      data: chartData,
      options: options
    });
  } else if (chartType === 'doughnut') {
    chartHtml = (0, _react2.jsx)(_reactChartjs.Doughnut, {
      data: chartData
    });
  } else if (chartType === 'multibar') {
    const chartTypes = ['bar', 'line', 'line', 'line'];
    const multiTypeChartData = {
      labels: [],
      datasets: []
    };
    let labelCount = 0;
    const sortedData = data.sort((a, b) => a.QueueHour > b.QueueHour ? 1 : -1);
    sortedData.forEach(dataItem => {
      const toDate = new Date(dataItem[formData.cols[0]]);
      multiTypeChartData.labels.push(toDate.toLocaleDateString("fi-FI", {
        month: 'numeric',
        day: 'numeric'
      }));
      formData.metrics.forEach(metricV => {
        const checkIfEx = multiTypeChartData.datasets.find(element => element.label === metricV.label);

        if (checkIfEx === undefined) {
          labelCount++;
          let borderWidth, fill, borderColor, bgColor;
          let yAxisID = 'y-axis-1';

          if (chartTypes[labelCount - 1] === 'bar') {
            fill = true;
            bgColor = colorFn(metricV.label);
          } else {
            borderWidth = 2;
            fill = false;
            borderColor = colorFn(metricV.label);
            yAxisID = 'y-axis-2';
            bgColor = '';
          }

          multiTypeChartData.datasets.push({
            type: chartTypes[labelCount - 1],
            label: metricV.label,
            data: [],
            borderWidth: borderWidth,
            fill: fill,
            borderColor: borderColor,
            yAxisID: yAxisID,
            backgroundColor: bgColor
          });
        }

        if (checkIfEx) {
          checkIfEx.data.push(dataItem[metricV.label]);
        } //console.log(dataItem[metricV.label]);

      });
    });
    console.log(multiTypeChartData);
    const qWaitingTime = multiTypeChartData.datasets[0].data.reduce((acc, curr) => acc + curr);
    const qWaitingTimeAvg = parseFloat((qWaitingTime / 24).toFixed(2)).toLocaleString(numberType);
    const newCount = multiTypeChartData.datasets[1].data.reduce((acc, curr) => acc + curr);
    const newCountAvg = (newCount / 24).toFixed(0); //parseFloat((qWaitingTime/24).toFixed(2)).toLocaleString(numberType);

    const options = {
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1'
        }, {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false
          }
        }]
      }
    };
    chartHtml = (0, _react2.jsx)("div", null, (0, _react2.jsx)("div", {
      className: "chart-header"
    }, (0, _react2.jsx)("div", {
      className: "chart-count-item"
    }, (0, _react2.jsx)("h3", null, qWaitingTimeAvg, " ", (0, _react2.jsx)("br", null), " ", (0, _react2.jsx)("small", null, "Queue Time"))), (0, _react2.jsx)("div", {
      className: "chart-count-item"
    }, (0, _react2.jsx)("h3", null, newCountAvg, " ", (0, _react2.jsx)("br", null), " ", (0, _react2.jsx)("small", null, "New Count")))), (0, _react2.jsx)(_reactChartjs.Bar, {
      data: multiTypeChartData,
      options: options
    }));
  }
  /*
   
   const rand = () => Math.round(Math.random() * 20 - 10);
  const multiTypeChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
  };*/


  if (chartType === 'collTbl') {
    const users = ['James', 'Nora', 'Matthew', 'Joe', 'Susan']; //const [expanded] = useState(false);

    const [showText, toggleShowText] = (0, _react.useState)(true);

    const showLittle = () => {
      toggleShowText(!showText);
      console.log(showText);
    };

    return (0, _react2.jsx)(Styles, {
      ref: rootElem,
      boldText: props.boldText,
      headerFontSize: props.headerFontSize,
      height: height,
      width: width
    }, (0, _react2.jsx)("div", {
      className: "table-container"
    }, (0, _react2.jsx)("div", {
      className: "uk-overflow-auto"
    }, (0, _react2.jsx)("table", {
      className: "uk-table uk-table-hover uk-table-middle uk-table-divider"
    }, (0, _react2.jsx)("thead", null, (0, _react2.jsx)("tr", null, (0, _react2.jsx)("th", {
      className: "uk-table-shrink"
    }), (0, _react2.jsx)("th", {
      className: "uk-table-shrink"
    }), (0, _react2.jsx)("th", {
      className: "uk-table-shrink"
    }, "Avatar"), (0, _react2.jsx)("th", null, "Fullname"), (0, _react2.jsx)("th", null, "City"), (0, _react2.jsx)("th", null, "Registered"))), (0, _react2.jsx)("tbody", null, users.map(name => {
      return (0, _react2.jsx)("div", null, (0, _react2.jsx)("tr", {
        key: "main",
        onClick: () => showLittle()
      }, (0, _react2.jsx)("td", {
        className: "uk-text-nowrap"
      }, "DD"), (0, _react2.jsx)("td", null, "VV"), (0, _react2.jsx)("td", null, "Test"), (0, _react2.jsx)("td", null, "AA"), (0, _react2.jsx)("td", null, "VV"), (0, _react2.jsx)("td", null, "VV")), showText ? (0, _react2.jsx)("div", {
        className: "productText"
      }, "dfsda") : null);
    }))))));
  } else {
    return (0, _react2.jsx)(Styles, {
      ref: rootElem,
      boldText: props.boldText,
      headerFontSize: props.headerFontSize,
      height: height,
      width: width
    }, (0, _react2.jsx)(_reactTabs.Tabs, null, (0, _react2.jsx)(_reactTabs.TabList, null, (0, _react2.jsx)(_reactTabs.Tab, null, "Tyojonon Tilanne"), (0, _react2.jsx)(_reactTabs.Tab, null, "Tyojonon Tilanne Tunneittain")), (0, _react2.jsx)(_reactTabs.TabPanel, null, chartHtml), (0, _react2.jsx)(_reactTabs.TabPanel, null, (0, _react2.jsx)("h2", null, "Any content 2"))), (0, _react2.jsx)("div", {
      id: "tooltip"
    }));
  }
}
/*export function TbleTest() {
  
  const [expanded] = useState(false);

  const [showText, toggleShowText] = useState(true);

  const showLittle = () => {
    toggleShowText(!showText);
    console.log(showText);
    
  };
 
  return (
    [<tr key="main" onClick={() => showLittle()}>        
    <td className="uk-text-nowrap">DD</td>
    <td>VV</td>
    <td>Test</td>
    <td>AA</td>
    <td>VV</td>
    <td>VV</td>
  </tr>
{showText ? 'Expanded' : ""}
]
       
  )
}*/