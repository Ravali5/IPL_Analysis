function performAnalysis(){
	d3.select("#team-right-div").remove();
	d3.select("#left-top").selectAll("*").remove();
	d3.select("#left-bottom").selectAll("*").remove();
	if(analysisby=='team-btn')
		teamAnalysisDisplay();
	else if(analysisby=='player-btn')
		playerAnalysisDisplay();
	else if(analysisby=='venue-btn')
		venueAnalysisDisplay();
};

function changeAnalysisByButtonColor(btn){
	analysisby = btn;
	d3.selectAll(".menubar-btn")
		.style("background-color","transparent")
		.style("color",headingColor);
	//console.log(btn);
	d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
	performAnalysis();
};

changeAnalysisByButtonColor(analysisby);