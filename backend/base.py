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

database_values = ['secure', 'scalable', 'available', 'readable', 'security', 'relational','secure', 'scalable', 
                   'available', 'readable', 'security', 'relational', 'high performance', 'cross platform', 'flexible',
                   'robust', 'protection', 'open source','fast', 'flexible', 'dynamic', 'auditing', 'automatic sharding',
                   'security', 'elastic scalable', 'speed', 'indexing', 'replication','easy', 'dynamic', 'hosting', 
                   'authentication', 'realtime', 'storage', 'cloud', 'mobile', 'serverless','scalable', 'easy', 
                   'multi model', 'distributed', 'redundancy', 'big data', 'speed','scalable', 'security', 'reliable', 
                   'data analysis', 'critical', 'popular', 'secure', 'fast', 'advance', 'intelligence', 'backup', 
                   'recovery', 'relational','open source', 'json support',' handle massive data', 'scalable',
                   'high available', 'textual data', 'flexible index', 'integrity', 'relational','json', 'fast indexing',
                   'retrieval', 'avilability', 'consistency', 'partition tolerance', 'multiple language','serverless', 
                   'flexible', 'free', 'open source', 'no configuration', 'multiple languages','scalablity', 'resiliency',
                   'security', 'easy integrations','IP filtering', 'role base access controll', 'encryption' ,
                   'High Scalability', 'Rigid Architecture', 'Fast Linear-scale Performance', 'Fault tolerant', 
                   'Flexible Data Storage', 'Easy Data Distribution', 'Transaction Support', 'Fast writes','small teams', 
                   'induviduals', 'easier', 'output in pdf',' ready templates','indexing', 'search', 'alerts', 'Dashboard',
                   'pivot', 'reports','multi model', 'high performance', 'relational database','flexible','grid computing',
                   'efficient','Property Graph Data Model','query language', 'index', 'support ACID',' export json', 
                   'export xls', 'unique constraints', 'Cypher', 'Gremlin','Bolt', 'Cypher','automatic shard rebalancing', 'GraphQL inspired', 'Distributed ACID transactions', 
                   'Grpc/HTTP', 'JSON/RDF']

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
database = []
def calculate_relevancy_percentage(text):
    web_frontend_count = 0
    mobile_frontend_count = 0
    web_backend_count = 0
    database_count = 0
    for sentence in final_sentences:
        print(sentence)
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
        print(percentage)
        return str(percentage)

@api.route('/finalStack',methods=['GET', 'POST'])
def getStack():
    if request.method == 'POST':
        classify_sentences()
        create_predicatable_sentences()
        prediction() 

        confirmTechnologies(predicted_web_frontend)
        confirmTechnologies(predicted_mobile_frontend)
        confirmTechnologies(predicted_web_backend)
        confirmTechnologies(predicted_database)
        print(final_technologies)
        techDic = {1: final_technologies[0], 2: final_technologies[1], 3: final_technologies[2], 4: final_technologies[3] }
        return techDic

final_technologies = []
technologies = ["React","Flutter","Java", "MySQL"]
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
final_database = ""
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
        if val == ['Database']:
            database.append(sentence)

def create_predicatable_sentences():
    global final_web_front_end
    global final_mobile_front_end
    global final_web_backend
    global final_database
    final_web_front_end = ""
    final_mobile_front_end = ""
    final_web_backend = ""
    final_database = ""
    for each_sentence in web_front_end:
        final_web_front_end += each_sentence
    for each_sentence in mobile_front_end:
        final_mobile_front_end += each_sentence
    for each_sentence in web_backend:
        final_web_backend += each_sentence
    for each_sentence in database:
        final_database += each_sentence

