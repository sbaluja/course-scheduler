from bs4 import BeautifulSoup
import json
import codecs

#"pip3 install requests beautifulsoup4" to install

file = codecs.open("Section Selection Results WebAdvisor University of Guelph.html", "r", "utf-8")

#select the table where the courses are
soup = BeautifulSoup(file.read(), 'html.parser')
table = soup.find('table', class_ = 'layout').find('table')

courseList = []

#go through the table and add each row to the courseList
for data in table.find_all('tbody'):
    rows = data.find_all('tr')
    for row in rows:
        rowList = row.find_all('td')
        if len(rowList) > 10:
            courseList.append({
                'Term': rowList[1].find('p').text,
                'Status': rowList[2].find('p').text,
                'name': rowList[3].find('a').text,
                'location': rowList[4].find('p').text,
                'meeting': rowList[5].find('input').attrs['value'],
                'faculty': rowList[6].find('p').text,
                'capacity': rowList[7].find('p').text,
                'credits': rowList[8].find('p').text,
                'level': rowList[10].find('p').text
            })

#import list to json
with open('courses.json', 'w') as json_file:
    json.dump(courseList, json_file, indent=2)
