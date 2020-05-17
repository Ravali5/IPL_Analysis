function playerAnalysisDisplay(){
	let playerData = {};
	let pcData = [];
	let plines;
	let playerSelectFlag = false;
	let rawData = true;
	let clusterColor ={
		0 : 'yellow',
		1 : 'green',
		2 : 'black'
	};
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

		svg.append("rect")
			.attr("x",150).attr("y",25)
			.style("width","10%").style("height","10%")
			.attr("fill",currentColors['headingColor'])
			.on("click",function(d){
				rawData = true;
				//console.log(rawData);
				if(playerSelectFlag)
					plines.style("stroke",currentColors['textInHeadingColor']);
				else
					plines.style("stroke",currentColors['headingColor']);
			});
		svg.append("text")
			.attr("x",165).attr("y",50)
			.style("fill",currentColors['textInHeadingColor'])
			.text("Raw Data");

		svg.append("rect")
			.attr("x",300).attr("y",25)
			.style("width","10%").style("height","10%")
			.attr("fill",currentColors['headingColor'])
			.on("click",function(d){
				rawData = false;
				for(pData in pcData){
					//console.log(pcData[pData]);
					let tempData = pcData[pData];
					document.getElementById("line"+tempData['Players']).style.stroke = clusterColor[tempData['clusterNumber']];
				}
			});
		svg.append("text")
			.attr("x",310).attr("y",50)
			.style("fill",currentColors['textInHeadingColor'])
			.text("Cluster Data");

		/*svg.append("rect")
			.attr("x",150).attr("y",25)
			.style("width","10%").style("height","10%")
			.attr("fill",currentColors['headingColor']);
		svg.append("text")
			.attr("x",165).attr("y",50)
			.style("fill",currentColors['textInHeadingColor'])
			.text("Raw Data");*/

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
		      .style("text-anchor", "middle")
		      .attr("y", 90)
		      //.attr("transform", "rotate(-45)")
		      .text(function(d) {
		      	return ''; 
		      })
		      .style("fill", "black");

		plines = svg.selectAll("myPath")
					    .data(pcData)
					    .enter().append("path")
					    .attr("d",  path)
					    .attr("id",function(d){ return "line"+d['Players'];})
					    .attr("pName",function(d){ return d['Players'];})
					    .attr("cid",function(d){ return d['clusterNumber'];})
					    .style("fill", "none")
					    .style("stroke", currentColors['headingColor'])
					    .style("opacity","0.5")
					    .on("mouseover",function(){
					    	//console.log(d3.select(this).attr("pName"));
					    	svg.append("text")
					    		.attr("id","pNameLabel")
					    		.attr("x",700)
					    		.attr("y",50)
					    		.text(d3.select(this).attr("pName"));
					    	d3.select(this).style("stroke","red").style("stroke-width","4px").style("opacity","1");
					    })
					    .on("mouseout",function(d){
					    	d3.select("#pNameLabel").remove();
					    	if(rawData){
						    	if(playerSelectFlag)
						    		d3.select(this).style("stroke",currentColors['textInHeadingColor']).style("stroke-width","1px").style("opacity","0.05");
						    	else
							    	d3.select(this).style("stroke",currentColors['headingColor']).style("stroke-width","1px").style("opacity","0.5");
							}else{
								//console.log(clusterColor[d['clusterNumber']]);
								if(playerSelectFlag)
									d3.select(this).style("stroke",clusterColor[d['clusterNumber']]).style("stroke-width","1px").style("opacity","0.05");
								else
									d3.select(this).style("stroke",clusterColor[d['clusterNumber']]).style("stroke-width","1px").style("opacity","0.5");
							}
					    })
					    .on("click",function(d){
					    	//console.log(d['Players']);
					    	//playersList.selectedIndex = document.getElementById("option"+d['Players']).index;
					    	//playersList.value = d['Players'];
					    	//playerChange();
					    });

		svg.on("wheel",function(){console.log('scrolls')});

	};
	function playerClear(){
		playersList.selectedIndex = -1;
		playerSelectFlag = false;
		d3.select("#left-top-div-span").style("font-size","1.5em").text(" -- Select player -- ");
		d3.select("#player-div-1").selectAll("*").remove();
		if(plines != null){
			if(rawData)
				plines.style("stroke",currentColors['headingColor']);
			else{
				for(pData in pcData){
					//console.log(pcData[pData]);
					let tempData = pcData[pData];
					document.getElementById("line"+tempData['Players']).style.stroke = clusterColor[tempData['clusterNumber']];
				}
			}
			plines.style("opacity","0.5");
			plines.style("stroke-width","1px");
		}
		appendImage('Most Runs',playerData['alltime_mostruns']['name'],playerData['alltime_mostruns']['val']);
		appendImage('Highest Score',playerData['alltime_highscore']['name'],playerData['alltime_highscore']['val']);
		appendImage('Best Strike Rate',playerData['alltime_beststrikerate']['name'],playerData['alltime_beststrikerate']['val']);
		appendImage('Most Wickets',playerData['alltime_mostwickets']['name'],playerData['alltime_mostwickets']['val']);
		appendImage('Best Economy',playerData['alltime_bowleconomy']['name'],playerData['alltime_bowleconomy']['val']);
		appendImage('Most Dot Balls',playerData['alltime_mostdotball']['name'],playerData['alltime_mostdotball']['val']);
	};
	function playerChange(){
		playerSelectFlag = true;
		d3.select("#player-div-1").selectAll("*").remove();
		d3.select("#left-top-div-span").style("font-size","1.5em").text(playersList.property('value'));
		//console.log(playersList.property('value'));
		let selectedPlayer = playersList.property('value');
		console.log(selectedPlayer);
		if(rawData)
			plines.style("stroke",currentColors['textInHeadingColor']);
		else{
			for(pData in pcData){
				//console.log(pcData[pData]);
				let tempData = pcData[pData];
				document.getElementById("line"+tempData['Players']).style.stroke = clusterColor[tempData['clusterNumber']];
			}
		}
		plines.style("opacity","0.1");
		let selectedElement = document.getElementById("line"+selectedPlayer);
		if(rawData)
			selectedElement.style.stroke = currentColors['headingColor'];
		else
			selectedElement.style.stroke = clusterColor[selectedElement.getAttribute('cid')];
		selectedElement.style.opacity= 1;
		selectedElement.style.strokeWidth = "3px";

		let imgName = "/static/images/players/"+selectedPlayer+".png";

		$.ajax({
		    url:imgName,
		    type:'HEAD',
		    error: function()
		    {
		    	imgName = "/static/images/players/nopic.png";
		    	putPlayerDiv1();
		    },
		    success: function()
		    {
		        putPlayerDiv1();
		    }
		});

		function putPlayerDiv1(){
			d3.select('#player-div-1')
			        .append('img')
			        .attr("width","15%")
			        .attr("height","140")
			        .attr("src", imgName)
			        .style("margin-left","2.5%")
			        .style("margin-right","2.5%")
			        .style("margin-top","1%")
			        .style("float","left");
		};
		
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
			playersListOptions.enter().append("option").attr("id",function(d){ return "option"+d;}).text(function(d){return d;});
			playerClear();
			plotPC();
		});
	};

	loadPlayerData();
};