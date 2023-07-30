import requests
from bs4 import BeautifulSoup

url = "https://www.formula1.com/en/drivers.html"
soup = BeautifulSoup(requests.get(url).text,'html.parser')
datas = []
count = 1
for point,firstname,lastname,team in zip(soup.find_all(class_='f1-wide--s'),
                                    soup.find_all(class_="d-block f1--xxs f1-color--carbonBlack"),
                                    soup.find_all(class_="d-block f1-bold--s f1-color--carbonBlack"),
                                    soup.find_all(class_="listing-item--team f1--xxs f1-color--gray5")):
    datas.append([count,
                  point.getText(),
                  firstname.getText(),
                  lastname.getText(),
                  team.getText()])
    count+=1
with open('f1.html','w',encoding='utf-8') as f:
    f.write("""
<!DOCTYPE html>
<html>
<head>
  <title>車手排行</title>
  <link href="首頁資料/css/f1.css" rel="stylesheet" type="text/css">
  <script src="首頁資料/js/f1.js"></script>
<head>
<body>
<h1>STANDINGS</h1>
    <hr>
  <table>
    <tr>
      <th>車手排名</th>
      <th>車手名字</th>
      <th>車隊</th>
      <th>積分</th>
    </tr>
""")
    for info in datas:
        f.write(f"<tr><td>{info[0]}</td><td>{info[2]} {info[3]}</td><td>{info[4]}</td><td>{info[1]}</td></tr>")
    
print(datas)