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
    var venueData;

  function populateDropDown(vnames){

    d3.select("#left-top")
                    .append("text")
                    .attr("id","playerselect")
                    .style("font-size","16px")
                    .style("font-weight","bold")
                    .text(" -- Select a stadium from dropdown -- ")
                    .style("margin-left","8%")
                    .style("margin-top","15%")

     d3.select("#left-top")
                    .append("button")
                    .attr("id","playerClearBtn")
                    .style("width","25%")
                    .style("height","8%")
                    .style("border-radius","10px")
                    .style("border-width","2px")
                    .style("margin-right","3%")
                    .style("margin-top","2%")
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
                          putDiv2Data(venueData)
                          putDiv3Data_line(venueData['NMatches'])
                          d3.select("#india").selectAll("path").style("fill",function(d){ return currentColors['bodyBackgroundColor'];})
                          venueClear();
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

    function venueClear(){
      d3.select("#venue-details").selectAll("*").remove();
      d3.select("#venue-div-1").style("display","none");
      d3.select("#venue-div-2").style("width","100%");
      d3.select("#venue-div-3").style("width","100%");
      let imgName = "/static/images/cricketstadium.png";

      d3.select('#venue-details')
          .append('img')
          .attr("width","25%")
          .attr("height","140")
          .attr("src", imgName)
          .style("margin-left","2.5%")
          .style("margin-right","2.5%")
          .style("margin-top","1%")
          .style("float","left");
      let vdet = d3.select("#venue-details")
                    .append("svg")
                    .style("width","70%")
                    .style("height","100%")
                    .style("background-color","transparent")
                    .style("float","left");

           vdet.append("text").attr("x",50).attr("y",50).attr("font-size","24px").attr("font-weight","bold").attr("font-style","italic").text("Analysis of IPL Matches based on the Stadium ");
           vdet.append("text").attr("x",50).attr("font-size","16px").attr("y",100).text("This page shows various statistics of how aspects of stadium can effect the match");
    };  

    function venueChanged(){
      venueNames = Object.keys(vnames)
      //console.log(left_top_dropdown.property("selectedIndex"))
      d3.select("#venue-details").selectAll("*").remove();
      selectedVenue = venueNames[left_top_dropdown.property("selectedIndex")]
      if(selectedVenue){
          d3.select("#venue-div-1").style("display","block");
          d3.select("#venue-div-2").style("width","60%");
          d3.select("#venue-div-3").style("width","60%");
          var state = vnames[selectedVenue];
          d3.select("#india").selectAll("path").style("fill",function(d){if(d["id"]!=state) {return currentColors['bodyBackgroundColor'];}else{return currentColors['headingColor'];}})

          //console.log(d3.select("#india"))
          //d3.select("#playerselect").text(selectedVenue)
          d3.select("#india").selectAll("path").append('text')
                          .attr("x",100)
                          .attr("y",20)
                          .attr("width",30)
                          .attr("height",30)
                          .style("font-size","20px")
                          .attr("font-weight","bold")
                          .text(function(d){return d["id"]});

          d3.select("#venue-div-2").selectAll("*").remove();
          d3.select("#venue-div-3").selectAll("*").remove();
          $.post("/getVenueData", {'venue': selectedVenue}, function(data){
                putDiv2Data(data)
                putDiv3Data(data['battingFriendly'])
                let imgName = "/static/images/venue/"+selectedVenue+".jpg";

                d3.select('#venue-details')
                    .append('img')
                    .attr("width","25%")
                    .attr("height","140")
                    .attr("src", imgName)
                    .style("margin-left","2.5%")
                    .style("margin-right","2.5%")
                    .style("margin-top","1%")
                    .style("float","left");
                let vdet = d3.select("#venue-details")
                              .append("svg")
                              .style("width","70%")
                              .style("height","100%")
                              .style("background-color","transparent")
                              .style("float","left");

                vdet.append("text")
                      .style("font-size","1.5em")
                      .text(selectedVenue)
                      .attr("x",30)
                      .attr("y",40);

                console.log(data)
                vdet.append("text").attr("x",30).attr("y",70).text("City:");
                vdet.append("text").attr("x",200).attr("y",70).text("Capacity:");
                vdet.append("text").attr("x",350).attr("y",70).text("Pavilions:");
                vdet.append("text").attr("x",30).attr("y",125).text("Home Ground of:");

                vdet.append("text").attr("x",30).attr("y",90).text(data['city']);
                vdet.append("text").attr("x",200).attr("y",90).text(data['capacity']);
                vdet.append("text").attr("x",350).attr("y",90).text(data['pavilions']);
                vdet.append("text").attr("x",170).attr("y",125).text(data['TeamName']);


          })
          plotPieChart(selectedVenue);

      }else{
        d3.select('#venue-details')
          .append('img')
          .attr("width","25%")
          .attr("height","140")
          .attr("src", "/static/images/cricketstadium.png")
          .style("margin-left","2.5%")
          .style("margin-right","2.5%")
          .style("margin-top","1%")
          .style("float","left");
        let vdet1 = d3.select("#venue-details")
                        .append("svg")
                        .style("width","70%")
                        .style("height","100%")
                        .style("background-color","transparent")
                        .style("float","left");

        vdet1.append("text").attr("x",50).attr("y",50).attr("font-size","24px").attr("font-weight","bold").attr("font-style","italic").text("Analysis of IPL Matches based on the Stadium ");
        vdet1.append("text").attr("x",50).attr("font-size","16px").attr("y",100).text("This page shows various statistics of how aspects of stadium can effect the match");
        d3.select("#venue-div-1").style("display","none");
        d3.select("#venue-div-2").style("width","100%");
        d3.select("#venue-div-3").style("width","100%");
      }
    };

    venueChanged();
  };
  function plotPieChart(selectedVenue){
    
    d3.select("#venue-div-1").selectAll("*").remove();
    let svg = d3.select("#venue-div-1")
                .append("svg")
                .attr("width", 400)
                .attr("height", 500)
                .append("g")
                .attr("transform", "translate(180,170)");

                //console.log(venueData['tossDec'][selectedVenue])
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(venueData['tossDec'][selectedVenue]))

    var le = d3.values(venueData['tossDec'][selectedVenue])
    //console.log(le)
    var sum = le.reduce(function(a, b){
        return a + b;
    }, 0);

    var arc=d3.arc()
              .innerRadius(0)
              .outerRadius(110)
    var en_arc=d3.arc()
                .innerRadius(0)
                .outerRadius(110*1.07)

    var div = d3.select("body").append("div") 
                    .attr("class", "tooltip")       
                    .style("opacity", 0)
                    .style("position", "absolute")     
                    .style("text-align", "center")    
                    .attr("width", 60)          
                    .style("height", 20)         
                    .style("padding", 4)       
                    .style("font", 12)    
                    .style("background", btnMouseoverBGColor) 
                    .style("color","black")
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color",headingColor)

    var percent;
    let j;
    var max =0
    svg.selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .style('fill', function(d,i){ if(i==0){ return currentColors['headingColor']; }else{return "#404040";}})
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .on("mouseover", function(d,i) {
                        d3.select(this)
                           .attr("d", en_arc);
                           percent= (d.value * 100)/sum
                           if(max<percent){
                              max = percent
                              j=i
                           }
                    if(j==0) {
                            d3.select("#text1").remove();
                            d3.select("#text2").remove();
                            d3.select("#text3").remove();
                           svg.append("text").attr("id","text1").attr("x", -120).attr("y", 240).text("More percentage of blue shows that the team that").style("font-size", "14px").attr("alignment-baseline","middle")
                            svg.append("text").attr("id","text2").attr("x", -120).attr("y", 260).text("wins the toss always chooses to bat on this stadium").style("font-size", "14px").attr("alignment-baseline","middle")
                           // svg.append("text").attr("id","text3").attr("x", -120).attr("y", 280).text("this may be because the pitch is more batting friendly").style("font-size", "13px").attr("alignment-baseline","middle")
                   }
                  if(j==1) {
                            d3.select("#text1").remove();
                            d3.select("#text2").remove();
                            d3.select("#text3").remove();
                          svg.append("text").attr("id","text1").attr("x", -120).attr("y", 240).text("More percentage of black shows that the team that").style("font-size", "14px").attr("alignment-baseline","middle")
                          svg.append("text").attr("id","text2").attr("x", -120).attr("y", 260).text("wins the toss always chooses to field on this stadium").style("font-size", "14px").attr("alignment-baseline","middle")
                           //svg.append("text").attr("id","text3").attr("x", -120).attr("y", 280).text("this may be because the pitch is more bowling friendly").style("font-size", "13px").attr("alignment-baseline","middle")
                    }
                         div .style("opacity", .9);
                         div.html( percent.toFixed(1)+"%"+"<br/>") 
                            .style("left", (d3.event.pageX) + "px")   
                            .style("top", (d3.event.pageY - 28) + "px"); 
                        
        })
        .on("mouseout", function(d) {
                        d3.select(this)
                          .style("opacity","1")
                          .attr("d",arc)
                          div.style("opacity", 0); 
        });
        //console.log(j)
        

      svg.append('text')
                  .attr("x",-170)
                  .attr("y",-130)
                  .attr("width",10)
                  .attr("height",10)
                  .attr("font-size","15px")
                  .attr("font-weight","bold")
                  .text("Pie chart of toss decisions based on the stadium pitch");

       svg.append("circle").attr("cx",-100).attr("cy",150).attr("r", 4).style("fill", currentColors['headingColor'])
       svg.append("circle").attr("cx",-100).attr("cy",180).attr("r", 4).style("fill", "#404040")
       svg.append("text").attr("x", -70).attr("y", 150).text("Percentage of choosing batting").style("font-size", "14px").attr("alignment-baseline","middle")
       svg.append("text").attr("x", -70).attr("y", 180).text("Percentage of choosing fielding").style("font-size", "14px").attr("alignment-baseline","middle")
       //svg.append("text").attr("x", -120).attr("y", 240).text("More percentage of blue shows that team that").style("font-size", "13px").attr("alignment-baseline","middle")
       //svg.append("text").attr("x", -120).attr("y", 260).text("wins the toss always chooses to bat on this stadium").style("font-size", "13px").attr("alignment-baseline","middle")
       //console.log(percent)
       //svg.append("text").attr("x", -120).attr("y", 280).text("this may be because the pitch is more batting friendly").style("font-size", "13px").attr("alignment-baseline","middle")
  };

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
        if(selectedVenue)
          var map=d3.map(vdata['WL'])
        else
         var map=d3.map(vdata['homeWins'])
        let x_domain = map.keys();
        //let y_domain = [0,80];
        let x_scale;
        if(selectedVenue){
          x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
        }
        else{
          x_scale = d3.scaleBand().domain(x_domain).range([50,600]);
        }

        let y_scale = d3.scaleLinear().range([280,100]);


        //var groups = d3.map(vdata, function(d){console.log(d);})
        //var map=d3.map(vdata['homeWins'])
        //console.log(map.values())
        //console.log("selectedVenue"+selectedVenue)
        if(selectedVenue){
          var stackedData = d3.stack()
                       .keys(["teamVenueWins","teamVenueLosses"])(map.values())
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

        //console.log(vdata['TeamName']);
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d,i) { if(i == 0) {return currentColors['headingColor'];} if(i==1){return "#404040";}; })
            .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
            .on("mouseover",function(){
                  //https://stackoverflow.com/questions/23703089/d3-js-change-color-and-size-on-line-graph-dot-on-mouseover
                  //https://stackoverflow.com/questions/24973067/bar-chart-show-values-on-top
                  svg.append("text")
                    .attr("class","val")
                    .attr("x",(d3.select(this).attr("x"))-(-5))
                    .attr("y",d3.select(this).attr("y")-(-17))
                    .attr("fill",currentColors['textInHeadingColor'])
                    .text(d3.select(this).attr("yval"));
                  })
                  .on("mouseleave",function(){
                    svg.select(".val").remove();
                    svg.select(".numLable").remove();
                    //svg.select(".xLable").remove();
                    //svg.select(".yLable").remove();
            })
           .attr("x",function(d,i){ if(selectedVenue){return 10+x_scale(x_domain[i]);}else{ return 23+x_scale(x_domain[i]);}})
            .attr("y", function(d) { return y_scale(d[1]) -80 ; })
            .transition()
            .duration(500)
            .attr("height", function(d,i) { return y_scale(d[0]) - y_scale(d[1])  })
            .attr("border","3px")
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
                    .attr("x",220)
                    .attr("y",15)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Wins of each team in their HomeGround and other stadiums");
                  }
        if(selectedVenue){
              svg.append("circle").attr("cx",403).attr("cy",50).attr("r", 4).style("fill", currentColors['headingColor'])
               svg.append("circle").attr("cx",403).attr("cy",80).attr("r", 4).style("fill", "#404040")
               svg.append("text").attr("x", 412).attr("y", 50).text("No. of Wins in this stadium").style("font-size", "13px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 412).attr("y", 80).text("No. of losses in this stadium").style("font-size", "13px").attr("alignment-baseline","middle")
               
        }
        else{
               svg.append("circle").attr("cx",663).attr("cy",50).attr("r", 4).style("fill", currentColors['headingColor'])
               svg.append("circle").attr("cx",663).attr("cy",80).attr("r", 4).style("fill", "#404040")
               svg.append("text").attr("x", 672).attr("y", 50).text("No. of Wins in Home Ground").style("font-size", "14px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 672).attr("y", 80).text("No. of Wins Not in Home Ground").style("font-size", "14px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 665).attr("y", 120).text("Plot shows how many matches each team").style("font-size", "12px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 665).attr("y", 140).text("won when they playin their home ground").style("font-size", "12px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 665).attr("y", 160).text("The bars here show more amount of blue ").style("font-size", "12px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 665).attr("y", 180).text("portion which signifies that teams win").style("font-size", "12px").attr("alignment-baseline","middle")
               svg.append("text").attr("x", 665).attr("y", 200).text("more when they play in home ground").style("font-size", "12px").attr("alignment-baseline","middle")
       }

                                        
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
                          .style("font-size","20px")
                          .attr("font-weight","bold")
                          .text("India Map to show Stadium's location");
                    if(selectedVenue){

                      india.append('text')
                          .attr("x",100)
                          .attr("y",20)
                          .attr("width",30)
                          .attr("height",30)
                          .style("font-size","20px")
                          .attr("font-weight","bold")
                          .text(function(d){return d["id"]});
                    }

      });

        function initialize() {
          proj.scale(6700);
          proj.translate([-1240, 720]);
        }
    };

    function putDiv3Data(avg){
     d3.select("#venue-div-3").selectAll("*").remove();
      //console.log(avg['battingFriendly'])
      //avg['battingFriendly']/250
    var value = avg['battingFriendly']
    var text = value
    var data = [value-125,165-value]
    
    // Settings
    var width = 600
    var height = 240
    var anglesRange = 0.5 * Math.PI
    var radis = 100
    var thickness = 60
    // Utility 
//     var colors = d3.scale.category10();
    var colors = [currentColors['headingColor'], "#404040"]
    
    var pies = d3.pie()
      .value( d => d)
      .sort(null)
      .startAngle( anglesRange * -1)
      .endAngle( anglesRange)
    
    var arc = d3.arc()
      .outerRadius(radis)
      .innerRadius(radis - thickness)
    
    var translation = (x, y) => `translate(${x}, ${y})`
    
    var svg = d3.select("#venue-div-3").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "half-donut")
      .append("g")
      .attr("transform", translation((width / 2) -170, height-50))
    
    
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
      .attr("fill","white")


      if(selectedVenue){
        svg.append('text')
                      .attr("x",-120)
                      .attr("y",-150)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","16px")
                      .attr("font-weight","bold")
                      .text("Average runs scored in "+selectedVenue);

        svg.append('text')
                      .attr("x",-80)
                      .attr("y",20)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","14px")
                      .attr("font-weight","bold")
                      .text(125);

          svg.append('text')
                      .attr("x",60)
                      .attr("y",20)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","14px")
                      .attr("font-weight","bold")
                      .text(165);

          svg.append('text')
                      .attr("x",100)
                      .attr("y",-120)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","14px")
                      .text("A stadium pitch having an average >150 can be ");

          svg.append('text')
                      .attr("x",100)
                      .attr("y",-100)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","14px")
                      .text("considered as a good batting pitch and with average <140");

          svg.append('text')
                      .attr("x",100)
                      .attr("y",-80)
                      .attr("width",10)
                      .attr("height",10)
                      .attr("font-size","14px")
                      .text("it can be considered as a good bowling pitch");
          let friendlyDes = ((parseInt(text)-125)*100.0)/40.0 ;
          if(friendlyDes <= 37.5){
            svg.append("text").attr("x",200).attr("y",-20).attr("font-size","1.5em").text("Bowling Pitch!");
            svg.append("svg:image").attr("x",150).attr("y",-50).style("width",50).style("height",50).attr("xlink:href","/static/images/bowl.png");
          }else if(friendlyDes > 37.5 && friendlyDes < 62.5){
            svg.append("text").attr("x",200).attr("y",-20).attr("font-size","1.5em").text("Neutral Pitch!");
            svg.append("svg:image").attr("x",150).attr("y",-50).style("width",50).style("height",50).attr("xlink:href","/static/images/batbowl.png");
          }else if(friendlyDes >= 62.5){
            svg.append("text").attr("x",200).attr("y",-20).attr("font-size","1.5em").text("Batting Pitch!");
            svg.append("svg:image").attr("x",150).attr("y",-50).style("width",50).style("height",50).attr("xlink:href","/static/images/bat.png");
          }
      }
    };

    function putDiv3Data_line(vdata){
             let svg = d3.select("#venue-div-3")
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

            let x_scale = d3.scaleBand().domain(x_domain).range([50,600]);
            let y_scale = d3.scaleLinear().range([280,100]);
            // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number

           // print(stackedData)
             y_scale.domain([0,60]);

             let xAxis = d3.axisBottom().scale(x_scale);
            let yAxis = d3.axisLeft().scale(y_scale);

            //let x_axis = svg.append('g')
             //           .attr('transform','translate('+[0,200]+')')
              //          .call(xAxis);
            let y_axis = svg.append('g')
                      .attr('transform','translate('+[80,-80]+')')
                      .call(yAxis);

            var line = d3.line()
                                    .x(function(d) { return x_scale(d)+37; })
                                    .y(function(d) { return y_scale(vdata[d])-85; });
            // 9. Append the path, bind the data, and call the line generator 
            svg.append("path")
                .datum(Object.keys(vdata)) // 10. Binds data to the line 
                .attr("class", "line") // Assign a class for styling 
                .attr("d", line)
                .style("stroke",currentColors['headingColor']); // 11. Calls the line generator 

            // 12. Appends a circle for each datapoint 
            svg.selectAll(".dot")
                .data(Object.keys(vdata))
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function(d, i) { return x_scale(d)+37 })
                .attr("cy", function(d) { return y_scale(vdata[d])-85 })
                .attr("r", 5)
                .attr("fill",function(d){if(vdata[d]> 50){return "#990000"}})
                .on("mouseover",function(d){
                
               
                     svg.append("text")  
                      .attr("id","labelline") 
                      .style("font-size","14px")
                      .style("font-weight","bold")
                      .text(d + "("+vdata[d]+" Matches)")
                      .attr("x",590)
                      .attr("y",26);
                })
                .on("mouseout",function(d){
                  d3.select("#labelline").remove();
                })


             svg.append('text')
                    .attr("x",200)
                    .attr("y",220)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","16px")
                    .attr("font-weight","bold")
                    .text("Number of matches played in each stadium");

              svg.append('text')
                    .attr("x",-180)
                    .attr("y",18)
                    .attr("transform", "rotate(-90)")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","14px")
                    .attr("font-weight","bold")
                    .text("Number of Matches");

              svg.append('text')
                    .attr("x",660)
                    .attr("y",100)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","13px")
                    .text("Stadiums with dark red dots");
              svg.append('text')
                    .attr("x",660)
                    .attr("y",120)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","13px")
                    .text("have highest number of matches");
              svg.append('text')
                    .attr("x",660)
                    .attr("y",140)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","13px")
                    .text(" played. This may include qualifiers,");
              svg.append('text')
                    .attr("x",660)
                    .attr("y",160)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("font-size","13px")
                    .text("semi finals, finals etc");

            svg.append("text").attr("x", 240).attr("y", 10).text("Please Hover on the dot to see the stadium details").style("font-size", "13px").attr("alignment-baseline","middle")
    }

    function displayVenuePlots(){

      $.post("/getVenueData", {'venue': selectedVenue}, function(data){

        venueData = data
        console.log(venueData)
        populateDropDown(venueData['venueNames'])
        putDiv3Data_line(venueData['NMatches'])
        putDiv2Data(venueData)
        

      });
    };

    displayVenuePlots();
    leftBottomData();
};