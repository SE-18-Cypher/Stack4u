from flask import request, render_template, redirect, url_for, send_file
# import sys
# import os
# from tkinter import Tk, messagebox
# from tkinter import _tkinter
# from typing import Tuple
# from pdf2docx import parse
# from flask import Flask
# import docx2txt
# from fileinput import filename
# UPLOADER_FOLDER = ''
# app = Flask(__name__)
# app.config['UPLOADER_FOLDER'] = UPLOADER_FOLDER

# fileName2 = ''


# @app.route('/')
# @app.route('/index', methods=['GET', 'POST'])
# def index():
#     if request.method == "POST":
#         def convert_pdf2docx(input_file: str, output_file: str, pages: Tuple = None):
#            if pages:
#                pages = [int(i) for i in list(pages) if i.isnumeric()]

#            result = parse(pdf_file=input_file,
#                           docx_with_path=output_file, pages=pages)
#            summary = {
#                "File": input_file, "Pages": str(pages), "Output File": output_file
#            }

#            print("\n".join("{}:{}".format(i, j) for i, j in summary.items()))
#            return result
#         file = request.files['filename']
#         if file.filename != '':
#            file.save(os.path.join(
#                app.config['UPLOADER_FOLDER'], file.filename))
#            input_file = file.filename
#            output_file = r"hello.docx"
#            convert_pdf2docx(input_file, output_file)
#            doc = input_file.split(".")[0]+".docx"
#            global fileName2
#            fileName2 = input_file.split(".")[0]
#            my_text = docx2txt.process(fileName2+".docx")
#         #    print(my_text)
#            lis = doc.replace(" ", "=")
#            return render_template("docx.html", variable=lis)
#     return render_template("index.html")




from flask import Flask

api = Flask(__name__)


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@api.route('/input',methods=['GET', 'POST'])
def userInput():
    f = request.form['input']
    print(f)
    return f


if __name__ == "__main__":
    api.debug = True
    api.run()
