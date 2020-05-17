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
                                      d3.select("#venue-div-2").selectAll("*").remove();
                                      d3.select("#venue-div-3").selectAll("*").remove();
                                      console.log(venueData['homeWins'])
                                      selectedVenue = null
                                      putDiv2Data(venueData['homeWins'])

                                      d3.select("#india").selectAll("path").style("fill",function(d){ return currentColors['bodyBackgroundColor'];})
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

                                //console.log(vnames)

          let div2dropdownOptions = left_top_dropdown.selectAll("option").data(Object.keys(vnames));
          div2dropdownOptions.enter().append("option").text(function(d){return d});
          

    function venueChanged(){
      venueNames = Object.keys(vnames)
      //console.log(left_top_dropdown.property("selectedIndex"))
      selectedVenue = venueNames[left_top_dropdown.property("selectedIndex")]
      if(selectedVenue){
          var state = vnames[selectedVenue]
          d3.select("#india").selectAll("path").style("fill",function(d){if(d["id"]!=state) {return currentColors['bodyBackgroundColor'];}else{return currentColors['headingColor'];}})
          d3.select("#venue-div-2").selectAll("*").remove();
          $.post("/getVenueData", {'venue': selectedVenue}, function(data){
                putDiv2Data(data['WL'])
                putDiv3Data(data['battingFriendly'])
          })
          plotPieChart(selectedVenue)
        }
      


    };
    venueChanged();
  };
    function plotPieChart(selectedVenue){
      
      d3.select("#venue-div-1").selectAll("*").remove();
      let svg = d3.select("#venue-div-1")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 600)
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
        .style('fill', function(d,i){ if(i==0){ return currentColors['headingColor']; }else{return currentColors['textInHeadingColor'];}})
        .attr("stroke", "white")
        .style("stroke-width", "2px")

        svg.append('text')
                    .attr("x",-150)
                    .attr("y",-130)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Pie chart of toss decisions based on the stadium pitch");

         svg.append("circle").attr("cx",-100).attr("cy",150).attr("r", 4).style("fill", currentColors['headingColor'])
         svg.append("circle").attr("cx",-100).attr("cy",180).attr("r", 4).style("fill", currentColors['textInHeadingColor'])
         svg.append("text").attr("x", -70).attr("y", 150).text("Percentage of choosing batting").style("font-size", "13px").attr("alignment-baseline","middle")
         svg.append("text").attr("x", -70).attr("y", 180).text("Percentage of choosing fielding").style("font-size", "13px").attr("alignment-baseline","middle")
    }



    function putDiv2Data(vdata){
        
        //console.log(vdata);
        let svg = d3.select("#venue-div-2")
        .append("svg")
        .attr("width","100%")
        .attr("height","95%")
        .style("background-color","transparent");

        let teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];
        let teamColors = {'SRH':'#F76E0A','DC':'#19459F','RR':'#EA1A85','KKR':'#46007A','MI':'#2152CD','CSK':'#FEE953','RCB':'#BC1527','KXIP':'#DCDCDC'};

        HGData = vdata
         var map=d3.map(vdata)
        let x_domain = map.keys();
        //let y_domain = [0,80];

        let x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
        let y_scale = d3.scaleLinear().range([280,100]);


        //var groups = d3.map(vdata, function(d){console.log(d);})
        //var map=d3.map(vdata['homeWins'])
        //console.log(map.values())
        console.log("selectedVenue"+selectedVenue)
        if(selectedVenue){
          var stackedData = d3.stack()
                       .keys(["teamVenueLosses","teamVenueWins"])(map.values())
        }
        else{
        var stackedData = d3.stack()
                            .keys(["homeGrdWin","nonHomeGrdWin"])(map.values())
        }
       // print(stackedData)
       var max = d3.max(stackedData[stackedData.length-1], function(d) { return d[1]; });
       // print(stackedData)
         y_scale.domain([0,max]);

         let xAxis = d3.axisBottom().scale(x_scale);
        let yAxis = d3.axisLeft().scale(y_scale);

        let x_axis = svg.append('g')
                    .attr('transform','translate('+[0,200]+')')
                    .call(xAxis);
        let y_axis = svg.append('g')
                  .attr('transform','translate('+[50,-80]+')')
                  .call(yAxis);

        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d,i) { if(i == 0) {return currentColors['headingColor'];} if(i==1){return currentColors['textInHeadingColor'];}; })
            .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
            .on("mouseover",function(){
                  //https://stackoverflow.com/questions/23703089/d3-js-change-color-and-size-on-line-graph-dot-on-mouseover
                  //https://stackoverflow.com/questions/24973067/bar-chart-show-values-on-top
                  svg.append("text")
                    .attr("class","val")
                    .attr("x",(d3.select(this).attr("x"))-(-27))
                    .attr("y",d3.select(this).attr("y")-8)
                    .text(d3.select(this).attr("yval"));
                  })
                  .on("mouseleave",function(){
                    svg.select(".val").remove();
                    svg.select(".numLable").remove();
                    //svg.select(".xLable").remove();
                    //svg.select(".yLable").remove();
            })
           .attr("x",function(d,i){ return 10+x_scale(x_domain[i]);})
            .attr("y", function(d) { return y_scale(d[1]) -80 ; })
            .transition()
            .duration(500)
            .attr("height", function(d) { return y_scale(d[0]) - y_scale(d[1]); })
            .attr("width",25)
            .attr("yval",function(d){return d[1]})
            


       svg.append('text')
                    .attr("x",400)
                    .attr("y",225)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Team");

        if(selectedVenue){
          svg.append('text')
                    .attr("x",-180)
                    .attr("y",18)
                    .attr("transform", "rotate(-90)")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Number of Wins/losses");
        }
        else{
        svg.append('text')
                    .attr("x",-130)
                    .attr("y",18)
                    .attr("transform", "rotate(-90)")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Number of Wins");
                  }

        if(selectedVenue){
          svg.append('text')
                    .attr("x",70)
                    .attr("y",15)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Number of Wins/losses in "+selectedVenue);
        }
        else{
        svg.append('text')
                    .attr("x",70)
                    .attr("y",15)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","12px")
                    .attr("font-weight","bold")
                    .text("Wins of each team in their HomeGround and other stadiums");
                  }

         svg.append("circle").attr("cx",405).attr("cy",50).attr("r", 4).style("fill", currentColors['headingColor'])
         svg.append("circle").attr("cx",405).attr("cy",80).attr("r", 4).style("fill", currentColors['textInHeadingColor'])
         svg.append("text").attr("x", 415).attr("y", 50).text("No. of Wins in HomeGround").style("font-size", "13px").attr("alignment-baseline","middle")
         svg.append("text").attr("x", 415).attr("y", 80).text("No. of Wins Not in HomeGround").style("font-size", "13px").attr("alignment-baseline","middle")
                                        
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
                      .style("fill",function(d){ return currentColors['bodyBackgroundColor'];})
                      .style("stroke",currentColors['headingColor'])
                      .style("stroke-width","1.5px")
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

    function putDiv3Data(avg){
     d3.select("#venue-div-3").selectAll("*").remove();
      console.log(avg['battingFriendly'])
      //avg['battingFriendly']/250
    var value = avg['battingFriendly']
    var text = value
    var data = [value-82.5,250-value]
    
    // Settings
    var width = 300
    var height = 200
    var anglesRange = 0.5 * Math.PI
    var radis = 100
    var thickness = 60
    // Utility 
//     var colors = d3.scale.category10();
    var colors = [currentColors['headingColor'], currentColors['textInHeadingColor']]
    
    var pies = d3.pie()
      .value( d => d)
      .sort(null)
      .startAngle( anglesRange * -1)
      .endAngle( anglesRange)
    
    var arc = d3.arc()
      .outerRadius(radis)
      .innerRadius(radis - thickness)
    
    var translation = (x, y) => `translate(${x}, ${y})`
    
    // Feel free to change or delete any of the code you see in this editor!
    var svg = d3.select("#venue-div-3").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "half-donut")
      .append("g")
      .attr("transform", translation(width / 2, height))
    
    
    svg.selectAll("path")
      .data(pies(data))
      .enter()
      .append("path")
      .attr("fill", (d, i) => colors[i])
      .attr("d", arc)
    
    svg.append("text")
      .text( d => text)
      .attr("dy", "-3rem")
      .attr("class", "label")
      .attr("text-anchor", "middle")

    };

    function displayVenuePlots(){

      $.post("/getVenueData", {'venue': selectedVenue}, function(data){

        venueData = data
        console.log(venueData)
        populateDropDown(venueData['venueNames'])
        putDiv2Data(venueData['homeWins'])
        

      });
    };

    displayVenuePlots();
    leftBottomData();
};