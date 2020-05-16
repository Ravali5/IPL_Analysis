function venueAnalysisDisplay(){
d3.select("#left-top").style("height","33%");
d3.select("#left-bottom").style("height","62.5%");
d3.select("#right")
  .append("div")
  .attr("id","venue-right-div")
  .style("width","100%")
  .style("height","88%")
  .style("background-color","transparent")
  .style("float","left");
d3.select("#venue-right-div")
	.append("div")
	.attr("id","venue-details")
  	.style("width","100%")
  	.style("height","25%")
  	.style("background-color","transparent")
  	.style("float","left")
  	.style("border-style","solid")
  	.style("border-color",currentColors['headingColor'])
  	.style("border-radius","30px")
  	.style("float","left")
  	.style("box-shadow","3px 3px "+boxShadowColor)
  	.style("color",currentColors['headingColor']);
d3.select("#venue-right-div")
	.append("div")
	.attr("id","venue-div-1")
  	.style("width","36.5%")
  	.style("height","71%")
  	.style("background-color","transparent")
  	.style("float","left")
  	.style("border-style","solid")
  	.style("border-color",currentColors['headingColor'])
  	.style("border-radius","30px")
  	.style("float","left")
  	.style("box-shadow","3px 3px "+boxShadowColor)
  	.style("margin-top","1%")
  	.style("margin-right","1%")
  	.style("color",currentColors['headingColor']);
d3.select("#venue-right-div")
	.append("div")
	.attr("id","venue-div-2")
  	.style("width","60%")
  	.style("height","34%")
  	.style("background-color","transparent")
  	.style("float","left")
  	.style("border-style","solid")
  	.style("border-color",currentColors['headingColor'])
  	.style("border-radius","30px")
  	.style("float","left")
  	.style("box-shadow","3px 3px "+boxShadowColor)
  	.style("margin-top","1%")
  	.style("margin-right","1%")
  	.style("color",currentColors['headingColor']);
d3.select("#venue-right-div")
	.append("div")
	.attr("id","venue-div-3")
  	.style("width","60%")
  	.style("height","34%")
  	.style("background-color","transparent")
  	.style("float","left")
  	.style("border-style","solid")
  	.style("border-color",currentColors['headingColor'])
  	.style("border-radius","30px")
  	.style("float","left")
  	.style("box-shadow","3px 3px "+boxShadowColor)
  	.style("margin-top","1%")
  	.style("margin-right","1%")
  	.style("color",currentColors['headingColor']);

    var selectedVenue;

    function populateDropDown(vnames){

                 d3.select("#left-top")
                                .append("button")
                                .attr("id","playerClearBtn")
                                .style("width","25%")
                                .style("height","8%")
                                .style("border-radius","10px")
                                .style("border-width","2px")
                                .style("margin-right","3%")
                                .style("margin-top","1.5%")
                                .style("border-color",currentColors['headingColor'])
                                .style("background-color","transparent")
                                .style("float","right")
                                .text("Clear")
                                .style("font-size","0.8em")
                                .on("focus",function(){
                                  d3.select(this).style("outline","none")
                                })
                                .on("click",function(){
                                      d3.select("#venue-div-1").selectAll("*").remove();
                                });

        let left_top_dropdown = d3.select("#left-top")
                                .append("select")
                                .attr("size","2")
                                .style("margin-top","3%")
                                .style("margin-left","7%")
                                .style("width","90%")
                                .style("height","82.5%")
                                .style("background-color","transparent")
                                .style("font-size","0.8em")
                                .style("border","none")
                                .on("focus",function(){
                                  d3.select(this).style("outline","none")
                                })
                                .on("change",venueChanged)

                                console.log(vnames)

          let div2dropdownOptions = left_top_dropdown.selectAll("option").data(Object.keys(vnames));
          div2dropdownOptions.enter().append("option").text(function(d){return d});
          

    function venueChanged(){
      venueNames = Object.keys(vnames)
      //console.log(left_top_dropdown.property("selectedIndex"))
      selectedVenue = venueNames[left_top_dropdown.property("selectedIndex")]
      if(selectedVenue){
          var state = vnames[selectedVenue]
          d3.select("#india").selectAll("path").style("opacity",function(d){if(d["id"]!=state) return "0.5"})
          $.post("/getVenueData", {'venue': selectedVenue}, function(data){
            console.log(data);
          })
        }
      plotPieChart(selectedVenue)


    };
    venueChanged();
  };
    function plotPieChart(selectedVenue){
      
      d3.select("#venue-div-1").selectAll("*").remove();
      let svg = d3.select("#venue-div-1")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 300)
                  .append("g")
                  .attr("transform", "translate(180,170)");

                  //console.log(venueData['tossDec'][selectedVenue])
      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(venueData['tossDec'][selectedVenue]))

      var arc=d3.arc()
                .innerRadius(0)
                .outerRadius(110)
      var en_arc=d3.arc()
                  .innerRadius(0)
                  .outerRadius(110*1.07)

      svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function(d,i){ if(i==0){ return "red"; }else{return "green";}})
        .attr("stroke", "white")
        .style("stroke-width", "2px")
    }

    function putDiv2Data(vdata){
        
        console.log(vdata);
        let svg = d3.select("#venue-div-2")
        .append("svg")
        .attr("width","100%")
        .attr("height","95%")
        .style("background-color","transparent");

        let teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];
        let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#DCDCDC'};

        HGData = vdata['homeWins']
         var map=d3.map(vdata['homeWins'])
        let x_domain = map.keys();
        let y_domain = [0,80];

        let x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
        let y_scale = d3.scaleLinear().domain(y_domain).range([280,100]);

        let xAxis = d3.axisBottom().scale(x_scale);
        let yAxis = d3.axisLeft().scale(y_scale);

        let x_axis = svg.append('g')
                    .attr('transform','translate('+[0,200]+')')
                    .call(xAxis);
        let y_axis = svg.append('g')
                  .attr('transform','translate('+[50,-80]+')')
                  .call(yAxis);

        //var groups = d3.map(vdata, function(d){console.log(d);})
        //var map=d3.map(vdata['homeWins'])
        //console.log(map.values())
        var stackedData = d3.stack()
                            .keys(["homeGrdWin","nonHomeGrdWin"])(map.values())
       // print(stackedData)

        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d,i) { if(i == 0) {return "red";} if(i==1){return "green";}; })
            .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { console.log(d);return d; })
            .enter().append("rect")
           .attr("x",function(d,i){ return 10+x_scale(x_domain[i]);})
            .attr("y", function(d) { return y_scale(d[1]) -80 ; })
            .attr("height", function(d) { return y_scale(d[0]) - y_scale(d[1]); })
            .attr("width",25)
       /* svg.append('text')
                    .attr("x",220)
                    .attr("y",285)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .text("Team");

        svg.append('text')
                    .attr("x",-200)
                    .attr("y",16)
                    .attr("transform", "rotate(-90)")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .text("Number of "+selectedOption);*/

        
    };

    function leftBottomData(){
    var proj = d3.geo.mercator();
    var path = d3.geo.path().projection(proj);
    
    //console.log(d3.select("#left-top").attr("width"))
    var map = d3.select("#left-bottom").append("svg:svg")
        .attr("viewBox","30 -30 540 700")
        .call(initialize);

    var india = map.append("svg:g")
        .attr("id", "india");

    d3.json("/static/json/states.json", function (json) {

    var colors = [ "#2152CD", "#F76E0A","#BC1527", "#FEE953", "#19459F","#46007A", "#DCDCDC", "#EA1A85"];
    var teams = [ "MI", "SRH","RCB", "CSK", "DC","KKR", "KXIP", "RR"];
    


      var div = d3.select("body").append("div") 
                    .attr("class", "tooltip")       
                    .style("opacity", 0)
                    .style("position", "absolute")     
                    .style("text-align", "center")    
                    .attr("width", 60)          
                    .style("height", 20)         
                    .style("padding", 4)       
                    .style("font", 12)    
                    .style("background", "#b3d1ff") 
                    .style("color","#0052cc")
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color","#0052cc")

      let units=india.selectAll("path")
                      .attr("id","ind_path")
                      .data(json.features)
                      .enter().append("path")               
                      .attr("d", path)
                      .style("fill",function(d){ return d["color"];})
                      .style("stroke","#A9A9A9")
                      .style("stroke-width","0.6px")
                      .style("opacity",1)               
                      /*.on("mouseover", function(d) {
                        console.log(selectedTeam)
                        d3.select(this)
                          .style("opacity",function(d){if(d["supportTeam"]!=selectedTeam){if(selectedTeam == "ALL"){return 0.6;}else{return 0.4;}}else{return 1;}}) 
                        /*Tooltip
                            .html("The exact value of<br>this cell is: " + d.value)
                          div.transition()    
                              .duration(200)    
                              .style("opacity", .9);  */ 
                           /*   if(selectedTeam == "ALL"){
                                  div.style("opacity", .9);
                                  div.html(d["id"]+ "<br/>") 
                                  .style("left", (d3.event.pageX) + "px")   
                                  .style("top", (d3.event.pageY - 28) + "px");
                            }
                            else if(selectedTeam == d["supportTeam"]){
                                div.style("opacity", .9);
                                div.html(d["id"]+ "<br/>") 
                                  .style("left", (d3.event.pageX) + "px")   
                                  .style("top", (d3.event.pageY - 28) + "px");
                            }

                      })
                      .on("mouseout", function(d) {
                        if(selectedTeam == "ALL"){
                            d3.select(this)
                              .style("opacity","1")
                          }
                          div.style("opacity", 0); 
                      });*/


                for(var j = 1;j <= 8;j++){
                      india.append('rect')
                          .attr("x",450)
                          .attr("y",300+(j*27))
                          .attr("width",13)
                          .attr("height",13)
                          .style("fill",function(d){ return colors[j-1]});

                     india.append('text')
                          .attr("x",480)
                          .attr("y",310+(j*27))
                          .attr("width",13)
                          .attr("height",13)
                          .attr("font-size","16px")
                          .text(teams[j-1]);
                    }

                    india.append('text')
                          .attr("x",100)
                          .attr("y",0)
                          .attr("width",30)
                          .attr("height",30)
                          .text("Pie chart -Dilip fill the text");

      });

        function initialize() {
          proj.scale(6700);
          proj.translate([-1240, 720]);
        }
    };

    function displayVenuePlots(){
      $.post("/getVenueData", {'venue': selectedVenue}, function(data){

        venueData = data
        populateDropDown(venueData['venueNames'])
        putDiv2Data(venueData)

      });
    };

    displayVenuePlots();
    leftBottomData();
};