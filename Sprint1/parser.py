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
        for one_line in html_lines:
            one_line = remove_html_tags(one_line)
            if one_line is not None and len(one_line) >  1:
                courses.write(remove_html_tags(one_line))



