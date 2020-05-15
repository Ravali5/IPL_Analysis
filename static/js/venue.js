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


    function populateDropDown(vnames){
        let left_top_dropdown = d3.select("#left-top")
                                .append("select")
                                .attr("size","2")
                                .style("margin-top","3%")
                                .style("margin-left","20%")
                                .style("width","75%")
                                .style("height","92.5%")

          let div2dropdownOptions = left_top_dropdown.selectAll("option").data(vnames);
          div2dropdownOptions.enter().append("option").text(function(d){return d});

      }

    function putDiv1Data(vdata){
        
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

    function displayVenuePlots(){
      $.post("/getVenueData", {'data': 'received'}, function(data){

        venueData = data
        populateDropDown(venueData['venueNames'])
        putDiv1Data(venueData);

      });
    };

    displayVenuePlots();
};