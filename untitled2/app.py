from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world1():
    return render_template('slhm.html')

@app.route('/')
def hello_world2():
    return render_template('slhm1.html')


if __name__ == '__main__':
    app.run('192.168.0.155', debug=False)
