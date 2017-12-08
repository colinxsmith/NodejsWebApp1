;
var setOutliers = function (d) {
    d.proposedOutlier = d.proposedPortfolioValue <= d.compliantUpperValue && d.proposedPortfolioValue >= d.compliantLowerValue;
    d.currentOutlier = d.currentPortfolioValue <= d.compliantUpperValue && d.currentPortfolioValue >= d.compliantLowerValue;
};
var Gauge = function (ww, hh, Data) {
    var thicknessOfBottomLabel = 25, rimForClockNumbers = 20, durationTime = 3000, reading2angle = function (k) {
        var d = 90 + k * 360 / 100;
        d = d % 360;
        return d;
    }, margin = {
        top: .2,
        right: .5,
        bottom: .2,
        left: .5
    }, tooltip = d3.select("body").append("g").attr("class", "toolTip"), angle = d3.scaleLinear().domain([0, 360]).range([0, 2 * Math.PI]), ticks = [], ticks1 = [], i, width = ww - margin.left - margin.right, height = hh - margin.top - margin.bottom, rad1 = (height - thicknessOfBottomLabel) / 2, rad2 = rad1 - rimForClockNumbers, svg = d3.select("body").append("svg").attr("x", margin.left).attr("y", margin.top).attr("width", width).attr("height", height).append("g"), arcfunc = d3.arc().innerRadius(rad2).outerRadius(rad1).cornerRadius(5), def = svg.append('defs'), gradient = def.append('linearGradient' /*or 'radialGradient' */).attr('id', 'grad').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('class', 'left').attr('stop-opacity', 1);
    gradient.append('stop').attr('offset', '100%').attr('class', 'right').attr('stop-opacity', 1);
    for (i = 0; i <= 10; ++i) {
        ticks.push(i * 10);
    }
    for (i = 0; i <= 49; ++i) {
        ticks1.push(i);
    }
    var centx = ww / 2, centy = (hh - thicknessOfBottomLabel * 0.75) * 0.5, outerbox = svg.append('rect').attr('class', 'outerb').attr('width', width).attr('height', height).attr('x', margin.left).attr('y', margin.top), circled = svg.append('circle').attr('transform', "translate(" + centx + "," + centy + ")").attr('r', rad2 + "px").attr('class', 'clockface'), text = svg.selectAll('ci').data(ticks).enter().append('text').attr('transform', "translate(" + centx + "," + centy + ")").attr('class', 'clocktext').attr('x', function (k) {
        var d = reading2angle(k);
        return rad2 * 0.8 * Math.cos(angle(d));
    }).attr('y', function (k) {
        var d = reading2angle(k);
        return rad2 * 0.8 * Math.sin(angle(d));
    }).attr('dy', '5px').text(function (d) {
        if (d > 90) {
            d = 0;
        }
        return d;
    }), tickss = svg.selectAll('line').data(ticks).enter().append('path').attr('class', 'ticks').attr('transform', "translate(" + centx + "," + centy + ")").attr('d', function (k) {
        var d = reading2angle(k);
        var xx1 = rad2 * 0.9 * Math.cos(angle(d));
        var yy1 = rad2 * 0.9 * Math.sin(angle(d));
        var xx2 = rad2 * Math.cos(angle(d));
        var yy2 = rad2 * Math.sin(angle(d));
        return "M" + xx1 + " " + yy1 + " L" + xx2 + " " + yy2;
    }).style('stroke-width', '2px'), tickl = svg.selectAll('line').data(ticks1).enter().append('path').attr('class', 'ticks').attr('transform', "translate(" + centx + "," + centy + ")").attr('d', function (k) {
        var d = reading2angle(2 * k);
        if (d % 10 == 0) {
            return;
        }
        var xx1 = rad2 * 0.93 * Math.cos(angle(d));
        var yy1 = rad2 * 0.93 * Math.sin(angle(d));
        var xx2 = rad2 * Math.cos(angle(d));
        var yy2 = rad2 * Math.sin(angle(d));
        return "M" + xx1 + " " + yy1 + " L" + xx2 + " " + yy2;
    }), arcs = svg.selectAll('arc').data([[10, 90], [Data.compliantLowerValue, Data.almostOutlierLowerValue], [Data.almostOutlierLowerValue, Data.almostOutlierUpperValue], [Data.almostOutlierUpperValue, Data.compliantUpperValue]])
        .enter().append('path')
        .attr('transform', "translate(" + centx + "," + centy + ")")
        .attr('class', 'arcs')
        .style('fill', function (k, i) {
        switch (i) {
            case 1:
            case 3:
                return 'rgba(243, 201, 44, 0.92)';
            case 2:
                return 'rgba(109, 208, 21, 0.8588235294117647)';
            default:
                return 'rgba(123, 105, 105, 0.6705882352941176)';
        }
    }).transition().duration(durationTime).attrTween('d', function (k) {
        var kh = [d3.interpolate(k[0] - 100, k[0]), d3.interpolate(k[0] - 100, k[1])];
        function tween(t) {
            var d1 = angle(reading2angle(kh[0](t))) + Math.PI / 2;
            var d2 = angle(reading2angle(kh[1](t))) + Math.PI / 2;
            d2 = d2 < d1 ? d2 + Math.PI * 2 : d2;
            return arcfunc({
                startAngle: d1,
                endAngle: d2,
                innerRadius: rad1,
                outerRadius: rad2,
                padAngle: 0
            });
        }
        return tween;
    }), handmove = svg.selectAll('hand').data([Data.proposedPortfolioValue])
        .enter().append('path')
        .attr('class', 'handm')
        .attr('transform', "translate(" + centx + "," + centy + ")")
        .attr('d', function () {
        var x = rad2, y = 0, th = 3, v = 5, b = 5;
        return "M" + x + " " + y + " \n        L" + (x - th * 5) + " " + (y + th + v) + " \n        L" + (x - th * 5 + b) + " " + (y + th) + " \n        L" + -x / 5 + " " + th + " \n        L" + -x / 5 + " " + -th + " \n        L" + (x - th * 5 + b) + " " + -th + " \n        L" + (x - th * 5) + " " + (y - th - v) + " \n        z";
    }).on("mouseover", function (d) {
        tooltip.style("opacity", 0.9);
        tooltip.html("Proposed<br>" + d + "%").style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    }).on("mouseout", function (d) {
        tooltip.style("opacity", 0);
    }).transition().duration(durationTime).attrTween('transform', function (k) {
        var kh = d3.interpolate(10, k);
        function tween(t) {
            var d = reading2angle(kh(t));
            return "translate(" + centx + "," + centy + ") rotate(" + d + ")";
        }
        return tween;
    }), handfixed = svg.selectAll('arrow').data([Data.currentPortfolioValue]).enter().append('path').attr('class', 'handf').attr('transform', function (k) {
        var d = reading2angle(k);
        return "translate(" + centx + "," + centy + ") rotate(" + d + ")";
    }).attr('d', function () {
        var x = rad2 * 0.7, y = 0;
        return "M" + -x / 5 + " " + -y / 5 + " L" + x + " " + y;
    }).on("mouseover", function (d) {
        tooltip.style("opacity", 0.9);
        tooltip.html("Current<br>" + d + "%").style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    }).on("mouseout", function (d) {
        tooltip.style("opacity", 0);
    }), RISKcolourpass = '', RISKcolour = '', image = svg.append('defs')
        .append('pattern')
        .attr('id', 'me2')
        .attr('width', 1)
        .attr('height', 1).append("image")
        .attr("xlink:href", "CIMG3690.jpg")
        .attr('width', 300).attr('height', 300), RISK = svg.selectAll('bot').data([Data.currentOutlier ? '&#x2713;' : '&#x2715;', Data.monitorFlagName, Data.proposedOutlier ? '&#x2713;' : '&#x2715;']).enter().append('text').attr('transform', "translate(" + centx + "," + (thicknessOfBottomLabel * 0.75 + 2 * rad1) + ")").attr('class', 'text').attr('x', function (d, i) {
        return (i - 1) ? (i - 1) * rad1 : 0;
    }).html(function (d) {
        return d;
    }).style('fill', function (d, i) {
        RISKcolourpass = d3.select(this).style('color');
        RISKcolour = d3.select(this).style('fill');
        return (i == 1) ? RISKcolour : outerbox.style('fill');
    }).transition().duration(durationTime).style('fill', function (d, i) {
        var pass = false;
        if (i == 0) {
            pass = Data.currentOutlier;
        }
        else if (i == 2) {
            pass = Data.proposedOutlier;
        }
        else {
            ;
        }
        return (i != 1) ? pass ? RISKcolourpass : RISKcolour : RISKcolour;
    }), circlem = svg.append('circle').attr('transform', "translate(" + centx + "," + centy + ")").attr('r', '5px').attr('class', 'clockfacem');
};
var data0 = {
    compliantLowerValue: 35,
    almostOutlierLowerValue: 40,
    almostOutlierUpperValue: 70,
    compliantUpperValue: 80,
    currentPortfolioValue: 33,
    proposedPortfolioValue: 63,
    proposedOutlier: false,
    currentOutlier: false,
    monitorFlagName: "Tracking Error"
}, data1 = {
    compliantLowerValue: 20,
    almostOutlierLowerValue: 40,
    almostOutlierUpperValue: 55,
    compliantUpperValue: 60,
    currentPortfolioValue: 21,
    proposedPortfolioValue: 50,
    proposedOutlier: false,
    currentOutlier: false,
    monitorFlagName: "RISK"
}, data3 = {
    compliantLowerValue: 34,
    almostOutlierLowerValue: 40,
    almostOutlierUpperValue: 60,
    compliantUpperValue: 67,
    currentPortfolioValue: 56,
    proposedPortfolioValue: 55,
    proposedOutlier: false,
    currentOutlier: false,
    monitorFlagName: "Concentration"
}, data2 = {
    compliantLowerValue: 10,
    almostOutlierLowerValue: 20,
    almostOutlierUpperValue: 60,
    compliantUpperValue: 70,
    currentPortfolioValue: 56,
    proposedPortfolioValue: 71,
    proposedOutlier: false,
    currentOutlier: false,
    monitorFlagName: "LIQUIDITY"
};
setOutliers(data0);
setOutliers(data1);
setOutliers(data2);
setOutliers(data3);
Gauge(400, 400, data1);
Gauge(400, 400, data0);
Gauge(400, 400, data3);
Gauge(400, 400, data2);
//# sourceMappingURL=server.js.map