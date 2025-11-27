# from datetime import datetime
import math
import os
import time
from datetime import datetime
import logging


PATH='/Users/rithchea/Desktop/Life/Personal Project/FileDownloader/back-end/files'

def convert_size(size_bytes):
   if size_bytes == 0:
       return "0B"
   size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   i = int(math.floor(math.log(size_bytes, 1024)))
   p = math.pow(1024, i)
   s = round(size_bytes / p, 2)
   return "%s %s" % (s, size_name[i])

def to_iso_date(date):
    return date.isoformat()

def extract_date(date):
    new_date = date.split()
    list = []
    list.append(get_month(new_date[1]))
    list.append(new_date[2])
    list.append('20'+get_year(new_date[4]))
    list.append(new_date[3])
    return list

def get_year(year):
    new_year = year.split('20')[1]
    return new_year
    
def get_month(month):
    match month:
        case 'Jan':
            return 1
        case 'Feb':
            return 2
        case 'Mar':
            return 3
        case 'Apr':
            return 4
        case 'May':
            return 5
        case 'Jun':
            return 6
        case 'Jul':
            return 7
        case 'Aug':
            return 8
        case 'Sep':
            return 9 
        case 'Oct':
            return 10
        case 'Nov':
            return 11
        case 'Dec': 
            return 12
        
def final_date(date):
    new_date = date.split('T00:00:00')
    return new_date[0]
    
def run_get_files(PATH):
    filename_list = []
    file_id = 0
    for root, dirnames, filenames in os.walk(PATH):
        for file_name in filenames:
            file_id += 1
            modification_time = os.path.getmtime(f"./files/{file_name}")
            readable_time = time.ctime(modification_time)
            iso_time = extract_date(readable_time)
            iso_date = to_iso_date(datetime(int(iso_time[2]), int(iso_time[0]), int(iso_time[1])))
            final_date_real = final_date(iso_date)+'T'+iso_time[3]
            file_size = convert_size(os.path.getsize(f"./files/{file_name}"))
            filename_list.append({
                "id": file_id,
                "name": file_name,
                "type": file_name.split('.')[1],
                "size": file_size,
                "last_modified": final_date_real                
            })
    return filename_list

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