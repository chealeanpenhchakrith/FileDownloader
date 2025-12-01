from flask import Flask
from urllib.request import urlretrieve
import os
import time
from datetime import datetime
import logging
from flask_cors import CORS
from flask_cors import cross_origin
import sys
sys.path.append('functions')
import functions

app = Flask(__name__)

CORS(app)

@app.route("/")
def hello_world():
    return '<p>Hello, World!</p>'

@app.get('/api/files')
def get_files():
    filename_list = functions.run_get_files('./files')
    return filename_list

@app.get('/download/<filename>')
def download_file(filename):
    file_path = './files'    
    if (filename):
        functions.download(f"{file_path}/{filename}", folder_name='download', file_name=f"{filename}")
    return 'Ok 200'
