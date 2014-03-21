/*
	Function below is a generic reusable chart for a simple arc.
	An empty <svg/> tag must exist in your html, and the selector must select that single element.
	Configurations options can be passed in an object through the second variable.
	$Revision: 80 $

	Sample:
    var chart = new d3singleBar("#d3 svg", {
        width: 120,
        height: 120,
        bgWidth: 18,
        bgColor: "black",
        arcWidth: 14,
        arcColors: ["#277dba", "red"],
        thresholds: [0.8],
        valueSize: 20
    });
	chart.render(0.5);

*/
function d3singleBar(selector, custom) {
    // basic checks
    if (typeof(d3) !== "object" || typeof(rts) !== "object") {
        alert("d3gauge1 needs both D3 and RTS!");
        return false;
    }
    // check if selector is filled
    if (selector === null) {
        alert("selector is mandatory!");
        return false;
    }
    // generic properties
    var _chart = {},
        _current = 0,
        _data = 0,
        _svg,
        _value,
        _bgrect,
        _rect;
    // default configuration values for this specific chart
    var config = {
        data: [40, 50, 30, 55, 20, 50, 30],
        width: 200, // default width
        height: 200, // default height
        duration: 750, // transition duration
        bgWidth: 30, // width of background bar
        bgColor: "black", // bar backgroundcolor
        bgbarWidth: 25, // width of background bar
        barColor: "red", // arc foreground colors (depend on threshold values)
        barRounding: 5,
        barWidth: 25,
        spacer: 5
    }
    // overwrite config properties with custom values (if present)
    if (custom) {
        for (var prop in custom) {
            config[prop] = custom[prop];
        }
    }
    // check if selector points to existing svg
    _svg = d3.select(selector);
    if (_svg.empty()) {
        return false;
    }
    // add/change attributes of svg
    _svg.attr("width", config.width)
        .attr("height", config.height)
        .attr("viewBox", "0 0 " + config.width + " " + config.height);

    //add rect background
    _bgrect = _svg.selectAll("rect")
        .data(config.data)
        .enter()
        .append("rect")
        .attr("y", 0)
        .attr("x", function(d, i) {
            return (config.bgbarWidth + config.spacer) * i;
        })
        .attr("rx", config.barRounding)
        .attr("ry", config.barRounding)
        .attr("width", config.bgbarWidth)
        .attr("height", config.height)
        .style("fill", config.bgColor);

    //add rect foreground
    _rect = _svg.selectAll("svg")
        .data(config.data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return (config.bgbarWidth + config.spacer) * i;
        })
        .attr("rx", config.barRounding)
        .attr("ry", config.barRounding)
        .attr("width", config.barWidth)
        .attr("height", config.height / 2)
        .style("fill", config.barColor)
        .attr("y", function(d) {
            return config.height - d;
        })
        .attr("height", function(d) {
            return d;
        });

    _chart.render = function(data) {
        _rect
            .data(data)
            .transition()
            .duration(config.duration)
            .attr("y", function(d) {
                return config.height - d;
            })
            .attr("height", function(d) {
                return d;
            });

    };




    // always return chart object
    return _chart;
}