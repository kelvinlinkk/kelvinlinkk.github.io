import requests
from bs4 import BeautifulSoup
import json
for type in ['f1','motogp']:
    url = "https://www.autosport.com/" + type + "/standings/"
    soup = BeautifulSoup(requests.get(url).text,'html.parser')
    file = open("首頁資料/" + type + ".json",'w')
    datas = {}
    for point,ridername in zip(soup.find_all(class_='ms-table_cell ms-table_field--total_points'),
                                        soup.find_all(class_="name")
                                    ):
        datas[ridername.getText().strip().split('\n')[0]] = point.getText()
    json.dump(datas,file)
    print(datas)