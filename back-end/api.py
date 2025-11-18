from flask import Flask
import os
import time

PATH='/Users/rithchea/Desktop/Life/Personal Project/FileDownloader/back-end/files'

app = Flask('back-end')

@app.route("/")
def hello_world():
    return '<p>Hello, World!</p>'

@app.get('/api/files')
def get_files():
    filename_list = []
    for root, dirnames, filenames in os.walk(PATH):
        for file_name in filenames:
            modification_time = os.path.getmtime(f"./files/{file_name}")
            readable_time = time.ctime(modification_time)
            file_size = os.path.getsize(f"./files/{file_name}")
            filename_list.append({
                "name": file_name,
                "size": f"{file_size} bytes",
                "last modified": readable_time
            })
    return filename_list