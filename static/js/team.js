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

    var colors = [ "#2152CD", "#F76E0A","#BC1527", "#FEE953", "#19459F","#46007A", "#B7191A", "#EA1A85"];
    var teams = [ "MI", "SRH","RCB", "CSK", "DC","KKR", "KKIP", "RR"];

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

      var units=india.selectAll("path")
                      .data(json.features)
                      .enter().append("path")               
                      .attr("d", path)
                      .style("fill",function(d){ return d["color"];})
                      .style("stroke","#A9A9A9")
                      .style("stroke-width","0.6px")	               
                      .on("mouseover", function(d) {
                        d3.select(this)
                          .style("opacity",".6")
                        /*Tooltip
                            .html("The exact value of<br>this cell is: " + d.value)
                          div.transition()    
                              .duration(200)    
                              .style("opacity", .9);  */ 

                              div.style("opacity", .9);
                              div.html(d["id"]+ "<br/>") 
                              .style("left", (d3.event.pageX) + "px")   
                              .style("top", (d3.event.pageY - 28) + "px"); ;

                      })
                      .on("mouseout", function(d) {
                        d3.select(this)
                          .style("opacity","1")
                           div.style("opacity", 0); 
                      });


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


function drawPie(){
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //var radius = Math.min(width, height) / 2 - margin
    var radius = 110;
    var logoXY = {
      "MI"  :[115,55], //[105,45],
      "SRH" :[-55,-20],
      "RCB" :[-35,94],//[-35,80],
      "CSK" :[40,120],//[37,98],
      "DC"  :[-20,-55],//[-30,-60],
      "KKR" :[83,-50],//[75,-50],
      "KXIP":[-65,35],//[-65,30],
      "RR"  :[12,-68]//[5,-70]
    };

    var svg = d3.select("#left-bottom")
      .append("svg")
      .attr("width", 400)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(130,130)");


    $.post("/getPieData", {'data': 'received'}, function(data_pie){

      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data_pie['Likes ( In Millions )']))
      //console.log(data_pie['color'])

      var sum = data_pie['Likes ( In Millions )'].reduce(function(a, b){
        return a + b;
        }, 0);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      var arc=d3.arc()
          .innerRadius(0)
          .outerRadius(radius)

       var en_arc=d3.arc()
          .innerRadius(0)
          .outerRadius(radius*1.15)

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


      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function(d,i){ if (i<=7){ return data_pie['color'][i]; }})
        .attr("stroke", "black")
        .style("stroke-width", "0px")
        .on("mouseover", function(d,i) {
                        d3.select(this)
                           .attr("stroke","white")          
			               .attr("stroke-width","10px")
                           //.transition()
                           //.duration(50)
                           .attr("d", en_arc);

                          div .style("opacity", .9);
                          div.html((((data_pie['Likes ( In Millions )'][i]/sum)*100).toFixed(1))+"%"+ "<br/>") 
                             .style("left", (d3.event.pageX) + "px")   
                             .style("top", (d3.event.pageY - 28) + "px"); 
                        
                      })
                      .on("mouseout", function(d) {
                        d3.select(this)
                          .style("opacity","1")
                          .attr("d",arc)
                          div.style("opacity", 0); 
                      });


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
        .attr('width', 25)
        .attr('height', 25)
        .attr("xlink:href", function(d,i){ return "/static/images/"+data_pie['Team'][i]+".png"});

        for(var j = 1;j <= 8;j++){
            svg.append('rect')
                .attr("x",180)
                .attr("y",-80+(j*20))
                .attr("width",10)
                .attr("height",10)
                .style("fill",data_pie['color'][j-1]);
          }

          for(var j = 1;j <= 8;j++){
            svg.append('text')
                .attr("x",205)
                .attr("y",-71+(j*20))
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","12px")
                .text(data_pie['Team'][j-1]);
          }

          svg.append('text')
                .attr("x",-70)
                .attr("y",140)
                .attr("width",30)
                .attr("height",30)
                .text("Pie chart -Dilip fill the text");

   });
};

var teamAnalysisBtn = "teams-menubar-btn-all";

