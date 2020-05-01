from flask import Flask, request
from flask import render_template
import pandas as pd

app = Flask(__name__)
votes = pd.read_csv("./data/Votes.csv")
teams = pd.read_csv("./data/Team.csv")
matches = pd.read_csv("./data/Match.csv")
seasons = pd.read_csv("./data/Season.csv")
ballbyball = pd.read_csv("./data/Ball_by_Ball.csv")

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
		for team in seasons['Winner']:
			if team in teamData['cupWins']:
				teamData['cupWins'][team] += 1
			else:
				teamData['cupWins'][team] = 1
		fours = {}
		sixes = {}
		wickets = {}
		extras = {}
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
		teamData['fours'] = fours
		teamData['sixes'] = sixes
		teamData['wickets'] = wickets
		teamData['extras'] = extras
	return teamData

if __name__ == "__main__":
    app.run()