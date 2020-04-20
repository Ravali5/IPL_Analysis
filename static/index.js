	$.post("/test", {'data': 'received'}, function(data){
	      console.log(data);
    });

    var analysisby = "team-btn";
    const headingColor = '#0052cc';
    const textInHeadingColor = '#e67300';
    const bodyBackgroundColor = "#b3d1ff";
    const boxShadowColor = '#3385ff';
    const btnMouseoverBGColor = "#4d94ff";

    function changeAnalysisByButtonColor(btn){
    	analysisby = btn;
    	d3.selectAll(".menubar-btn")
    		.style("background-color","transparent")
    		.style("color",headingColor);
    	//console.log(btn);
    	d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
    };

    d3.select("#menubar-search-btn")
    	.style("font-size","1.5em")
    	.style("color",headingColor);

    d3.select("#menubar-search-txt")
    	.style("width","25%")
    	.style("height","70%")
    	.style("margin-left","3%")
    	.style("margin-top","1%")
    	.style("background-color","transparent")
    	.style("border-style","none none solid none")
    	.style("border-color",headingColor)
    	.style("color",headingColor)
    	.style("font-size","1.25em")
    	.on("focus",function(){
    		d3.select(this).style("outline","none")
    	});

	d3.selectAll(".menubar-btn-adjust")
		.style("width","100%")
		.style("height","15%")
		.style("background-color","transparent");

	d3.selectAll(".menubar-btn")
		.style("width","15%")
		.style("height","70%")
		.style("margin-top","0.5%")
		.style("margin-left","2%")
		.style("border-style","solid")
		.style("border-color",headingColor)
		.style("border-radius","25px")
		.style("float","left")
		.style("text-align","center")
		.style("color",headingColor)
		.style("font-size","1.25em")
		.on("mouseover",function(){
			d3.select(this).style("background-color",btnMouseoverBGColor);
		})
		.on("mouseout",function(){
			d3.select(this).style("background-color","transparent");
			d3.select('#'+analysisby).style("background-color",headingColor)
		})
		.on("click",function(){
			changeAnalysisByButtonColor(d3.select(this).attr('id'));
		});

    changeAnalysisByButtonColor(analysisby);

	d3.select("#menubar-label")
		.style("margin-left","2%")
		.style("margin-top","1.5%")
		.style("float","left")
		.style("font-size","1.5em")
		.style("color",headingColor);

    d3.select("#menubar")
    	.style("width","100%")
    	.style("height","6%")
    	.style("float","left")
    	.style("background-color","transparent");

    d3.select("#ipl-label")
    	.style("margin-left","5%")
    	.style("float","left")
    	.style("font-size","2em");

    d3.select("#author-label")
    	.style("float","right")
    	.style("margin-right","5%")
    	.style("margin-top","2%")
    	.style("font-size","1em");

	d3.select("body")
		//.style("background-image","linear-gradient(to bottom right,#e066ff,#b3d1ff)");
		.style("background-color",bodyBackgroundColor);

	d3.select("#main")
		.style("z-index","1")
		.style("float","left")
		.style("width","100%")
		.style("height","100%");

	d3.select("#right")
		.style("width","29%")
		.style("height","98.5%")
		.style("margin-top","0.5%")
		.style("margin-left","0.5%")
		.style("float","left")
		.style("background-color","transparent");

	d3.select("#left")
		.style("width","69%")
		.style("height","98.5%")
		.style("margin-top","0.5%")
		.style("margin-left","0.5%")
		.style("float","left")
		.style("background-color","transparent");

	d3.select("#right-top")
		.style("width","97%")
		.style("height","58%")
		.style("margin-bottom","2%")
		.style("border-style","solid")
		.style("border-radius","30px")
		.style("border-color",headingColor)
		.style("box-shadow","3px 3px "+boxShadowColor);

	d3.select("#right-bottom")
		.style("width","97%")
		.style("height","38%")
		.style("margin-bottom","2%")
		.style("border-style","solid")
		.style("border-radius","30px")
		.style("border-color",headingColor)
		.style("box-shadow","3px 3px "+boxShadowColor);

	d3.select("#heading")
		.style("width","100%")
		.style("height","5%")
		.style("float","left")
		.style("background-color",headingColor)
		//.style("background-image","linear-gradient(to right,#0052cc,#ff00ff)");
		.style("color",textInHeadingColor);
		//.style("background-image","linear-gradient(to right,#0052cc,transparent)");

	d3.select("#references")
		.style("width","99%")
		.style("height","98%")
		.style("background-color","#cce6ff")
		.style("z-index","2")
		.style("float","left")
		.style("position","absolute")
		.style("text-align","center");

    d3.select("#references").style("display","none");
	d3.select("#refButton")
		.on("click",function(){
			d3.select("#references").style("display","none");
		});
	d3.select("#refAnc")
		.on("click",function(){
			d3.select("#references").style("display","block");
		});