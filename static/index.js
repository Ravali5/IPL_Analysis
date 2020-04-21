	$.post("/test", {'data': 'received'}, function(data){
	      console.log(data);
    });

    var analysisby = "team-btn";
    const headingColor = '#0052cc';
    const textInHeadingColor = '#e67300';
    const bodyBackgroundColor = "#b3d1ff";
    const boxShadowColor = '#3385ff';
    const btnMouseoverBGColor = "#4d94ff";

    function changeAnalysisByButtonColor(btn){
    	analysisby = btn;
    	d3.selectAll(".menubar-btn")
    		.style("background-color","transparent")
    		.style("color",headingColor);
    	//console.log(btn);
    	d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
    };


    function generateMap(){
	    var proj = d3.geo.mercator();
	    var path = d3.geo.path().projection(proj);
 		
 		console.log(d3.select("#right-top").attr("width"))
	    var map = d3.select("#right-top").append("svg:svg")
	        .attr("viewBox","30 -30 540 700")
	        .call(initialize);

	    var india = map.append("svg:g")
	        .attr("id", "india");

	    d3.json("/static/states.json", function (json) {
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
    	var width = 550
            height = 450
            margin = 40

  

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#right-bottom")
          .append("svg")
          .attr("width", 300)
          .attr("height", 300)
          .append("g")
          .attr("transform", "translate(180,150)");

        // Create dummy data
        //var data = {a: 9, b: 20, c:30, d:8, e:12}
        //d3.csv("Votes.csv",function(error , data_pie) {
        $.post("/getPieData", {'data': 'received'}, function(data_pie){
	      console.log(data_pie);
    

        // set the color scale

        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {console.log(d);return d.value; })
        var data_ready = pie(d3.entries(data_pie['Likes ( In Millions )']))
        console.log(data_pie['color'])

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        var arc=d3.arc()
            .innerRadius(0)
            .outerRadius(120)

        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', arc)
          .style('fill', function(d,i){ if (i<=7){ console.log(d);return data_pie['color'][i]; }})
          .attr("stroke", "black")
          .style("stroke-width", "0px")


        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('image')
          .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(120)
          )
          .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            // pythagorean theorem for hypotenuse
            h = Math.sqrt(x*x + y*y);
           return "translate(" + ((x/h * 120)+20) +  ',' + ((y/h * 120)) +  ")"; })
          .attr("x","-40")
          .attr("y","-40")
          .attr('width', 40)
          .attr('height', 40)
          .attr("xlink:href", function(d,i){ return "/static/"+data_pie['Team'][i]+".png"});
          //.text(function(d, i) { if (i<=7){ return data_pie['Team'][i]; }}); */
       });
    }



    d3.select("#menubar-search-btn")
    	.style("font-size","1.5em")
    	.style("color",headingColor);

    d3.select("#menubar-search-txt")
    	.style("width","25%")
    	.style("height","70%")
    	.style("margin-left","3%")
    	.style("margin-top","1%")
    	.style("background-color","transparent")
    	.style("border-style","none none solid none")
    	.style("border-color",headingColor)
    	.style("color",headingColor)
    	.style("font-size","1.25em")
    	.on("focus",function(){
    		d3.select(this).style("outline","none")
    	});

	d3.selectAll(".menubar-btn-adjust")
		.style("width","100%")
		.style("height","15%")
		.style("background-color","transparent");

	d3.selectAll(".menubar-btn")
		.style("width","15%")
		.style("height","70%")
		.style("margin-top","0.5%")
		.style("margin-left","2%")
		.style("border-style","solid")
		.style("border-color",headingColor)
		.style("border-radius","25px")
		.style("float","left")
		.style("text-align","center")
		.style("color",headingColor)
		.style("font-size","1.25em")
		.on("mouseover",function(){
			d3.select(this).style("background-color",btnMouseoverBGColor);
		})
		.on("mouseout",function(){
			d3.select(this).style("background-color","transparent");
			d3.select('#'+analysisby).style("background-color",headingColor)
		})
		.on("click",function(){
			changeAnalysisByButtonColor(d3.select(this).attr('id'));
		});

    changeAnalysisByButtonColor(analysisby);

	d3.select("#menubar-label")
		.style("margin-left","2%")
		.style("margin-top","1.5%")
		.style("float","left")
		.style("font-size","1.5em")
		.style("color",headingColor);

    d3.select("#menubar")
    	.style("width","100%")
    	.style("height","6%")
    	.style("float","left")
    	.style("background-color","transparent");

    d3.select("#ipl-label")
    	.style("margin-left","5%")
    	.style("float","left")
    	.style("font-size","2em");

    d3.select("#author-label")
    	.style("float","right")
    	.style("margin-right","5%")
    	.style("margin-top","2%")
    	.style("font-size","1em");

	d3.select("body")
		//.style("background-image","linear-gradient(to bottom right,#e066ff,#b3d1ff)");
		.style("background-color",bodyBackgroundColor);

	d3.select("#main")
		.style("z-index","1")
		.style("float","left")
		.style("width","100%")
		.style("height","100%");

	d3.select("#right")
		.style("width","29%")
		.style("height","98.5%")
		.style("margin-top","0.5%")
		.style("margin-left","0.5%")
		.style("float","left")
		.style("background-color","transparent");

	d3.select("#left")
		.style("width","69%")
		.style("height","98.5%")
		.style("margin-top","0.5%")
		.style("margin-left","0.5%")
		.style("float","left")
		.style("background-color","transparent");

	d3.select("#right-top")
		.style("width","97%")
		.style("height","58%")
		.style("margin-bottom","2%")
		.style("border-style","solid")
		.style("border-radius","30px")
		.style("border-color",headingColor)
		.style("box-shadow","3px 3px "+boxShadowColor);

	d3.select("#right-bottom")
		.style("width","97%")
		.style("height","38%")
		.style("margin-bottom","2%")
		.style("border-style","solid")
		.style("border-radius","30px")
		.style("border-color",headingColor)
		.style("box-shadow","3px 3px "+boxShadowColor);

	d3.select("#heading")
		.style("width","100%")
		.style("height","5%")
		.style("float","left")
		.style("background-color",headingColor)
		//.style("background-image","linear-gradient(to right,#0052cc,#ff00ff)");
		.style("color",textInHeadingColor);
		//.style("background-image","linear-gradient(to right,#0052cc,transparent)");

	d3.select("#references")
		.style("width","99%")
		.style("height","98%")
		.style("background-color","#cce6ff")
		.style("z-index","2")
		.style("float","left")
		.style("position","absolute")
		.style("text-align","center");

    d3.select("#references").style("display","none");
	d3.select("#refButton")
		.on("click",function(){
			d3.select("#references").style("display","none");
		});
	d3.select("#refAnc")
		.on("click",function(){
			d3.select("#references").style("display","block");
		});

	generateMap();
	drawPie();