predicted_web_frontend = ''
predicted_mobile_frontend = ''
predicted_web_backend = ''
predicted_database = ''
def prediction():
    global predicted_web_frontend
    global predicted_mobile_frontend
    global predicted_web_backend
    global predicted_database
    features_count1 = v.transform([final_web_front_end])
    predicted_web_frontend = model.predict(features_count1)
    features_count2 = v.transform([final_mobile_front_end])
    predicted_mobile_frontend = model.predict(features_count2)
    features_count3 = v.transform([final_web_backend])
    predicted_web_backend = model.predict(features_count3)
    features_count4 = v.transform([final_database])
    predicted_database = model.predict(features_count4)
    return "f"

#User preferences part 
#frontend web technologies 
wf_react = [
    'easy', 'rich', 'user', 'interface', 'fast', 'trusted', 'trending', 'strong community support', 'speed', 'efficient', 
    'flexible', 'performance', 'one way data binding', 'dynamic web development', 'complex website'
]
wf_angular = [
    'easy', 'mvc architecture', 'model view control architecture' ,'compatible', 'filter'
]
wf_vue = [
    'small size', 'simple integration', 'improved documentation', 'progressive', 'well defined ecosystem', 'flexible', 
    'interactive web application', 'scalable web apps'
]
wf_node = [
    'open source', 'cross platform', 'popular', 'lightweight', 'fast', 'serverside'
]
wf_javascript = [
    'high level', 'popular','easy','versatile', 'flexible', 'multi paradigm'
]
#frontend mobile technologies 
mf_react_native =[
    'reusable','cost effective','compatible','deployment','maintainable','third party','cross platform'
]
mf_flutter = [
    'native','widget','material design','flexible','cross platform','dart'
]
mf_xamarin = [
    'native','cross platform','api','easy','community','fast','windows'
]
mf_ionic = [
    'cross platform','windows','cordova','independent','adaptable','uniform'
]
mf_jquery_mobile = [
    'cross platform','responsive','lightweight','theming','interactive','rich','simple'
]
mf_mobile_angular_ui= [
    'easy', 'simple development','hybrid'
]
#backend technologies 
b_java = [
    'object oriented', 'simple', 'security', 'neural architecture', 'portable', 'robust', 'multithreading', 'flexible', 
    'distributed', 'high performance', 'rich api', 'independent', 'multi paradigm', 'garbage collected'
]
b_python = [
    'simple', 'free', 'open source', 'portable', 'scalable', 'embeddable', 'high level interpreting', 
    'large library', 'object oriented', 'readable', 'compatible'
]
b_php = [
    'flexible', 'dynamic', 'content management', 'open source', 'effective', 'less time', 'integrative', 
    'scalable', 'hosting', 'cms', 'resources'
]
b_c = [
    'scalable', 'object oriented', 'maintainable', 'nested', 'indexer', 'readable', '.net', 
    'dotnet', 'cross platform', 'active', 'popular', 'design patterns', 'well documented', 'fast'
]
b_dart = [ 
   'object oriented', 'open source', 'class based', 'garbage collected'
]
b_express = [ 
    'open source','simple','easy','quick','extensible'
]
b_ruby = [
    'versatile', 'dynamic', 'open source', 'simple', 'high level', 'web scraping', 'crawling'
]
#database technologies 
d_mysql = [ 
    'secure', 'scalable', 'available', 'readable', 'security', 'relational', 'high performance', 'cross platform', 
    'flexible', 'robust', 'protection', 'open source'
]
d_mongodb = [ 
    'fast', 'flexible', 'dynamic', 'auditing', 'automatic sharding', 'security', 'elastic scalable', 'speed', 
    'indexing', 'replication'
]
d_firebase = [ 
    'easy', 'dynamic', 'hosting', 'authentication', 'realtime', 'storage', 'cloud', 'mobile', 'serverless'
]
d_nosql = [ 
    'scalable', 'easy', 'multi model', 'distributed', 'redundancy', 'big data', 'speed'
]
d_sqlserver = [ 
    'scalable', 'security', 'reliable',' data analysis', 'critical', 'popular', 'secure', 'fast', 'advance', 
    'intelligence', 'backup', 'recovery', 'relational'
]
d_postgresql = [ 
    'open source', 'json support',' handle massive data', 'scalable', 'high available', 'textual data',
    'flexible index', 'integrity', 'relational'
]

