from flask import Flask, render_template, redirect, url_for
from number_plate_test1 import my_function


app = Flask(__name__)


# Define routes for signup, login, and index pages
@app.route('/')
def home():
    return redirect(url_for('signup'))


@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/plate_list')
def plate_list():
    # Render the view_plates.html template
    return render_template('plate_list.html')


@app.route('/park_lot')
def park_lot():
    # Render the parking-slot.html template
    return render_template('parking-slot.html')


@app.route('/ocr')
def ocr():
    # Render the parking-slot.html template
    return render_template('ocr-page.html')


@app.route('/run_script')
def run_script():
    result = my_function()
    return result



if __name__ == '__main__':
    app.run(debug=True)
