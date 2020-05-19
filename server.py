from flask import Flask, request
from flask import render_template
import pandas as pd
import json
from sklearn.cluster import KMeans
import math
from sklearn.preprocessing import StandardScaler
from sklearn import preprocessing
from sklearn.decomposition import PCA
import numpy as np

app = Flask(__name__)

votes = pd.read_csv("./data/Votes.csv")
teams = pd.read_csv("./data/Team.csv")
matches = pd.read_csv("./data/Match.csv")
seasons = pd.read_csv("./data/Season.csv")
ballbyball = pd.read_csv("./data/Ball_by_Ball.csv")
auction = pd.read_csv("./data/Auction.csv")
venues = pd.read_csv("./data/Venue.csv")
bestbatavg = pd.read_csv("./data/best-batting-average.csv")
bestbatstr = pd.read_csv("./data/best-batting-strike-rate.csv")
bestbowlavg = pd.read_csv("./data/best-bowling-average.csv")
bestbowleco = pd.read_csv("./data/best-bowling-economy.csv")
mostdotball = pd.read_csv("./data/most-dot-balls.csv")
bat = pd.concat([bestbatavg,bestbatstr])
bat = bat.drop_duplicates(subset='Players')
bowl = pd.concat([bestbowlavg,bestbowleco])
bowl = bowl.drop_duplicates(subset='Players')
batbowl = pd.merge(bat,bowl,how="inner",on=["Players"])
bat = bat.loc[~bat['Players'].isin(batbowl['Players'].array)]
bowl= bowl.loc[~bowl['Players'].isin(batbowl['Players'].array)]
tempbat = bat
bat = pd.merge(bat,bowl,how="left",on="Players")
bowl= pd.merge(bowl,tempbat,how="left",on="Players")
bat['skill'] = 'bat'
bowl['skill']= 'bowl'
batbowl['skill'] = 'batbowl'
mostruns = pd.read_csv("./data/most-runs.csv")
mostwick = pd.read_csv("./data/most-wickets.csv")
highscore= pd.read_csv("./data/highest-scores.csv")
players_Team= pd.read_csv("./data/playersTeam.csv")
#print(mostruns.iloc[0]['Runs'])

players = pd.concat([bat,bowl,batbowl])
clusterData = pd.DataFrame(players)
clusterData.drop('skill', axis=1, inplace=True)
clusterData.drop('Players', axis=1, inplace=True)
clusterData['Bat_Balls_Faced'] = clusterData['Bat_Balls_Faced'].str.replace(',','')
clusterData['Bowl_Runs'] = clusterData['Bowl_Runs'].str.replace(',','')
clusterData['Bat_Highest_Score'] = clusterData['Bat_Highest_Score'].str.replace(',','')
clusterData['Bat_Highest_Score'] = clusterData['Bat_Highest_Score'].str.replace('*','')
clusterData['Bat_Balls_Faced'] = pd.to_numeric(clusterData['Bat_Balls_Faced'])
clusterData['Bowl_Runs'] = pd.to_numeric(clusterData['Bowl_Runs'])
clusterData['Bat_Highest_Score'] = pd.to_numeric(clusterData['Bat_Highest_Score'])
clusterData.fillna(0,inplace=True)
'''
players['Bat_Balls_Faced'] = players['Bat_Balls_Faced'].str.replace(',','')
players['Bowl_Runs'] = players['Bowl_Runs'].str.replace(',','')
players['Bat_Highest_Score'] = players['Bat_Highest_Score'].str.replace(',','')
players['Bat_Highest_Score'] = players['Bat_Highest_Score'].str.replace('*','')
players['Bat_Balls_Faced'] = pd.to_numeric(players['Bat_Balls_Faced'])
players['Bowl_Runs'] = pd.to_numeric(players['Bowl_Runs'])
players['Bat_Highest_Score'] = pd.to_numeric(players['Bat_Highest_Score'])'''

