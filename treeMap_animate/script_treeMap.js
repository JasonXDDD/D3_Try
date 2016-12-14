 d3.csv("budget.csv", function(data) {
     var nested = {
         values: d3.nest() // 包覆 d3.nest 產生的結果
             .key(function(d) {
                 return d["款"];
             }) // 分別使用「款」「項」「目」來製作階層
             .key(function(d) {
                 return d["項"];
             })
             .key(function(d) {
                 return d["目"];
             })
             .entries(data) // 使用的資料來自 d3.csv 的回傳值
     };
     var treemap = d3.layout.treemap().size([900, 400]);
     treemap.children(function(d) {
         return d.values;
     }); // 改用 values，而非 children
     treemap.value(function(d) {
         return d["總額"];
     }); // 改用總額，而非 value
     var nodes = treemap.nodes(nested);
     console.log(nodes);

     var xmap = d3.scale.linear().domain([x, x + w]).range([0, 900]);
     var ymap = d3.scale.linear().domain([y, y + h]).range([0, 400]);

     d3.select("svg").selectAll("rect").data(nodes).enter().append("rect")
         .attr({
             x: function(it) {
                 return xmap(it.x);
             },
             y: function(it) {
                 return ymap(it.y);
             },
             width: function(it) {
                 return xmap(it.x + it.dx) - xmap(it.x);
             },
             height: function(it) {
                 return ymap(it.y + it.dy) - ymap(it.y);
             },
             fill: "none",
             stroke: "black"
         });
 });
