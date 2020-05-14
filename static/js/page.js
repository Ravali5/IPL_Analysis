function performAnalysis(){
	d3.select("#team-right-div").remove();
	d3.select("#left-top").selectAll("*").remove();
	d3.select("#left-bottom").selectAll("*").remove();
	currentColors = bgColorsTeam["ALL"];
	d3.select("body").style("background-color",currentColors['bodyBackgroundColor']);
  	d3.select("#heading").style("background-color",currentColors['headingColor']).style("color",currentColors['textInHeadingColor']);
  	d3.select("#left-top").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  	d3.select("#left-bottom").style("border-color",currentColors['headingColor']).style("box-shadow","3px 3px "+currentColors['boxShadowColor']);
  	d3.select("#menubar-label").style("color",currentColors['headingColor']);
  	d3.select("#menubar-search-txt").style("border-color",currentColors['headingColor']).style("color",currentColors['headingColor']);
  	d3.select("#menubar-search-btn").style("color",currentColors['headingColor']);
  	d3.selectAll(".menubar-btn")
		.style("background-color","transparent")
		.style("color",currentColors['headingColor'])
		.style("border-color",currentColors['headingColor'])
		.on("mouseover",function(){
			d3.select(this).style("background-color",currentColors['btnMouseoverBGColor']);
		})
		.on("mouseout",function(){
			d3.select(this).style("background-color","transparent");
			d3.select('#'+analysisby).style("background-color",currentColors['headingColor'])
		});
	console.log(analysisby);
	d3.select("#"+analysisby).style("background-color",currentColors['headingColor']).style("color",currentColors['textInHeadingColor']);
	if(analysisby=='team-btn')
		teamAnalysisDisplay();
	else if(analysisby=='player-btn')
		playerAnalysisDisplay();
	else if(analysisby=='venue-btn')
		venueAnalysisDisplay();
};

function changeAnalysisByButtonColor(btn){
	analysisby = btn;
	performAnalysis();
};

changeAnalysisByButtonColor(analysisby);