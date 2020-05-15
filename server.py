from flask import Flask, request
from flask import render_template
import pandas as pd

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

players = pd.concat([bat,bowl,batbowl])

teamNames = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP']

@app.route("/getPlayerData",methods = ['POST','GET'])
def getPlayerData():
	selectedPlayer = request.form.get('player')
	playerData = {}
	playerData['players'] = [x for x in players['Players']]
	return playerData

@app.route("/getPieData",methods = ['POST', 'GET'])
def getPieData():
	votes_data={}
	for col in votes.columns:
		votes_data[col]=[x for x in votes[col]]
	return votes_data

@app.route("/getVenueData",methods = ['POST', 'GET'])
def getVenueData():
	venueData={}
	homeWins={}
	tossDec ={}
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
	for venue in venuesList:
		tmpVenues = venues.query("Venue_Name == '" +str(venue)+"'")
		venueNames[venue] = tmpVenues['State'].iloc[0]


	venueData['homeWins'] = homeWins
	venueData['tossDec'] = tossDec
	venueData['venueNames'] = venueNames
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
		for team in teamNames:
			opponent_id = teams.loc[teams['Team_Short_Code']==team,'Team_Id'].iloc[0]
			opponent_matches = teamMatches.query('Team_Name_Id == '+str(opponent_id)+' or Opponent_Team_Id == '+str(opponent_id))
			opponent_data = {}
			opponent_data['totalMatches'] = len(opponent_matches.index)
			wins_again_opponent = opponent_matches.query('Match_Winner_Id == '+str(team_id))
			losses_again_opponent = opponent_matches.query('Match_Winner_Id != '+str(team_id))
			opponent_data['wins'] = len(wins_again_opponent.index)
			opponent_data['losses'] = len(losses_again_opponent.index)
			teamData['opponentData'][team] = opponent_data
		#print(teamData)
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

		teamData['fours'] = fours
		teamData['sixes'] = sixes
		teamData['wickets'] = wickets
		teamData['extras'] = extras
		teamData['auction'] = auctionData
		teamData['teamWinYear'] = teamWinYear
		teamData['tossData'] = tossData
	return teamData

if __name__ == "__main__":
    app.run()