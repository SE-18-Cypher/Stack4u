from flask import Flask, render_template, request
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
v = CountVectorizer()

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


api = Flask(__name__)

web_frontend_values = ['easy', 'rich user interface', 'fast', 'trusted', 'trending', 'strong community support', 'speed', 
                       'efficient', 'flexible', 'performance', 'one way data binding', 'dynamic web development', 
                       'complex website', 'mvc architecture', 'model view control architecture', 'compatible', 'filter', 
                       'testing', 'spa', 'two way data binding', 'consistant,' 'reusable', 'readable', 'maintenance', 
                       'dynamic app', 'small size', 'simple integration', 'improved documentation', 'progressive',
                       'well defined ecosystem', 'interactive web application', 'scalable web apps', 'open source', 
                       'cross platform', 'popular', 'lightweight','serverside', 'high level', 'versatile', 'multi paradigm']

mobile_frontend_values = ['reusable', 'cost effective', 'compatible', 'deployment', 'maintainable', 'third party', 
                          'cross platform', 'native', 'widget','material design','flexible', 'dart', 'api', 'easy', 
                          'community', 'fast', 'windows', 'cardova', 'independent', 'adaptable', 'uniform', 'responsive', 
                          'lightweight','theming', 'interactive', 'rich', 'simple', 'simple development', 'hybrid']

web_backend_values = ['object oriented', 'simple', 'security', 'neural architecture', 'portable', 'robust', 'multithreading', 
                      'flexible', 'distributed', 'high performance', 'rich api', 'independent', 'multi paradigm', 
                      'garbage collected', 'free', 'open source', 'portable', 'scalable', 'embeddable', 
                      'high level interpreting', 'large library', 'readable', 'compatible', 'dynamic', 'content management', 
                      'effective', 'less time','integrative', 'scalable', 'hosting', 'cms', 'resources', 'easy', 'popular', 
                      'expressive', 'powerful', 'complex', 'fun','smooth', 'statistics', 'ubiquitous', 'versatile', 
                      'high level',' multi paradigm', 'maintainable', 'nested', 'indexer', 'readable', '.net', 'dotnet', 
                      'cross platform','active', 'popular', 'design patterns', 'well documented', 'fast', 'class based', 
                      'simple', 'quick', 'extensible', 'dynamic', 'web scraping', 'crawling','staticaly typed', 'fast', 
                      'reliable', 'efficient', 'flexible', 'safe', 'speed']

database_values = ['secure', 'scalable', 'available', 'readable', 'security', 'relational']

df = pd.read_csv('dataset.csv')
X_train = v.fit_transform(df.features.values)
model = MultinomialNB()
model.fit(X_train,df.technology)

final_sentences = []
def extract_preproces_sentences(text):
    global final_sentences
    final_sentences = []
    sentences = sent_tokenize(text)
    stopWords = set(stopwords.words('english'))
    for sentence in sentences:
        words = word_tokenize(sentence)
        final_words=''
        for word in words:
            if word not in stopWords:
                final_words += word + ' '
        final_sentences.append(final_words)
    print(final_sentences)
        
web_backend = []
mobile_front_end = []
web_front_end= []
def calculate_relevancy_percentage(text):
    web_frontend_count = 0
    mobile_frontend_count = 0
    web_backend_count = 0
    database_count = 0
    for sentence in final_sentences:
        words_each_sentence = word_tokenize(sentence)
        for each_word in words_each_sentence:
            if(each_word in web_frontend_values):
                web_frontend_count += 1
            if(each_word in mobile_frontend_values):
                mobile_frontend_count += 1
            if(each_word in web_backend_values):
                web_backend_count += 1
            if(each_word in database_values):
                database_count += 1

    new_word_set = word_tokenize(text)
    text_word_count = 0
    for word in new_word_set:
        text_word_count += 1
    count = web_frontend_count + mobile_frontend_count + web_backend_count + database_count
    percentage = (count/text_word_count)*100
    print(percentage)
    
    return str(percentage)

@api.route('/input',methods=['GET', 'POST'])
def userInput():
    if request.method == 'POST':
        global final_technologies
        final_technologies = []
        user_input = request.json['userInput']
        print(user_input)
        print(final_sentences)
        extract_preproces_sentences(user_input)
        percentage = calculate_relevancy_percentage(user_input)
        classify_sentences()
        create_predicatable_sentences()
        prediction() 

        confirmTechnologies(predicted_web_frontend)
        confirmTechnologies(predicted_mobile_frontend)
        confirmTechnologies(predicted_web_backend)
        
        print(final_technologies)
        return str(final_technologies)

final_technologies = []
technologies = ["React","Flutter","Java"]
def confirmTechnologies(technology):
    
    for each_tech in technologies:
        print(each_tech)
        print(technology)
        if (each_tech == technology):
            print("running inside loop")
            final_technologies.append(each_tech)
    


final_web_front_end = "" 
final_mobile_front_end = ""
final_web_backend = ""

def classify_sentences():
    loaded_model = joblib.load('classifier')
    for sentence in final_sentences:
        val = loaded_model.predict([sentence])
        if val == ['Web Backend']:
            web_backend.append(sentence)
        if val == ['Mobile Frontend']:
            mobile_front_end.append(sentence)
        if val == ['Web Frontend']:
            web_front_end.append(sentence)

def create_predicatable_sentences():
    global final_web_front_end
    global final_mobile_front_end
    global final_web_backend
    final_web_front_end = ""
    final_mobile_front_end = ""
    final_web_backend = ""
    for each_sentence in web_front_end:
        final_web_front_end += each_sentence
    for each_sentence in mobile_front_end:
        final_mobile_front_end += each_sentence
    for each_sentence in web_backend:
        final_web_backend += each_sentence

predicted_web_frontend = ''
predicted_mobile_frontend = ''
predicted_web_backend = ''

def prediction():
    global predicted_web_frontend
    global predicted_mobile_frontend
    global predicted_web_backend
    features_count1 = v.transform([final_web_front_end])
    predicted_web_frontend = model.predict(features_count1)
    features_count2 = v.transform([final_mobile_front_end])
    predicted_mobile_frontend = model.predict(features_count2)
    features_count3 = v.transform([final_web_backend])
    predicted_web_backend = model.predict(features_count3)
    return "f"


if __name__ == "__main__":
    api.debug = True
    api.run()