scaled_data = StandardScaler().fit_transform(clusterData)
pca = PCA(n_components=10)
pca.fit(scaled_data)
pca_data = pca.transform(scaled_data)
percentVar = np.round(pca.explained_variance_ratio_*100,decimals=2)
xlabels = ['PC'+str(x) for x in range(1,len(percentVar)+1)]
cum = [percentVar[0]]
for i in range(1,len(percentVar)):
	cum.append(percentVar[i]+cum[i-1])
pcadata = {}
pcadata['xaxis_domain'] =[x for x in xlabels]
pcadata['percentVar'] = [ x for x in percentVar]
pcadata['cum'] = cum

kmeans = KMeans(n_clusters=3)
kmeans.fit(clusterData)
players['clusterNumber'] = kmeans.labels_
#print(players[['Players','clusterNumber']])
#print(players.columns)
file = open("./data/fullnames.txt","r")
fullnames = file.read()
file.close()
playercsv = pd.read_csv("./data/Player.csv")
fullnames = fullnames.split("\n")
playerDetails = {}
for name in fullnames:
	tok = name.split("-")
	#print(tok)
	pdet = playercsv.loc[playercsv['Player_Name']==tok[1]]
	pdict = {}
	if len(pdet.index) > 0 :
		pdict['nationality'] = str(pdet.iloc[0]['Country'])
		pdict['dominantHand']= str(pdet.iloc[0]['Batting_Hand'])
		pdict['bowlingSkill']= str(pdet.iloc[0]['Bowling_Skill'])
		pdict['dob']		 = str(pdet.iloc[0]['DOB'])
	playerDetails[tok[0]] = pdict

playersjson = players.to_dict(orient='records')
playersjson = json.dumps(playersjson)

teamNames = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP']

@app.route("/getPlayerData",methods = ['POST','GET'])
def getPlayerData():
	selectedPlayer = request.form.get('player')
	playerData = {}
	if selectedPlayer == 'all':
		playerData['players'] = [x for x in players['Players']];
		playerData['alltime_mostruns'] = {'val':mostruns.iloc[0]['Runs'],'name':mostruns.iloc[0]['Players']};
		playerData['alltime_mostwickets'] = {'val':mostwick.iloc[0]['Wickets'],'name':mostwick.iloc[0]['Players']};
		playerData['alltime_beststrikerate'] = {'val':bestbatstr.iloc[0]['Bat_Strike_Rate'],'name':bestbatstr.iloc[0]['Players']};
		playerData['alltime_highscore'] = {'val':highscore.iloc[0]['Highest Score'],'name':highscore.iloc[0]['Players']};
		playerData['alltime_bowleconomy'] = {'val':bestbowleco.iloc[0]['Bowl_Economy'],'name':bestbowleco.iloc[0]['Players']};
		playerData['alltime_mostdotball'] = {'val':mostdotball.iloc[0]['Dot Balls'],'name':mostdotball.iloc[0]['Players']};
		playerData['json'] = playersjson[1:len(playersjson)-1]
		playerData['json'] = playerData['json']+','
		playerData['pca'] = pcadata
		playerData['playerDetails'] = playerDetails
	return playerData

@app.route("/getPieData",methods = ['POST', 'GET'])
def getPieData():
	votes_data={}
	for col in votes.columns:
		votes_data[col]=[x for x in votes[col]]
	return votes_data

