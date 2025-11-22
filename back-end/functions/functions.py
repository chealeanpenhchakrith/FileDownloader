# from datetime import datetime
import math

def convert_size(size_bytes):
   if size_bytes == 0:
       return "0B"
   size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
   i = int(math.floor(math.log(size_bytes, 1024)))
   p = math.pow(1024, i)
   s = round(size_bytes / p, 2)
   return "%s %s" % (s, size_name[i])

def to_iso_date(date):
    # print(list)
    # "Thu Nov 20 21:38:12 2025"
    return date.isoformat()

def extract_date(date):
    new_date = date.split()
    list = []
    list.append(get_month(new_date[1]))
    list.append(new_date[2])
    list.append('20'+get_year(new_date[4]))
    list.append(new_date[3])
    return list
# print(to_iso_date(datetime(2020,10,25)))

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
    