from flask import Flask, request
from flask import render_template
import pandas as pd

app = Flask(__name__)
votes = pd.read_csv("./data/Votes.csv")
teams = pd.read_csv("./data/Team.csv")
matches = pd.read_csv("./data/Match.csv")
seasons = pd.read_csv("./data/Season.csv")

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
		#print(teamData)
	else:
		teamData['wins'] = {}
		for team in seasons['Winner']:
			if team in teamData['wins']:
				teamData['wins'][team] += 1
			else:
				teamData['wins'][team] = 1
	return teamData

if __name__ == "__main__":
    app.run()