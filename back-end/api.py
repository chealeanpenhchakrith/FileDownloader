from flask import Flask
from flask_cors import CORS
from pathlib import Path
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
    downloads_path = str(Path.home() / "Downloads")   
    if (filename):
        functions.download(f"./files/{filename}", folder_name=f"{downloads_path}", file_name=f"{filename}")
    return 'Ok 200'
