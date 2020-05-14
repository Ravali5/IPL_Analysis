function playerAnalysisDisplay(){
	d3.select("#left-top").style("height","10%");
	d3.select("#right")
	  .append("div")
	  .attr("id","player-right-div")
	  .style("width","100%")
	  .style("height","88%")
	  .style("background-color","transparent")
	  .style("float","left");	
};