from flask import Flask, request
from flask import render_template
import pandas as pd

app = Flask(__name__)
votes=pd.read_csv("./data/Votes.csv")

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


if __name__ == "__main__":
    app.run()