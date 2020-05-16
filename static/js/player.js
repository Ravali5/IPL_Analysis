function playerAnalysisDisplay(){
	let playerData = {};
	let pcData = [];
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
	function appendImage(imgTitle,imgName,imgVal){
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
		d3.select("#"+divName)
			.append("div")
			.style("font-size","1.25em")
			.html(imgTitle);
		d3.select('#'+divName)
	        .append('img')
	        .attr("width","95%")
	        .attr("height","140")
	        .attr("src", "/static/images/players/"+imgName+".png")
	        .style("margin-left","2.5%")
	        .style("margin-right","2.5%")
	        .style("margin-top","1%")
	        .style("float","left");
	    d3.select("#"+divName)
	    	.append("div")
	    	.style("font-size","1em")
	    	.html(imgName+"<br/>"+imgVal);
	};
	function plotPC(){
		let svg = d3.select("#player-div-2")
						.append("svg")
		                .attr("width", "100%")
		                .attr("height", "100%")
		                .append("g")
		                .attr("transform", "translate(0,0)");
		let dimensions = d3.keys(pcData[0]).filter(function(d) { return d; });
		dimensions.splice(dimensions.indexOf("Players"),1);
		dimensions.splice(dimensions.indexOf("skill"),1);
		dimensions.splice(dimensions.indexOf("Bat_Position"),1);
		dimensions.splice(dimensions.indexOf("Bowl_Position"),1);
		dimensions.splice(dimensions.indexOf("Bowl_Bowling_Figures"),1);
		//dimensions.splice(dimensions.indexOf("skill"),1);
		//console.log(dimensions);
		dimensions.sort();
		console.log(dimensions);
		let y = {};
		for(i in dimensions){
			y[dimensions[i]] = d3.scaleLinear().domain(d3.extent(pcData, function(d){return +d[dimensions[i]]; })).range([400,100]);
		}

		let x = d3.scalePoint().range([50,950]).padding(1).domain(dimensions);

		function path(d){
			return d3.line()(dimensions.map(function(p){ return [x(p), y[p](d[p])]; }));
		}

		svg.selectAll("myAxis")
		    .data(dimensions).enter()
		    .append("g")
		    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
		    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
		    .append("text")
		      //.style("text-anchor", "start")
		      .attr("y", 90)
		      //.attr("transform", "rotate(-45)")
		      .text(function(d) {
		      	return 'Test'; 
		      })
		      .style("fill", "black");

		svg.selectAll("myPath")
		    .data(pcData)
		    .enter().append("path")
		    .attr("d",  path)
		    .style("fill", "none")
		    .style("stroke", currentColors['headingColor'])
		    .style("opacity","0.5");


	};
	function playerClear(){
		playersList.selectedIndex = -1;
		d3.select("#left-top-div-span").style("font-size","1.5em").text(" -- Select player -- ");
		d3.select("#player-div-1").selectAll("*").remove();
		appendImage('Most Runs',playerData['alltime_mostruns']['name'],playerData['alltime_mostruns']['val']);
		appendImage('Highest Score',playerData['alltime_highscore']['name'],playerData['alltime_highscore']['val']);
		appendImage('Best Strike Rate',playerData['alltime_beststrikerate']['name'],playerData['alltime_beststrikerate']['val']);
		appendImage('Most Wickets',playerData['alltime_mostwickets']['name'],playerData['alltime_mostwickets']['val']);
		appendImage('Best Economy',playerData['alltime_bowleconomy']['name'],playerData['alltime_bowleconomy']['val']);
		appendImage('Most Dot Balls',playerData['alltime_mostdotball']['name'],playerData['alltime_mostdotball']['val']);
	};
	function playerChange(){
		d3.select("#player-div-1").selectAll("*").remove();
		d3.select("#left-top-div-span").style("font-size","1.5em").text(playersList.property('value'));
		//console.log(playersList.property('value'));
	};
	function loadPlayerData(){
		$.post("/getPlayerData", {'player': 'all'}, function(data){
			console.log(data);
			data['json'] = data['json'].replace(/NaN/g,"0");
			data['json'] = data['json'].split('},');
			data['json'].forEach(function(d){
				if(d.length > 1){
					let tempJson = JSON.parse(d+'}');
					if(typeof tempJson['Bat_Balls_Faced'] == 'string'){
						//console.log(tempJson['Bat_Balls_Faced']);
						tempJson['Bat_Balls_Faced'] = tempJson['Bat_Balls_Faced'].replace(/,/g,"");
						//console.log(tempJson['Bat_Balls_Faced']);
					}
					if(typeof tempJson['Bowl_Runs'] == 'string'){
						tempJson['Bowl_Runs'] = tempJson['Bowl_Runs'].replace(/,/g,"");
					}
					if(typeof tempJson['Bat_Highest_Score'] == 'string'){
						tempJson['Bat_Highest_Score'] = tempJson['Bat_Highest_Score'].replace(/,/g,"");
					}
					tempJson['Bat_Balls_Faced'] = parseInt(tempJson['Bat_Balls_Faced']);
					tempJson['Bowl_Runs'] = parseInt(tempJson['Bowl_Runs']);
					tempJson['Bat_Highest_Score'] = parseInt(tempJson['Bat_Highest_Score']);
					pcData.push(tempJson);
				}
			});
			console.log(pcData);
			playerData = data;
			let playersListOptions = playersList.selectAll("option").data(data['players'].sort());
			playersListOptions.enter().append("option").text(function(d){return d;});
			playerClear();
			plotPC();
		});
	};

	loadPlayerData();
};