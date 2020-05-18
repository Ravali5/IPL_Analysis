var analysisby = "team-btn";
var headingColor = '#0052cc';
var textInHeadingColor = '#e67300';
var bodyBackgroundColor = "#b3d1ff";
var boxShadowColor = '#3385ff';
var btnMouseoverBGColor = "#4d94ff";

const bgColorsTeam ={
	"MI"  :{
		'headingColor':'#094089',
		'textInHeadingColor':'#FFFFFF',
		'bodyBackgroundColor':'#e6efff',
		'boxShadowColor':'#3377ff',
		'btnMouseoverBGColor':'#ccddff'
	},
	"SRH" :{
		'headingColor':'#F57A2A',
		'textInHeadingColor':'#000000',
		'bodyBackgroundColor':'#fff5e6',
		'boxShadowColor':'#ff8533',
		'btnMouseoverBGColor':'#ffd9b3'
	},
	"RCB" :{
		'headingColor':'#AF1320',
		'textInHeadingColor':'#DBAA3C',
		'bodyBackgroundColor':'#ffe6e6',
		'boxShadowColor':'#ff8566',
		'btnMouseoverBGColor':'#ff8566'
	},
	"CSK" :{
		'headingColor':'#e6ac00',
		'textInHeadingColor':'#000000',
		'bodyBackgroundColor':'#ffffe6',
		'boxShadowColor':'#ffcc33',
		'btnMouseoverBGColor':'#ffffcc'
	},
	"DC"  :{
		'headingColor':'#16479E',
		'textInHeadingColor':'#FFFFF6',
		'bodyBackgroundColor':'#e6f2ff',
		'boxShadowColor':'#4d88ff',
		'btnMouseoverBGColor':'#ccddff'
	},
	"KKR" :{
		'headingColor':'#502D87',
		'textInHeadingColor':'#FFFFFF',
		'bodyBackgroundColor':'#ebe8ff',
		'boxShadowColor':'#cc99ff',
		'btnMouseoverBGColor':'#cc99ff'
	},
	"KXIP":{
		'headingColor':'#C60E1A',
		'textInHeadingColor':'#FFFFFF',
		'bodyBackgroundColor':'#f2f2f2',
		'boxShadowColor':'#ff6666',
		'btnMouseoverBGColor':'#ff6666'
	},
	"RR"  :{
		'headingColor':'#E91985',
		'textInHeadingColor':'#FFFFF6',
		'bodyBackgroundColor':'#fbe8ff',
		'boxShadowColor':'#ff4dd2',
		'btnMouseoverBGColor':'#ffccff'
	},
	"ALL" :{
		'headingColor':'#0052cc',
		'textInHeadingColor':'#FFFFF6',
		'bodyBackgroundColor':'#FFFFF6',
		'boxShadowColor':'#3385ff',
		'btnMouseoverBGColor':'#3385ff'
	}
};

/*function changeAnalysisByButtonColor(btn){
	//analysisby = btn;
	d3.selectAll(".menubar-btn")
		.style("background-color","transparent")
		.style("color",headingColor);
	//console.log(btn);
	d3.select("#"+btn).style("background-color",headingColor).style("color",textInHeadingColor);
};*/

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

//changeAnalysisByButtonColor(analysisby);

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

d3.select("#left")
	.style("width","29%")
	.style("height","98.5%")
	.style("margin-top","0.5%")
	.style("margin-left","0.5%")
	.style("float","left")
	.style("background-color","transparent");

d3.select("#right")
	.style("width","69%")
	.style("height","98.5%")
	.style("margin-top","0.5%")
	.style("margin-left","0.5%")
	.style("float","left")
	.style("background-color","transparent");

d3.select("#left-top")
	.style("width","97%")
	.style("height","58%")
	.style("margin-bottom","2%")
	.style("border-style","solid")
	.style("border-radius","30px")
	.style("border-color",headingColor)
	.style("box-shadow","3px 3px "+boxShadowColor);

d3.select("#left-bottom")
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