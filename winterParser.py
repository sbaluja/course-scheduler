import re
import json

# removes html tags from a line of text
def remove_html_tags(text):
    if "<input type=\"hidden" not in text and text[0] == '<' and "<td class=\"windowIdx\"" not in text:
        if "<div class=\"meet\">" in text or "<p id=\"LIST_VAR5_1369\">" in text:
            return "No data found"
        else:
            text = re.sub('<.*?>', '', text)
            text = text.replace("\">", '')
            text = text.replace("\n", "")
            return text
    else:
        return None

if __name__ == '__main__':
    with open("Winter Section Selection Results WebAdvisor University of Guelph.html", "r") as html_file:

        # start reading from line 108
        for i in range(107):
            next(html_file)
        html_lines = html_file.readlines()

        # append the relevant parsed line into the list
        incoming_error = False
        lineList = []
        for one_line in html_lines:
            one_line = remove_html_tags(one_line)
            if one_line is not None and len(one_line) >  1:
                lineList.append(one_line)

        course_list = []
        for i in range(0,len(lineList)-9,9):

            course_list.append({
                'Term': lineList[i],
                'Status': lineList[i+1],
                'name': lineList[i+2],
                'location': lineList[i+3],
                'meeting': lineList[i+4],
                'faculty': lineList[i+5],
                'capacity': lineList[i+6],
                'credits': lineList[i+7],
                'level': lineList[i+8]
            })

    with open('winterCourses.json', 'w') as json_file:
        json.dump(course_list, json_file, indent=2)
