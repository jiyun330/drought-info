from flask import Flask, render_template, request
from model.model import Model

app = Flask(__name__)


@app.route('/')
def start():
    return render_template('main.html')

@app.route('/aboutUs')
def aboutUs():
    return render_template('aboutUs.html')

@app.route('/model')
def model():
    return render_template('model.html')

@app.route('/result', methods=["GET", "POST"])
def result():
    stnId = request.form.get('stnId')
    date = request.form.get('date')
    d = Model(stnId, date)
    y_pred = d.select()
    return render_template('result.html', data = y_pred)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/news2')
def news2():
    return render_template('news2.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)