function changeBGColorsByTeam(team){
  //console.log('selected team is '+team);
  currentColors = bgColorsTeam[team];
  //console.log(currentColors);
  headingColor = currentColors['headingColor'];
  textInHeadingColor = currentColors['textInHeadingColor'];
  btnMouseoverBGColor = currentColors['btnMouseoverBGColor'];
  d3.select("body").style("background-color",currentColors['bodyBackgroundColor']);
  d3.select("#heading").style("background-color",currentColors['headingColor']).style("color",currentColors['textInHeadingColor']);
  d3.select("#left-top").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  d3.select("#left-bottom").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  d3.select("#menubar-label").style("color",currentColors['headingColor']);
  d3.select("#menubar-search-txt").style("border-color",currentColors['headingColor']).style("color",currentColors['headingColor']);
  d3.select("#menubar-search-btn").style("color",currentColors['headingColor']);
  d3.selectAll(".menubar-btn").style("border-color",currentColors['headingColor']);
  d3.selectAll(".teams-menubar-btn").style("border-color",currentColors['headingColor']);
  d3.select("#teams-div-1").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-2").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-3").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-4").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  d3.select("#teams-div-5").style("border-color",headingColor).style("box-shadow","3px 3px"+currentColors['boxShadowColor']);
  changeAnalysisByButtonColor(analysisby);
  changeTeamAnalysisButtonColor(teamAnalysisBtn);
  teamChange();
};

function changeTeamAnalysisButtonColor(btn){
  d3.selectAll(".teams-menubar-btn")
    .style("background-color","transparent")
    .style("color",headingColor);
  d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
};

d3.select("#right")
  .append("div")
  .attr("id","team-right-div")
  .style("width","100%")
  .style("height","88%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-menubar")
  .style("width","100%")
  .style("height","6%")
  .style("background-color","transparent")
  .style("float","left");

const team_menubar_btn_width = "9%";

// Button 1
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-all")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-all")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-all")
  .append("span")
  .text("All")
  .style("margin-top","10%")
  .style("font-size","1.25em");


// Button 2
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-srh")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-srh")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-srh")
  .append("span")
  .text("SRH")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 3
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-dc")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-dc")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-dc")
  .append("span")
  .text("DC")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 4
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-rr")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-rr")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-rr")
  .append("span")
  .text("RR")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 5
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-kkr")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-kkr")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-kkr")
  .append("span")
  .text("KKR")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 6
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-mi")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-mi")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-mi")
  .append("span")
  .text("MI")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 7
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-csk")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-csk")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-csk")
  .append("span")
  .text("CSK")
  .style("margin-top","10%")
  .style("font-size","1.25em");

// Button 8
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-rcb")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-rcb")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-rcb")
  .append("span")
  .text("RCB")
  .style("margin-top","10%")
  .style("font-size","1.25em");

  // Button 9
d3.select("#teams-menubar")
  .append("div")
  .attr("id","teams-menubar-btn-kxip")
  .attr("class","teams-menubar-btn")
  .style("width",team_menubar_btn_width)
  .style("height","90%")
  .style("margin-top","0.5%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-width","2px")
  .style("border-radius","10px")
  .style("float","left")
  .style("text-align","center")
  .style("color",headingColor)
  .on("mouseover",function(){
    d3.select(this).style("background-color",btnMouseoverBGColor);
  })
  .on("mouseout",function(){
    d3.select(this).style("background-color","transparent");
    d3.select('#'+teamAnalysisBtn).style("background-color",headingColor)
  })
  .on("click",function(){
    currentId = d3.select(this).attr('id');
    teamAnalysisBtn = currentId;
    selectedTeam = currentId.split("-");
    changeBGColorsByTeam(selectedTeam[3].toUpperCase());
    //changeTeamAnalysisButtonColor(currentId);
  });

d3.select("#teams-menubar-btn-kxip")
  .append("div")
  .style("width","100%")
  .style("height","15%")
  .style("background-color","transparent")
  .style("float","left");

d3.select("#teams-menubar-btn-kxip")
  .append("span")
  .text("KXIP")
  .style("margin-top","10%")
  .style("font-size","1.25em");

