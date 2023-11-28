import requests
from bs4 import BeautifulSoup

url = "https://www.autosport.com/motogp/standings/"
soup = BeautifulSoup(requests.get(url).text,'html.parser')
datas = []
count = 1
for point,ridername in zip(soup.find_all(class_='ms-table_cell ms-table_field--total_points'),
                                    soup.find_all(class_="name")
                                ):
    datas.append([count,
                  point.getText(),
                  ridername.getText().strip().split('\n')[0]])
    count+=1
with open('motogp.html','w',encoding='utf-8') as f:
    f.write("""
<!DOCTYPE html>
<html>
<head>
  <title>車手排行</title>
  <link href="首頁資料/css/motogp.css" rel="stylesheet" type="text/css">
<head>
<body>
<h1>STANDINGS</h1>
    <hr>
  <table>
    <tr>
      <th>車手排名</th>
      <th>車手名字</th>
      <th>積分</th>
    </tr>
""")
    for info in datas:
        f.write(f"<tr><td>{info[0]}</td><td>{info[2]}</td><td>{info[1]}</td></tr>")
    
print(datas)