matching_words_wf = []
prefered_matching_words_wf = []

matching_words_mf = []
prefered_matching_words_mf = []

matching_words_b = []
prefered_matching_words_b = []

matching_words_d = []
prefered_matching_words_d = []

final_web_front_end_words = ""
final_mobile_front_end_words = ""
final_back_end_words = ""
final_database_words = ""

@api.route('/getPreferredTechPercentages',methods=['GET', 'POST'])
def getPreferredTechnologyPercentages():
    print("inside getPreferredTechPercentages1")
    if request.method == 'POST':
        print("inside getPreferredTechPercentages")
        global final_web_front_end_words
        global final_mobile_front_end_words
        global final_back_end_words
        global final_database_words

        global matching_words_wf
        global prefered_matching_words_wf
        global matching_words_mf
        global prefered_matching_words_mf
        global matching_words_b
        global prefered_matching_words_b
        global matching_words_d
        global prefered_matching_words_d

        matching_words_wf = []
        prefered_matching_words_wf = []
        matching_words_mf = []
        prefered_matching_words_mf = []
        matching_words_b = []
        prefered_matching_words_b = []
        matching_words_d = []
        prefered_matching_words_d = []

        final_web_front_end_words    = word_tokenize(final_web_front_end)
        final_mobile_front_end_words = word_tokenize(final_mobile_front_end)
        final_back_end_words         = word_tokenize(final_web_backend)
        final_database_words         = word_tokenize(final_database)

        preferredFrontendWebTech    = request.json['preferredFrontendWebTech']
        preferredFrontendMobileTech = request.json['preferredFrontendMobileTech']
        preferredBackendTech        = request.json['preferredBackendTech']
        preferredDatabaseTech       = request.json['preferredDatabaseTech']

        check_matching_words_web_frontend()
        check_matching_words_mobile_frontend()
        check_matching_words_backend()
        check_matching_words_database()
        check_for_preferred_matching_web_frontend(preferredFrontendWebTech)
        check_for_preferred_matching_mobile_frontend(preferredFrontendMobileTech)
        check_for_preferred_matching_backend(preferredBackendTech)
        check_for_preferred_matching_database(preferredDatabaseTech)

        preferred_percentage_wf = 0
        if len(matching_words_wf) == 0:
            preferred_percentage_wf = 30
        else:
            preferred_percentage_wf = (len(prefered_matching_words_wf)/len(matching_words_wf))*100
            if preferred_percentage_wf < 30:
                preferred_percentage_wf = 30

        preferred_percentage_mf = 0
        if len(matching_words_mf) == 0:
            preferred_percentage_mf = 30
        else:
            preferred_percentage_mf = (len(prefered_matching_words_mf)/len(matching_words_mf))*100
            if preferred_percentage_mf < 30:
                preferred_percentage_mf = 30

        preferred_percentage_b = 0
        if len(matching_words_b) == 0:
            preferred_percentage_b = 30
        else:
            preferred_percentage_b = (len(prefered_matching_words_b)/len(matching_words_b))*100
            if preferred_percentage_b < 30:
                preferred_percentage_b = 30

        preferred_percentage_d = 0
        if len(matching_words_d) == 0:
            preferred_percentage_d = 30
        else:
            preferred_percentage_d = (len(prefered_matching_words_d)/len(matching_words_d))*100
            if preferred_percentage_d < 30:
                preferred_percentage_d = 30
                
        preferredPercentages = {1: preferred_percentage_wf, 2: preferred_percentage_mf, 3: preferred_percentage_b, 4: preferred_percentage_d}
        print(preferredPercentages)
        return preferredPercentages

