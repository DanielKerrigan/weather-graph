function draw_graph(forecast){
    var data = [];
    var formatDate = d3.time.format("%d %b %Y");

    for(var i = 0; i < 5; i++){
        var date = forecast[i].date;
        var high = parseInt(forecast[i].high);

        if(date[0] !== "1"){
            date = "0"+date;
        }

        data.push({
            date: formatDate.parse(date),
            high: high
        });
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 970 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height,0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(5)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    x.domain(d3.extent(data, function(d){return d.date; }));
    y.domain(d3.extent(data, function(d){return d.high; }));

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.high);});

    var svg = d3.select("body").append("svg")
        .attr("width", width + 2*margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top+")");

    svg.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis);

    svg.append("g")
        .attr("class","y axis")
        .call(yAxis)
      .append("text")
        .attr("transform","translate("+-margin.left+","+height/2+")rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor","middle")
        .text("Temperature (°F)");

    svg.append("path")
        .datum(data)
        .attr("class","line")
        .attr("d", line);
}
