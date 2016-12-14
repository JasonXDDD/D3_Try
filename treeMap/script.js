var treemap = d3.layout.treemap().size([900, 400]);
var nodes = treemap.nodes(root);


d3.select("svg").selectAll("rect").data(nodes).enter().append("rect")
    .attr({
        x: function(it) {
            return it.x; },
        y: function(it) {
            return it.y; },
        width: function(it) {
            return it.dx; },
        height: function(it) {
            return it.dy; },
        fill: "none",
        stroke: "black"
    });