@app.route("/getVenueData",methods = ['POST', 'GET'])
def getVenueData():
	selectedVenue = request.form.get('venue')
	#print(selectedVenue)
	venueData={}
	homeWins={}
	tossDec ={}
	WL = {}
	for team in teamNames:
		team_id = teams.loc[teams['Team_Short_Code']==team,'Team_Id'].iloc[0]
		venueList = venues.query("HomeGround_Team_Id == '" + str(team_id)+"'")
		tmp = venueList['Venue_Name']
		#print(venueList)
		homeGrdWin = matches.query('Team_Name_Id == ' +str(team_id)+' and Match_Winner_Id == '+str(team_id)+" and Host_Country == 'India' "+"and Venue_Name in @tmp" )
		nonHomeGrdWin = matches.query('Opponent_Team_Id == ' +str(team_id)+' and Match_Winner_Id == '+str(team_id)+" and Host_Country == 'India'")
		teamHGWins={}
		teamHGWins['homeGrdWin'] = len(homeGrdWin.index)
		teamHGWins['nonHomeGrdWin'] = len(nonHomeGrdWin.index)
		homeWins[team] = teamHGWins
		if selectedVenue is not None:
			teamVenueWL = {}
			teamVenueWins = matches.query("Match_Winner_Id == "+str(team_id)+" and Venue_Name == '"+selectedVenue+"'")
			Losses = matches.query('Team_Name_Id == '+str(team_id)+' or Opponent_Team_Id == '+str(team_id))
			teamVenueLosses = Losses.query("Match_Winner_Id != "+str(team_id)+" and Venue_Name == '"+selectedVenue+"'")
			teamVenueWL['teamVenueWins'] = len(teamVenueWins.index)
			teamVenueWL['teamVenueLosses'] = len(teamVenueLosses.index)
			WL[team]=teamVenueWL

	if selectedVenue is not None:
		venueRecords = matches.query("Venue_Name == '"+str(selectedVenue)+"'")
		matchRecords = venueRecords['Match_Id'].unique().tolist()
		#print(matchRecords)
		ballRecords	 = ballbyball.query("Match_Id in @matchRecords and Batsman_Scored  != 'Do_nothing' and Batsman_Scored != ''")
		scoreRecords = ballRecords['Batsman_Scored'].tolist()
		#print(scoreRecords)
		result = 0
		for s in scoreRecords:
			if(not s.isdigit()):
				pass
			else:
				result = result+int(s)
		#desired_array = [int(numeric_string) for numeric_string in scoreRecords]
		#desired_array = list(map(int, scoreRecords))
		#print(test_list)
		scoreSum = result#sum(desired_array)
		#print(scoreSum)
		matchesCount = len(matchRecords)
		battingFriendly = scoreSum / (2*matchesCount)
		#print(battingFriendly)
		battingF = {}
		battingF['battingFriendly'] = battingFriendly
		venueData['battingFriendly'] = battingF

	indianStadiums = matches.query("Host_Country == 'India'")
	stadiumList = indianStadiums['Venue_Name'].unique().tolist()

	for stadium in stadiumList:
		tossDecision = {}
		field = matches.query("Venue_Name == '"+str(stadium)+"' and Toss_Decision == 'field'")
		bat = matches.query("Venue_Name == '"+str(stadium)+"' and Toss_Decision == 'bat'")
		tossDecision['field'] = len(field.index)
		tossDecision['bat'] = len(bat.index)
		tossDec[stadium] = tossDecision

	venuesList = venues['Venue_Name'].tolist()
	venueNames={}
	NVenueMatches = {}
	for venue in venuesList:
		tmpVenues = venues.query("Venue_Name == '" +str(venue)+"'")
		nMatches = matches.query("Venue_Name == '" +str(venue)+"' and Host_Country == 'India'")
		NVenueMatches[venue] = len(nMatches.index)
		venueNames[venue] = tmpVenues['State'].iloc[0]

	if selectedVenue:
		venueDetails = venues.loc[venues['Venue_Name']==selectedVenue]
		venueData['capacity'] = venueDetails.iloc[0]['capacity']
		venueData['pavilions']= venueDetails.iloc[0]['pavilions']
		venueData['city']= venueDetails.iloc[0]['City_Name']
		team = venueDetails.iloc[0]['HomeGround_Team_Id']
		if(str(team) == "Not Home Ground"):
			venueData['TeamName'] = "Not Home Ground"
		else:
			team_name = teams.loc[teams['Team_Id']==int(team),'Team_Short_Code'].iloc[0]
			venueData['TeamName'] = team_name

	venueData['homeWins'] = homeWins
	venueData['tossDec'] = tossDec
	venueData['venueNames'] = venueNames
	venueData['WL'] = WL
	venueData['NMatches'] = NVenueMatches
	return venueData

