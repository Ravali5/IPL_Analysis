from flask import Flask, request
from flask import render_template

app = Flask(__name__)


@app.route("/")
def init():
    return render_template('index.html')

@app.route("/test")
def test():
	return "test message"


if __name__ == "__main__":
    app.run()