def check_matching_words_web_frontend():
    if predicted_web_frontend == ['React']:
        for each in final_web_front_end_words:
            if each in wf_react:
                matching_words_wf.append(each)
    if predicted_web_frontend == ['Angular']:
        for each in final_web_front_end_words:
            if each in wf_angular:
                matching_words_wf.append(each)
    if predicted_web_frontend == ['Vue']:
        for each in final_web_front_end_words:
            if each in wf_vue:
                matching_words_wf.append(each)
    if predicted_web_frontend == ['Node']:
        for each in final_web_front_end_words:
            if each in wf_node:
                matching_words_wf.append(each)

def check_matching_words_mobile_frontend():
    if predicted_mobile_frontend == ['React Native']:
        for each in final_mobile_front_end_words:
            if each in mf_react_native:
                matching_words_mf.append(each)
    if predicted_mobile_frontend == ['Flutter']:
        for each in final_mobile_front_end_words:
            if each in mf_flutter :
                matching_words_mf.append(each)
    if predicted_mobile_frontend == ['Xamarin']:
        for each in final_mobile_front_end_words:
            if each in mf_xamarin :
                matching_words_mf.append(each)
    if predicted_mobile_frontend == ['Ionic']:
        for each in final_mobile_front_end_words:
            if each in mf_ionic :
                matching_words_mf.append(each)
    if predicted_mobile_frontend == ['Jquery Mobile']:
        for each in final_mobile_front_end_words:
            if each in mf_jquery_mobile  :
                matching_words_mf.append(each)
    if predicted_mobile_frontend == ['Mobile angular ui']:
        for each in final_mobile_front_end_words:
            if each in mf_mobile_angular_ui :
                matching_words_mf.append(each)

def check_matching_words_backend():
    if predicted_web_backend == ['Java']:
        for each in final_back_end_words:
            if each in b_java:
                matching_words_b.append(each)
    if predicted_web_backend == ['Python']:
        for each in final_back_end_words:
            if each in b_python:
                matching_words_b.append(each)
    if predicted_web_backend == ['PHP']:
        for each in final_back_end_words:
            if each in b_php:
                matching_words_b.append(each)
    if predicted_web_backend == ['C#']:
        for each in final_back_end_words:
            if each in b_c:
                matching_words_b.append(each)
    if predicted_web_backend == ['Dart']:
        for each in final_back_end_words:
            if each in b_dart:
                matching_words_b.append(each)
    if predicted_web_backend == ['Express']:
        for each in final_back_end_words:
            if each in b_express:
                matching_words_b.append(each)
    if predicted_web_backend == ['Ruby']:
        for each in final_back_end_words:
            if each in b_ruby:
                matching_words_b.append(each)

def check_matching_words_database():
    if predicted_database == ['MySQL']:
        for each in final_database_words:
            if each in d_mysql:
                matching_words_d.append(each)
    if predicted_database == ['MongoDB']:
        for each in final_database_words:
            if each in d_mongodb:
                matching_words_d.append(each)
    if predicted_database == ['Firebase']:
        for each in final_database_words:
            if each in d_firebase:
                matching_words_d.append(each)
    if predicted_database == ['NoSQL']:
        for each in final_database_words:
            if each in d_nosql:
                matching_words_d.append(each)
    if predicted_database == ['SQL Server']:
        for each in final_database_words:
            if each in d_sqlserver:
                matching_words_d.append(each)
    if predicted_database == ['PostgreSQL']:
        for each in final_database_words:
            if each in d_postgresql:
                matching_words_d.append(each)

