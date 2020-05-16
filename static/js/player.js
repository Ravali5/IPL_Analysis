function playerAnalysisDisplay(){
	let playerData = {};
	d3.select("#left-top").style("height","39%");
	d3.select("#left-bottom").style("height","58%");
	d3.select("#right")
	  .append("div")
	  .attr("id","player-right-div")
	  .style("width","100%")
	  .style("height","88%")
	  .style("background-color","transparent")
	  .style("float","left");
	d3.select("#player-right-div")
		.append("div")
		.attr("id","player-div-1")
	  	.style("width","99%")
	  	.style("height","30%")
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
	d3.select("#player-right-div")
		.append("div")
		.attr("id","player-div-2")
	  	.style("width","99%")
	  	.style("height","65%")
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
	d3.select("#left-top")
		.append("div")
		.attr("id","left-top-div")
		.style("height","100%")
		.style("width","100%");
	d3.select("#left-top-div")
		.append("div")
		.style("width","100%")
		.style("height","5%")
		.style("float","left");
	d3.select("#left-top-div")
		.append("div")
		.attr("id","left-top-div-span")
		.style("width","70%")
		.style("height","10%")
		.style("text-align","center")
		.style("float","left")
		.style("background-color","transparent");
	d3.select("#left-top-div")
		.append("button")
		.attr("id","playerClearBtn")
		.style("width","29%")
		.style("height","10%")
		.style("border-radius","10px")
		.style("border-width","2px")
		.style("border-color",currentColors['headingColor'])
		.style("background-color","transparent")
		.text("Clear")
		.style("font-size","1em")
		.on("focus",function(){
			d3.select(this).style("outline","none")
		})
		.on("click",function(){
			playerClear();
		});
	d3.select("#left-top-div-span")
		.append("span")
		.style("font-size","1.5em")
		.text(" -- Select player -- ");
	playersList = d3.select("#left-top-div")
					.append("select")
					.attr("size","2")
					.style("width","90%")
					.style("height","80%")
					.style("margin-left","5%")
					.style("margin-top","1%")
					.style("background-color","transparent")
					.style("font-size","1em")
					.style("border","none")
					.on("focus",function(){
						d3.select(this).style("outline","none")
					})
					.on("change",function(){
						playerChange();
					});
	function appendImage(imgName){
		let divName = imgName;
		divName = divName.replace(/ /g,"-");
		d3.select("#player-div-1")
			.append("div")
			.attr("id",divName)
			.style("width","16%")
			.style("height","100%")
			.style("background-color","transparent")
			.style("margin-right","0%")
			.style("float","left")
			.style("text-align","center")
			.style("color","black");
		d3.select('#'+divName)
	        .append('img')
	        .attr("width","95%")
	        .attr("height","150")
	        .attr("src", "/static/images/players/"+imgName+".png")
	        .style("margin-left","2.5%")
	        .style("margin-right","2.5%")
	        .style("margin-top","1%")
	        .style("float","left");
	    d3.select("#"+divName)
	    	.append("span")
	    	.style("font-size","1.25em")
	    	.text(imgName);
	};
	function playerClear(){
		playersList.selectedIndex = -1;
		d3.select("#left-top-div-span").style("font-size","1.5em").text(" -- Select player -- ");
		d3.select("#player-div-1").selectAll("*").remove();
		appendImage(playerData['alltime_mostruns']['name']);
		appendImage(playerData['alltime_highscore']['name']);
		appendImage(playerData['alltime_beststrikerate']['name']);
		appendImage(playerData['alltime_mostwickets']['name']);
		appendImage(playerData['alltime_bowleconomy']['name']);
		appendImage(playerData['alltime_mostdotball']['name']);
	};
	function playerChange(){
		d3.select("#player-div-1").selectAll("*").remove();
		d3.select("#left-top-div-span").style("font-size","1.5em").text(playersList.property('value'));
		//console.log(playersList.property('value'));
	};
	function loadPlayerData(){
		$.post("/getPlayerData", {'player': 'all'}, function(data){
			console.log(data);
			playerData = data;
			let playersListOptions = playersList.selectAll("option").data(data['players'].sort());
			playersListOptions.enter().append("option").text(function(d){return d;});
			playerClear();
		});
	};

	loadPlayerData();
};