changeTeamAnalysisButtonColor(teamAnalysisBtn);

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-1")
  .style("width","65%")
  .style("height","46%")
  .style("margin-top","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-2")
  .style("width","32%")
  .style("height","46%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-3")
  .style("width","31%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-4")
  .style("width","31%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

d3.select("#team-right-div")
  .append("div")
  .attr("id","teams-div-5")
  .style("width","32%")
  .style("height","43%")
  .style("margin-top","1%")
  .style("margin-left","1%")
  .style("background-color","transparent")
  .style("border-style","solid")
  .style("border-color",headingColor)
  .style("border-radius","30px")
  .style("box-shadow","3px 3px "+boxShadowColor)
  .style("float","left");

function drawTeamWinPie(tdata){
 //console.log(tdata[0])
  d3.select("#left-bottom").selectAll("*").remove();
  var svg = d3.select("#left-bottom")
      .append("svg")
      .attr("width", 400)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(130,130)");



  var pie = d3.pie()
        .value(function(d) {if(d.key != 'totalMatches'){return d.value;} })
     var tdata_pie = pie(d3.entries(tdata))

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
                    .style("color",textInHeadingColor)
                    .style("border-style","solid")
                    .style("border-radius","30px")
                    .style("border-color",headingColor)

  svg.selectAll('whatever')
        .data(tdata_pie)
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', function(d,i){ if(i==0){ return textInHeadingColor; }else{return headingColor;}})
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function(d,i) {
                        d3.select(this)
                           .attr("d", en_arc);
                           var percent= (d.value * 100)/tdata["totalMatches"]

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

  svg.append('text')
                .attr("x",-70)
                .attr("y",140)
                .attr("width",30)
                .attr("height",30)
                .style("color",textInHeadingColor)
                .text(selectedTeam[3].toUpperCase()+" Win and Lose Percentage");

  svg.append('rect')
                .attr("x",130)
                .attr("y",-20)
                .attr("width",10)
                .attr("height",10)
                .style("fill",headingColor);
  svg.append('rect')
                .attr("x",130)
                .attr("y",10)
                .attr("width",10)
                .attr("height",10)
                .style("fill",textInHeadingColor);

  svg.append('text')
                .attr("x",155)
                .attr("y",-11)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Matches Won : "+tdata["wins"] );
  svg.append('text')
                .attr("x",155)
                .attr("y",21)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Matches Lost : "+tdata["losses"]);

  svg.append('text')
                .attr("x",145)
                .attr("y",-41)
                .attr("width",10)
                .attr("height",10)
                .attr("font-size","14px")
                .text("Total Matches : "+tdata["totalMatches"]);


};

function putDiv1Data(teamData){
  selectedTeam = teamAnalysisBtn.split("-");
  selectedTeam = selectedTeam[3].toUpperCase();
  imagefile = selectedTeam;
  if(selectedTeam=='ALL')
    imagefile = 'iplcup';
  d3.select('#teams-div-1').selectAll("*").remove();
  d3.select('#teams-div-1')
        .append('img')
        .attr("width","150")
        .attr("height","150")
        .attr("src", "/static/images/"+imagefile+".png")
        .style("margin-left","1%")
        .style("margin-top","1%")
        .style("float","left");

  var svg = d3.select("#teams-div-1")
        .append("svg")
        .attr("width","70%")
        .attr("height","90%")
        .style("background-color","transparent");

  var teams = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP'];

  var x_domain = teams;
  var y_domain = [0,5];
  var y_vals = teamData['cupWins'];
  console.log(y_vals);
  console.log(selectedTeam);
  if(selectedTeam != 'ALL'){
    let index = x_domain.indexOf(selectedTeam);
    x_domain.splice(index,1);
    y_domain = [0,10];
    y_vals = teamData['opponentData'];
  }
  console.log(y_vals);
  var x_scale = d3.scaleBand().domain(x_domain).range([50,400]);
  var y_scale = d3.scaleLinear().domain(y_domain).range([340,100]);

  var xAxis = d3.axisBottom().scale(x_scale);
  var yAxis = d3.axisLeft().scale(y_scale);

  var x_axis = svg.append('g')
              .attr('transform','translate('+[0,260]+')')
              .call(xAxis);
  var y_axis = svg.append('g')
            .attr('transform','translate('+[50,-80]+')')
            .call(yAxis);
  svg.selectAll(".bar")
        .data(teams)
        .enter()
        .append("rect")
        .style("fill",headingColor)
        .attr("x",function(d){ return x_scale(d)+10;})
        .attr("width",30)
        .attr("y",function(d){ 
          if(y_vals[d] != undefined){
            if(selectedTeam == 'ALL')
              return y_scale(y_vals[d])-80;
            return y_scale(y_vals[d]['wins'])-80;
          }else{
            return y_scale(0)-80;
          } 
        })
        .attr("height", function(d){
         if(y_vals[d] != undefined){
          if(selectedTeam=='ALL')
            return 340-y_scale(y_vals[d]);
          return 340-y_scale(y_vals[d]['wins']);
         }else{
          return 340-y_scale(0);
         } 
        });

};

function teamChange(){
  var teamData = {};
  selectedTeam = teamAnalysisBtn.split("-");
  //if(teamAnalysisBtn != 'teams-menubar-btn-all'){
    $.post("/getTeamData", {'team': selectedTeam[3].toUpperCase()}, function(data){
        console.log(data);
        teamData = data;
        if(selectedTeam[3].toUpperCase()=='ALL'){
          drawPie();
        }else{
          drawTeamWinPie(teamData); 
        }
        putDiv1Data(teamData);
    });
  //}else{
    d3.select("#left-bottom").selectAll("*").remove();
    d3.select("#left-top").selectAll("*").remove();
    d3.select('#teams-div-1').selectAll("*").remove();
    //console.log(teamData);
    generateMap();
  //}
};
teamChange();btnMouseoverBGColor