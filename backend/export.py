# export.py
import csv
from io import StringIO
from flask import Response

def export_to_csv(results):
    # Create CSV in memory
    si = StringIO()
    writer = csv.DictWriter(si, fieldnames=["tweet", "sentiment", "score", "emojis"])
    writer.writeheader()
    for row in results:
        writer.writerow(row)
    
    output = si.getvalue()
    si.close()

    return Response(
        output,
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=tweets.csv"}
    )
