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

teamNames = ['SRH','DC','RR','KKR','MI','CSK','RCB','KXIP']

@app.route("/getPieData",methods = ['POST', 'GET'])
def getPieData():
	votes_data={}
	for col in votes.columns:
		votes_data[col]=[x for x in votes[col]]
	return votes_data

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
		TossData={}
		TossPerTeam={}
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
		for i, row in matches.iterrows():
			if "TWMW" not in TossPerTeam:
				TossPerTeam['TWMW']= 0
			if "TWML" not in TossPerTeam:
				TossPerTeam['TWML'] = 0 
			if "TLML" not in TossPerTeam:
				TossPerTeam['TLML'] = 0 
			if "TLMW" not in TossPerTeam:
				TossPerTeam['TLMW'] = 0  
			#if row['Team_Name_Id']==row['Toss_Winner_Id']:
				#if row['Toss_Winner_Id']==row['Match_Winner_Id']:
					#TossPerTeam['TWMW']['Team_Name_Id'] += 1 
					#twmw=twmw+1
				#else:
					#print("Hi2")
					#TossPerTeam['Team_Name_Id']['TWML'] += 1 
			#else:
				#if row['Toss_Winner_Id']==row['Match_Winner_Id']:
					#TossPerTeam['TLML']['Team_Name_Id'] += 1 
				#if row['Team_Name_Id']==row['Match_Winner_Id']:
					#TossPerTeam['TLMW']['Team_Name_Id'] += 1
			sc=teams.loc[teams['Team_Id']==row['Team_Name_Id'],'Team_Short_Code'].iloc[0] 
			TossData[sc]=TossPerTeam

		teamData['fours'] = fours
		teamData['sixes'] = sixes
		teamData['wickets'] = wickets
		teamData['extras'] = extras
		teamData['auction'] = auctionData
		teamData['teamWinYear'] = teamWinYear
		#teamData['TossData'] = TossData
	return teamData

if __name__ == "__main__":
    app.run()