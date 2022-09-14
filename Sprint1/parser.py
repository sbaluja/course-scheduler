import re

# removes html tags from a line of text
def remove_html_tags(text):
    if "<input type=\"hidden" not in text or "<p id=" in text or "id=\"SEC_SHORT_TITLE_1" in text:
        text = re.sub('<.*?>', '', text)
        text = text.replace("\">", '')
        return text
    else:
        return None

if __name__ == '__main__':
    courses = open("courses.txt", "w+")
    with open("Section Selection Results WebAdvisor University of Guelph.html", "r") as html_file:

        # start reading from line 108
        for i in range(107):
            next(html_file)
        html_lines = html_file.readlines()

        # write the relevant parsed line into the text file
        lineList = []
        for one_line in html_lines:
            one_line = remove_html_tags(one_line)
            if one_line is not None and len(one_line) >  1:
                #courses.write(remove_html_tags(one_line))
                lineList.append(one_line)

        print(lineList)

        #for i in range(0,len(lineList),12):
        print(lineList[0])
        print(lineList[1])
        print(lineList[2])
        print(lineList[3])
        print(lineList[4])
        print(lineList[5])
        print(lineList[6])
        print(lineList[7])
        print(lineList[8])
        print(lineList[9])
        print(lineList[10])
        print(lineList[11])