def check_for_preferred_matching_web_frontend(frontend):
    if frontend == 'ReactJs':
         for each_matching_word in matching_words_wf:
            if each_matching_word in wf_react :
                prefered_matching_words_wf.append(each_matching_word)       
    if frontend == 'Angular':
        for each_matching_word in matching_words_wf:
            if each_matching_word in wf_angular:
                prefered_matching_words_wf.append(each_matching_word)   
    if frontend == 'Vue':
        for each_matching_word in matching_words_wf:
            if each_matching_word in wf_vue :
                prefered_matching_words_wf.append(each_matching_word)
    if frontend == 'Node':
        for each_matching_word in matching_words_wf:
            if each_matching_word in wf_node :
                prefered_matching_words_wf.append(each_matching_word)
    if frontend == 'JavaScript':
        for each_matching_word in matching_words_wf:
            if each_matching_word in wf_javascript  :
                prefered_matching_words_wf.append(each_matching_word)

def check_for_preferred_matching_mobile_frontend(frontend):
    if frontend == 'React Native':
         for each_matching_word in matching_words_mf:
            if each_matching_word in mf_react_native  :
                prefered_matching_words_mf.append(each_matching_word)       
    if frontend == 'Flutter':
        for each_matching_word in matching_words_mf:
            if each_matching_word in mf_flutter :
                prefered_matching_words_mf.append(each_matching_word)   
    if frontend == 'Xamarin':
        for each_matching_word in matching_words_mf:
            if each_matching_word in mf_xamarin  :
                prefered_matching_words_mf.append(each_matching_word)
    if frontend == 'Ionic':
        for each_matching_word in matching_words_mf:
            if each_matching_word in mf_ionic  :
                prefered_matching_words_mf.append(each_matching_word)
    if frontend == 'Jquery Mobile':
        for each_matching_word in matching_words_mf:
            if each_matching_word in mf_jquery_mobile   :
                prefered_matching_words_mf.append(each_matching_word)
    if frontend == 'Mobile angular ui':
        for each_matching_word in matching_words_mf:
            if each_matching_word in mf_mobile_angular_ui :
                prefered_matching_words_mf.append(each_matching_word)

def check_for_preferred_matching_backend(backend):
    if backend == 'Java':
         for each_matching_word in matching_words_b:
            if each_matching_word in b_java :
                prefered_matching_words_b.append(each_matching_word)       
    if backend == 'Python':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_python:
                prefered_matching_words_b.append(each_matching_word)   
    if backend == 'PHP':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_php :
                prefered_matching_words_b.append(each_matching_word)
    if backend == 'C#':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_c :
                prefered_matching_words_b.append(each_matching_word)
    if backend == 'Dart':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_dart  :
                prefered_matching_words_b.append(each_matching_word)
    if backend == 'Express':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_express:
                prefered_matching_words_b.append(each_matching_word)
    if backend == 'Ruby':
        for each_matching_word in matching_words_b:
            if each_matching_word in b_ruby:
                prefered_matching_words_b.append(each_matching_word)

def check_for_preferred_matching_database(database):
    if database == 'MySQL':
         for each_matching_word in matching_words_d:
            if each_matching_word in d_mysql  :
                prefered_matching_words_d.append(each_matching_word)       
    if database == 'MongoDB':
        for each_matching_word in matching_words_d:
            if each_matching_word in d_mongodb :
                prefered_matching_words_d.append(each_matching_word)   
    if database == 'Firebase':
        for each_matching_word in matching_words_d:
            if each_matching_word in d_firebase  :
                prefered_matching_words_d.append(each_matching_word)
    if database == 'NoSQL':
        for each_matching_word in matching_words_d:
            if each_matching_word in d_nosql:
                prefered_matching_words_d.append(each_matching_word)
    if database == 'SQL Server':
        for each_matching_word in matching_words_d:
            if each_matching_word in d_sqlserver:
                prefered_matching_words_d.append(each_matching_word)
    if database == 'PostgreSQL':
        for each_matching_word in matching_words_d:
            if each_matching_word in d_postgresql:
                prefered_matching_words_d.append(each_matching_word)

if __name__ == "__main__":
    api.debug = True
    api.run()