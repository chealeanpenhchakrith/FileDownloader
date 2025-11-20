from flask import Flask
from urllib.request import urlretrieve
import os
import time
import logging
from flask_cors import CORS

PATH='/Users/rithchea/Desktop/Life/Personal Project/FileDownloader/back-end/files'

app = Flask('back-end')
CORS(app)

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
                "last_modified": readable_time
            })
    return filename_list

@app.get('/download/<filename>')
def download_file(filename):
    file_path = './files'
    def download(file_path, folder_name='', file_name=''):
        try:
            # Check if the path is a file
            if os.path.isfile(file_path):
                # Log that the file is being downloaded
                logging.info(f'Downloading {file_name}')
                # Open the file in binary mode
                with open(file_path, 'rb') as f:
                    # If the folder name is not provided, save the file in the current directory
                    if folder_name == '':
                        file = file_name
                    # Otherwise, create the folder (if it doesn't exist) and save the file in it
                    else:
                        file = os.path.join(folder_name, file_name)
                        os.makedirs(folder_name, exist_ok=True)
                    # Log that the file is being saved
                    logging.info(f'Saving {file}')
                    # Write the contents of the file to the destination
                    with open(file, 'wb') as mf:
                        mf.write(f.read())
            # If the path is a directory
            else:
                # Create the folder (if it doesn't exist)
                # os.makedirs(f"/Users/rithchea/Downloads/{file_name}", exist_ok=True)
                os.makedirs(file_name, exist_ok=True)
                # For each file in the directory
                for file in os.listdir(file_path):
                    # Recursively download the file
                    # download(os.path.join(file_path, file), folder_name=f"/Users/rithchea/Downloads/{file_name}", file_name=file)
                    download(os.path.join(file_path, file), folder_name=file_name, file_name=file) 
        except Exception as e:
            # If an error occurs, log it
            logging.error(f"An error occurred while downloading/copying {file_name}: {e}")
        return
    if (filename):
        download(f"{file_path}/{filename}", folder_name='Download', file_name=f"{filename}")
    return 'Ok 200'
