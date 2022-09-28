import unittest
import parser

class TestParser (unittest.TestCase):

    def test_parser_none (self):
        dummy_text = "<input type=\"hidden"
        self.assertIsNone (parser.remove_html_tags (dummy_text))

    def test_parser_no_data (self):
        dummy_text = "<div class=\"meet\">"
        self.assertEqual (parser.remove_html_tags (dummy_text), "No data found")

    def test_parser_success (self):
        dummy_text = "<p>Paragraph<\p>"
        self.assertEqual (parser.remove_html_tags (dummy_text), "Paragraph")

    def test_parser_courses (self):
        file = open ("Section Selection Results WebAdvisor University of Guelph.html", "r")
        
        for i in range(107):
            next(file)
        html_lines = file.readlines()

        incoming_error = False
        lineList = []
        for one_line in html_lines:
            one_line = parser.remove_html_tags(one_line)
            if one_line is not None and len(one_line) >  1:
                lineList.append(one_line)

        course_list = []
        for i in range(0,len(lineList)-9,9):

            course_list.append({
                'Term': lineList[i],
                'Status': lineList[i+1],
                'Name': lineList[i+2],
                'Location': lineList[i+3],
                'Meeting': lineList[i+4],
                'Faculty': lineList[i+5],
                'Capacity': lineList[i+6],
                'Credits': lineList[i+7],
                'Level': lineList[i+8]
            })

        self.assertEqual (course_list [0]['Name'], "ACCT*1220*0101 (6573) Intro Financial Accounting")
        