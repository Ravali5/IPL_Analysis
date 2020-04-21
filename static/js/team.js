function generateMap(){
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
		
		//console.log(d3.select("#left-top").attr("width"))
    var map = d3.select("#left-top").append("svg:svg")
        .attr("viewBox","30 -30 540 700")
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india");

    d3.json("/static/json/states.json", function (json) {
      var units=india.selectAll("path")
                      .data(json.features)
                      .enter().append("path")               
                      .attr("d", path)
                      .style("fill",function(d){ return d["color"];})
                      .style("stroke","#A9A9A9")
                      .style("stroke-width","0.6px")	               
                      /*.on("mouseover", function(d) {
                        d3.select(this)
                          .style("fill","#FF4500")
                         console.log(d["id"])
                      })*/;

    });

    function initialize() {
      proj.scale(6700);
      proj.translate([-1240, 720]);
    }
};


function drawPie(){
	 //var width = 550
     //   height = 450
     //   margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //var radius = Math.min(width, height) / 2 - margin
    var radius = 110;
    var logoXY = {
      "MI"  :[105,45],
      "SRH" :[-55,-20],
      "RCB" :[-35,80],
      "CSK" :[37,98],
      "DC"  :[-30,-60],
      "KKR" :[75,-50],
      "KXIP":[-65,30],
      "RR"  :[5,-70]
    };
    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#left-bottom")
      .append("svg")
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(130,130)");

    // Create dummy data
    //var data = {a: 9, b: 20, c:30, d:8, e:12}
    //d3.csv("Votes.csv",function(error , data_pie) {
    $.post("/getPieData", {'data': 'received'}, function(data_pie){
      console.log(data_pie);
      // set the color scale
      // Compute the position of each group on the pie:
      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data_pie['Likes ( In Millions )']))
      //console.log(data_pie['color'])

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      var arc=d3.arc()
          .innerRadius(0)
          .outerRadius(radius)

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function(d,i){ if (i<=7){ return data_pie['color'][i]; }})
        .attr("stroke", "black")
        .style("stroke-width", "0px")


      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('image')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr("transform", function(d,i) {
          return "translate("+logoXY[data_pie['Team'][i]][0]+","+logoXY[data_pie['Team'][i]][1]+")"; 
        })
        .attr("x","-40")
        .attr("y","-40")
        .attr('width', 35)
        .attr('height', 35)
        .attr("xlink:href", function(d,i){ return "/static/images/"+data_pie['Team'][i]+".png"});
   });
};

generateMap();
drawPie();