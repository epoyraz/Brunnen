import xlsxwriter
import json
from pprint import pprint

with open('brunnen.json') as f:
    data = json.load(f)

features = data['features']
list_of_properties = []
for feature in features:
    properties = feature['properties']
    list_of_properties.append(properties)
# Create a workbook and add a worksheet.
workbook = xlsxwriter.Workbook('brunnen.xlsx')
worksheet = workbook.add_worksheet()

# Start from the first cell. Rows and columns are zero indexed.
row = 1
col = 0

worksheet.write(0, col,'objectid')
worksheet.write(0, col + 1,'nummer')
worksheet.write(0, col + 2,'brunnenart_txt')
worksheet.write(0, col + 3,'historisches_baujahr')
worksheet.write(0, col + 4,'wasserart_txt')
worksheet.write(0, col + 5,'bezeichnung')

# Iterate over the data and write it out row by row.
for properties in list_of_properties:
    worksheet.write(row, col,     properties['objectid'])
    worksheet.write(row, col + 1, properties['nummer'])
    worksheet.write(row, col + 2, properties['brunnenart_txt'])
    worksheet.write(row, col + 3, properties['historisches_baujahr'])
    worksheet.write(row, col + 4, properties['wasserart_txt'])
    worksheet.write(row, col + 5, properties['bezeichnung'])

    row += 1

workbook.close()