//* Returns an array of values
    @param {array} rows
    @param {integer} index

 function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function getMonthlyData() {

    var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
    d3.json(queryUrl).then(function(data) {
      var dates = unpack(data.dataset.data, 0);
      var openPrices = unpack(data.dataset.data, 1);
      var highPrices = unpack(data.dataset.data, 2);
      var lowPrices = unpack(data.dataset.data, 3);
      var closingPrices = unpack(data.dataset.data, 4);
      var volume = unpack(data.dataset.data, 5);
      buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
    });
  }
  
  function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
    var table = d3.select("#summary-table");
    var tbody = table.select("tbody");
    var trow;
    for (var i = 0; i < 12; i++) {
      trow = tbody.append("tr");
      trow.append("td").text(dates[i]);
      trow.append("td").text(openPrices[i]);
      trow.append("td").text(highPrices[i]);
      trow.append("td").text(lowPrices[i]);
      trow.append("td").text(closingPrices[i]);
      trow.append("td").text(volume[i]);
    }
  }
  function buildPlot() {
    
      getMonthlyData();
  
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: dates,
        y: closingPrices,
        line: {
          color: "#17BECF"
        }
      };
  
      // high price Trace
      var trace2 = {
        type: "scatter",
        mode: "lines",
        x: dates,
        y: highPrices,
      };
  
      var data = [trace1, trace2];
  
      var layout = {
        title: `${stock} closing prices`,
        xaxis: {
          range: [startDate, endDate],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        },
        showlegend: false
      };
  
      Plotly.newPlot("plot", data, layout);
  
    });
  }
  
  buildPlot();