function playerAnalysisDisplay(){
	let playerData = {};
	let pcData = [];
	let plines;
	let playerSelectFlag = false;
	let rawData = true;
	let leftBottomSvg = null;
	let hoverLineColor = "red";
	let clusterColor ={
		0 : '#cc6699',//maroon
		1 : '#00b33c',//green
		2 : 'black'//black
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
	function plotPCA(){
		let pcadata = playerData['pca'];
		console.log(pcadata);
		let domain = pcadata['xaxis_domain'];

		let svg = d3.select("#left-bottom")
              .append("svg")
              .attr("width","100%")
              .attr("height","100%")
              .style("background-color","transparent");

		//https://github.com/d3/d3-scale#band-scales
		let xSca = d3.scaleBand().domain(domain).range([50,350]).paddingOuter(0.2);
		let xAx = d3.axisBottom().scale(xSca);
		let ySca = d3.scaleLinear().domain([0,100]).range([390,150]);
		let yAx = d3.axisLeft().scale(ySca);

		let x_axis = svg.append('g')
              .attr('transform','translate('+[0,310]+')')
              .call(xAx);
  		let y_axis = svg.append('g')
            .attr('transform','translate('+[50,-80]+')')
            .call(yAx);

		//https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
		//https://www.d3-graph-gallery.com/graph/line_basic.html
	    svg.append("path")
	      .datum(pcadata['cum'])
	      .attr("fill", "none")
	      .attr("stroke", "steelblue")
	      .attr("stroke-width", 1.5)
	      .attr("d", d3.line()
	        .x(function(d,i) { return xSca('PC'+(i+1))+10 })
	        .y(function(d) { return ySca(d)-80 })
	      );

	    svg.selectAll(".bar")
			.data(pcadata['percentVar'])
			.enter()
			.append("rect")
			.on("mouseover",function(){
			//https://stackoverflow.com/questions/23703089/d3-js-change-color-and-size-on-line-graph-dot-on-mouseover
			d3.select(this).style("fill","#0066cc");
			//https://stackoverflow.com/questions/24973067/bar-chart-show-values-on-top
			svg.append("text")
				.attr("class","val")
				.attr("x",(d3.select(this).attr("x"))-(-10))
				.attr("y",d3.select(this).attr("y")-5)
				.text(d3.select(this).attr("yval"));
			})
			.on("mouseleave",function(){
				d3.select(this).style("fill","#3399ff");
				svg.select(".val").remove();
				svg.select(".numLable").remove();
				//svg.select(".xLable").remove();
				//svg.select(".yLable").remove();
			})
			.style("fill","#3399ff")
			.attr("x",function(d,i){ return xSca('PC'+(i+1))+5;})
			.attr("width",20)
			.attr("y",function(d){ return ySca(0)-80;})
			.attr("height",0)
			.transition()
			.duration(500)
			.attr("y",function(d){ return ySca(d)-80;})
			.attr("height",function(d){ return 390-ySca(d);})
			.attr("yval",function(d){return d});

	    svg.append("text")
			.attr("class","xLable")
			.attr("x",350)
			.attr("y",330)
			.text("PC");

		svg.append("text")
			.attr("class","yLable")
			.attr("x",-175)
			.attr("y",15)
			.attr("transform","rotate(-90)")
			.text("Percent Variance");

		svg.append("text")
			.attr("class","svgtitle")
			.attr("x",80)
			.attr("y",35)
			.text("Scree Plot to find Intrinsic Dimentionality");

		svg.append("text").attr("x",30).attr("y",370).text("Top Attributes computed from loading matrix are");
		svg.append("text").attr("x",30).attr("y",390).text("Batting Average, Batting Strike Rate, Runs Scored");
		svg.append("text").attr("x",30).attr("y",410).text("Bowling Average, Bowling Economy, Wickets Taken");
	};
	function plotPC(){
		let svg = d3.select("#player-div-2")
						.append("svg")
		                .attr("width", "100%")
		                .attr("height", "100%")
		                .append("g")
		                .attr("transform", "translate(0,0)");

		svg.append("rect")
			.attr("x",80).attr("y",410)
			.style("width","10%").style("height","7%")
			.attr("fill",currentColors['headingColor'])
			.on("click",function(d){
				rawData = true;
				d3.selectAll("#clusterColorLabel1").remove();
				//console.log(rawData);
				if(playerSelectFlag)
					plines.style("stroke",currentColors['textInHeadingColor']);
				else
					plines.style("stroke",currentColors['headingColor']);
			});
		svg.append("text")
			.attr("x",100).attr("y",430)
			.style("fill",currentColors['textInHeadingColor'])
			.text("Raw Data");

		svg.append("rect")
			.attr("x",207).attr("y",410)
			.style("width","10%").style("height","7%")
			.attr("fill",currentColors['headingColor'])
			.on("click",function(d){
				rawData = false;
				//svg.append("rect").attr("id","clusterColorLabel1").attr("x",350).attr("y",420).attr("fill",clusterColor[0]).style("width","15px").style("height","15px");
				//svg.append("rect").attr("id","clusterColorLabel1").attr("x",550).attr("y",420).attr("fill",clusterColor[1]).style("width","15px").style("height","15px");
				//svg.append("rect").attr("id","clusterColorLabel1").attr("x",750).attr("y",420).attr("fill",clusterColor[2]).style("width","15px").style("height","15px");
				for(pData in pcData){
					//console.log(pcData[pData]);
					let tempData = pcData[pData];
					document.getElementById("line"+tempData['Players']).style.stroke = clusterColor[tempData['clusterNumber']];
				}
			});
		svg.append("text")
			.attr("x",220).attr("y",430)
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

		let dimensions = d3.keys(pcData[0]).filter(function(d) { return d != "clusterNumber"; });
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
		    .attr("stroke-width","2px")
		    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
		    .on("mouseover",function(d){
		    	/*svg.append("text")
		    		.attr("id","xAxisLabel")
		    		.attr("transform", "rotate(-90)")
		    		.attr("x",-275)
		    		.attr("y",40)
		    		.text(d);*/
		    })
		    .on("mouseout",function(d){
		    	d3.select("#xAxisLabel").remove();
		    })
		    .append("text")
		      .style("text-anchor", "end")
		      .attr("y", 90)
		      .attr("transform", "rotate(-45)")
		      .attr("dy",'-4.5em')
		      .text(function(d) {
		      	if(d=='Bowl_Five_Wickets_in_an_Over')
		      		return 'Five Wickets in over';
		      	if(d=='Bowl_Four_Wickets_in_an_Over')
		      		return 'Four Wickets in over';
		      	return d; 
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
					    	let hoveredPlayerName = d3.select(this).attr("pName");
					    	let hoveredPlayerData = {};
							for(pData in pcData){
								//console.log(pData);
								if(pcData[pData]['Players'] == hoveredPlayerName)
									hoveredPlayerData = pcData[pData];
							}
					    	/*svg.append("text")
					    		.attr("id","pNameLabel")
					    		.attr("x",700)
					    		.attr("y",50)
					    		.text(hoveredPlayerName);*/
					    	svg.append("text")
					    		.attr("id","pNameLabel")
					    		.attr("transform", "rotate(-90)")
					    		.attr("x",-275)
					    		.attr("y",40)
					    		.text(hoveredPlayerName);
					    	if(d3.select(this).attr("pName") != playersList.property("value")){
					    		d3.select(this).style("stroke","red").style("stroke-width","4px").style("opacity","1");
					    	}

							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",30).attr("y",70).style("fill",hoverLineColor).style("font-size","1.5em").text(hoveredPlayerName);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",125).style("fill",hoverLineColor).text(hoveredPlayerData['Bat_Average']);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",185).style("fill",hoverLineColor).text(hoveredPlayerData['Bat_Strike_Rate']);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",245).style("fill",hoverLineColor).text(hoveredPlayerData['Bat_Runs']);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",305).style("fill",hoverLineColor).text(hoveredPlayerData['Bowl_Average']);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",365).style("fill",hoverLineColor).text(hoveredPlayerData['Bowl_Economy']);
							leftBottomSvg.append("text").attr("id","hoverLinePlayerLabel").attr("x",100).attr("y",425).style("fill",hoverLineColor).text(hoveredPlayerData['Bowl_Wickets']);

					    })
					    .on("mouseout",function(d){
					    	d3.select("#pNameLabel").remove();
					    	d3.selectAll("#hoverLinePlayerLabel").remove();
					    	if(d3.select(this).attr("pName") != playersList.property("value")){
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
							}
					    })
					    .on("click",function(d){
					    	//console.log(d['Players']);
					    	//playersList.selectedIndex = document.getElementById("option"+d['Players']).index;
					    	//playersList.value = d['Players'];
					    	//playerChange();
					    });

		svg.append("text").attr("x",350).attr("y",430).attr("font-size","1.5em").text("Parallel Coordinates Showing 22 dimensions of all players");

		svg.on("wheel",function(){		});

	};
	
	function playerClear(){
		leftBottomSvg = null;
		d3.select("#left-bottom").selectAll("*").remove();
		plotPCA();
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
	function putLeftBottomDivData(selectedPlayerData){
		leftBottomSvg = d3.select("#left-bottom")
							.append("svg")
							.style("width","90%")
							.style("height","100%");

		leftBottomSvg.append("text").attr("x",30).attr("y",40).style("fill",currentColors['headingColor']).style("font-size","1.5em").text(selectedPlayerData['Players']);
		leftBottomSvg.append("text").attr("x",30).attr("y",100).style("fill",currentColors['headingColor']).text("Batting Average");
		leftBottomSvg.append("text").attr("x",30).attr("y",125).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bat_Average']);
		leftBottomSvg.append("text").attr("x",30).attr("y",160).style("fill",currentColors['headingColor']).text("Batting Strike Rate");
		leftBottomSvg.append("text").attr("x",30).attr("y",185).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bat_Strike_Rate']);
		leftBottomSvg.append("text").attr("x",30).attr("y",220).style("fill",currentColors['headingColor']).text("Runs Scored");
		leftBottomSvg.append("text").attr("x",30).attr("y",245).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bat_Runs']);
		leftBottomSvg.append("text").attr("x",30).attr("y",280).style("fill",currentColors['headingColor']).text("Bowling Average");
		leftBottomSvg.append("text").attr("x",30).attr("y",305).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bowl_Average']);
		leftBottomSvg.append("text").attr("x",30).attr("y",340).style("fill",currentColors['headingColor']).text("Bowling Economy");
		leftBottomSvg.append("text").attr("x",30).attr("y",365).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bowl_Economy']);
		leftBottomSvg.append("text").attr("x",30).attr("y",400).style("fill",currentColors['headingColor']).text("Wickets Taken");
		leftBottomSvg.append("text").attr("x",30).attr("y",425).style("fill",currentColors['headingColor']).text(selectedPlayerData['Bowl_Wickets']);

	};
	function playerChange(){
		playerSelectFlag = true;
		d3.select("#player-div-1").selectAll("*").remove();
		d3.select("#left-top-div-span").style("font-size","1.5em").text(playersList.property('value'));
		d3.select("#left-bottom").selectAll("*").remove();
		//console.log(playersList.property('value'));
		let selectedPlayer = playersList.property('value');
		let selectedPlayerData = {};
		for(pData in pcData){
			//console.log(pData);
			if(pcData[pData]['Players'] == selectedPlayer)
				selectedPlayerData = pcData[pData];
		}
		console.log(selectedPlayer);
		console.log(selectedPlayerData);
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
		    	putLeftBottomDivData(selectedPlayerData);
		    },
		    success: function()
		    {
		        putPlayerDiv1();
		        putLeftBottomDivData(selectedPlayerData);
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

			d3.select('#player-div-1')
					.append('img')
					.attr("width","15%")
					.attr("height","140")
					.attr("src","/static/images/"+selectedPlayerData['skill']+".png")
					.style("float","left");

			let svg = d3.select("#player-div-1")
							.append("svg")
							.style("width","64%")
							.style("height","100%")
							.style("background-color","transparent")
							.style("float","left");

			svg.append("text").attr("x",50).attr("y",50).text("Dominant Hand");
			svg.append("text").attr("x",50).attr("y",125).text("Bowling Skill");
			svg.append("text").attr("x",250).attr("y",50).text("Batting Avg");
			svg.append("text").attr("x",250).attr("y",125).text("Bowling Avg");
			svg.append("text").attr("x",450).attr("y",50).text("Nationality");
			svg.append("text").attr("x",450).attr("y",125).text("Date of Birth");

			selectedPlayerDetails = playerData['playerDetails'][selectedPlayer];
			if(selectedPlayerDetails == null){
				//console.log("tre");
				selectedPlayerDetails={}
				selectedPlayerDetails['dominantHand'] = 'Data Not Available';
				selectedPlayerDetails['bowlingSkill'] = 'Data Not Available';
				selectedPlayerDetails['nationality']  = 'Data Not Available';
				selectedPlayerDetails['dob']		  = 'Data Not Available';
			}
			svg.append("text").attr("x",50).attr("y",75).text(selectedPlayerDetails['dominantHand']);
			svg.append("text").attr("x",50).attr("y",150).text(selectedPlayerDetails['bowlingSkill']);
			svg.append("text").attr("x",250).attr("y",75).text(selectedPlayerData['Bat_Average']);
			svg.append("text").attr("x",250).attr("y",150).text(selectedPlayerData['Bowl_Average']);
			svg.append("text").attr("x",450).attr("y",75).text(selectedPlayerDetails['nationality']);
			svg.append("text").attr("x",450).attr("y",150).text(selectedPlayerDetails['dob']);
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
			//plotPCA();
		});
	};

	loadPlayerData();
};