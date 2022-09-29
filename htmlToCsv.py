import re
import csv

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

def get_string(meeting, wanted, indexes):
    if wanted == -1:
        return ""

    endOfWanted = len(meeting) - 1
    for index in indexes:
        if index > wanted and index < endOfWanted and index != -1:
            endOfWanted = index
    return meeting[wanted:endOfWanted]


if __name__ == '__main__':
    with open("Section Selection Results WebAdvisor University of Guelph.html", "r") as html_file:
        html_file.seek(0)

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
            if "*DE" not in lineList[i+2]:
                meeting = lineList[i+4]
                lecStart = meeting.find("LEC")
                labStart = meeting.find("LAB")
                semStart = meeting.find("SEM")
                examStart = meeting.find("EXAM")
                indexes = [lecStart, labStart, semStart, examStart]
                #print(str(lecStart) + " " + str(labStart) + " " + str(semStart) + " " + str(examStart))

                lecText = get_string(meeting, lecStart, indexes)
                labText = get_string(meeting, labStart, indexes)
                semText = get_string(meeting, semStart, indexes)
                examText = get_string(meeting, examStart, indexes)

                course_list.append({
                    'Name': lineList[i+2],
                    'LEC': lecText,
                    'LAB': labText,
                    'SEM': semText,
                    'EXAM': examText
                })

    
    fieldnames = ['Name', 'LEC', 'LAB', 'SEM', 'EXAM']

    with open('courses.csv', 'w') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(course_list)