@app.route("/")
def init():
    return render_template('index.html')

@app.route("/test",methods = ['POST', 'GET'])
def test():
	return "test message"

@app.route("/getTeamData",methods = ['POST', 'GET'])
def getTeamData():
	selectedTeam = request.form.get('team')
	teamData = {}
	tossData={}
	twmw=0
	twml=0
	tlmw=0
	tlml=0
	if selectedTeam != 'ALL' :
		team_id = teams.loc[teams['Team_Short_Code']==selectedTeam,'Team_Id'].iloc[0]
		#print(selectedTeam+" - "+str(team_id))
		teamMatches = matches.query('Team_Name_Id == '+str(team_id)+' or Opponent_Team_Id == '+str(team_id))
		teamData['totalMatches'] = len(teamMatches.index)
		teamWins = teamMatches.query('Match_Winner_Id == '+str(team_id))
		teamLosses = teamMatches.query('Match_Winner_Id != '+str(team_id))
		teamData['wins'] = len(teamWins.index)
		teamData['losses'] = len(teamLosses.index)
		teamData['opponentData'] = {}
		teambatting = ballbyball.query("Team_Batting_Id == "+str(team_id))
		teambowling = ballbyball.query("Team_Bowling_Id == "+str(team_id))
		fours = {}
		sixes = {}
		wickets = {}
		extras = {}
		for team in teamNames:
			opponent_id = teams.loc[teams['Team_Short_Code']==team,'Team_Id'].iloc[0]
			opponent_matches = teamMatches.query('Team_Name_Id == '+str(opponent_id)+' or Opponent_Team_Id == '+str(opponent_id))
			opponent_team_batting = teambowling.query("Team_Batting_Id == "+str(opponent_id))
			opponent_team_bowling = teambatting.query("Team_Bowling_Id == "+str(opponent_id))
			teamfours = opponent_team_bowling.query("Batsman_Scored == '4'")
			teamsixes = opponent_team_bowling.query("Batsman_Scored == '6'")
			teamwickets = opponent_team_batting.query("Dissimal_Type != ' ' ")
			teamextras = opponent_team_batting.query("Extra_Runs != ' ' ")
			teamextras['Extra_Runs'] = teamextras['Extra_Runs'].apply(pd.to_numeric)
			fours[team] = len(teamfours.index)
			sixes[team] = len(teamsixes.index)
			wickets[team] = len(teamwickets.index)
			extras[team] = sum(teamextras['Extra_Runs'])
			opponent_data = {}
			opponent_data['totalMatches'] = len(opponent_matches.index)
			wins_again_opponent = opponent_matches.query('Match_Winner_Id == '+str(team_id))
			losses_again_opponent = opponent_matches.query('Match_Winner_Id != '+str(team_id))
			opponent_data['wins'] = len(wins_again_opponent.index)
			opponent_data['losses'] = len(losses_again_opponent.index)
			teamData['opponentData'][team] = opponent_data
		#print(teamData)
		tossWin = matches.query("Toss_Winner_Id == "+str(team_id))
		tossLose = matches.query('(Team_Name_Id == '+str(team_id)+' or Opponent_Team_Id == '+str(team_id) + ') and Toss_Winner_Id != '+str(team_id))
		tossWinMatchWin = tossWin.query("Match_Winner_Id == "+str(team_id))
		tossLoseMatchWin=tossLose.query("Match_Winner_Id == " + str(team_id))
		teamTossWin ={}
		teamTossWin['MatchWin'] = len(tossWinMatchWin.index)
		teamTossWin['MatchLose'] = len(tossWin.index) - len(tossWinMatchWin.index)
		teamTossLose = {}
		teamTossLose['MatchWin'] = len(tossLoseMatchWin.index)
		teamTossLose['MatchLose'] = len(tossLose.index) - len(tossLoseMatchWin.index)
		teamToss ={}
		teamToss['TossWin'] = teamTossWin
		teamToss['TossLose'] = teamTossLose
		tossData[selectedTeam]=teamToss	

		teamData['tossData'] = tossData
		teamData['fours'] = fours
		teamData['sixes'] = sixes
		teamData['wickets'] = wickets
		teamData['extras'] = extras
	else:
		teamData['cupWins'] = {}
		teamWinYear={}
		for team in seasons['Winner']:
			if team in teamData['cupWins']:
				teamData['cupWins'][team] += 1
			else:
				teamData['cupWins'][team] = 1
		fours = {}
		sixes = {}
		wickets = {}
		extras = {}
		auctionData = {}
		tossData={}
		for team in teamNames:
			team_id = teams.loc[teams['Team_Short_Code']==team,'Team_Id'].iloc[0]
			teambatting = ballbyball.query("Team_Batting_Id == "+str(team_id))
			teamfours = teambatting.query("Batsman_Scored == '4'")
			teamsixes = teambatting.query("Batsman_Scored == '6'")
			teambowling = ballbyball.query("Team_Bowling_Id == "+str(team_id))
			teamwickets = teambowling.query("Dissimal_Type != ' ' ")
			teamextras = teambowling.query("Extra_Runs != ' ' ")
			teamextras['Extra_Runs'] = teamextras['Extra_Runs'].apply(pd.to_numeric)
			fours[team] = len(teamfours.index)
			sixes[team] = len(teamsixes.index)
			wickets[team] = len(teamwickets.index)
			extras[team] = sum(teamextras['Extra_Runs'])
			teamauction = auction.query("TEAM == '"+team+"'")
			auctiondetails = {}
			for i, row in teamauction.iterrows():
				auctiondetails[row['Year']] = row['TOTAL_FUNDS'] - row['FUNDS_REMAINING']
			auctionData[team] = auctiondetails


		for team in teamNames:
			season_team = seasons.loc[seasons['Winner']==team,'Season_Year']
			teamWinYear[team]=season_team.values.tolist()
			team_id = teams.loc[teams['Team_Short_Code']==team,'Team_Id'].iloc[0]
			tossWin = matches.query("Toss_Winner_Id == "+str(team_id))
			tossLose = matches.query('(Team_Name_Id == '+str(team_id)+' or Opponent_Team_Id == '+str(team_id) + ') and Toss_Winner_Id != '+str(team_id))
			tossWinMatchWin = tossWin.query("Match_Winner_Id == "+str(team_id))
			tossLoseMatchWin=tossLose.query("Match_Winner_Id == " + str(team_id))
			teamTossData ={}
			teamTossData['tossWinMatchWin'] = len(tossWinMatchWin.index)
			teamTossData['tossLoseMatchWin'] = len(tossLoseMatchWin.index)
			teamTossData['tossWinMatchLose'] = len(tossWin.index) - len(tossWinMatchWin.index)
			teamTossData['tossLoseMatchLose'] = len(tossLose.index) - len(tossLoseMatchWin.index)
			tossData[team]=teamTossData
		
		Bat_Bowl = {}
		players_r = players.fillna(0)
		playerTeam = {}
		#print(players_r.isnull().values.any())
		#print(players_r)
		for player in players_r['Players'].tolist():
			scatter_plot = {}
			player_rec = players_r.loc[players_r['Players'] == player]
			scatter_plot['Bat_avg'] = float(player_rec['Bat_Average'].iloc[0])
			scatter_plot['Bowl_avg'] = player_rec['Bowl_Average'].iloc[0]
			Bat_Bowl[player] = scatter_plot
			team_name_player = players_Team.loc[players_Team['playerName']==str(player),'team'].iloc[0]
			playerTeam[player] = team_name_player


		teamData['fours'] = fours
		teamData['sixes'] = sixes
		teamData['wickets'] = wickets
		teamData['extras'] = extras
		teamData['auction'] = auctionData
		teamData['teamWinYear'] = teamWinYear
		teamData['tossData'] = tossData
		teamData['Bat_Bowl'] =Bat_Bowl
		teamData['playerTeam'] =playerTeam

	return teamData

if __name__ == "__main__":
    app.run()