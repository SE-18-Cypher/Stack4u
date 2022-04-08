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

matching_words = []
prefered_matching_words = []

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

        global matching_words
        global prefered_matching_words

        matching_words = []
        prefered_matching_words = []

        final_web_front_end_words    = word_tokenize(final_web_front_end)
        final_mobile_front_end_words = word_tokenize(final_mobile_front_end)
        final_back_end_words         = word_tokenize(final_web_backend)
        final_database_words         = word_tokenize(final_database)

        predictedFrontendWebTech    = request.json['predictedFrontendWebTech']
        predictedFrontendMobileTech = request.json['predictedFrontendMobileTech']
        predictedBackendTech        = request.json['predictedBackendTech']
        predictedDatabaseTech       = request.json['predictedDatabaseTech']

        preferredFrontendWebTech    = request.json['preferredFrontendWebTech']
        preferredFrontendMobileTech = request.json['preferredFrontendMobileTech']
        preferredBackendTech        = request.json['preferredBackendTech']
        preferredDatabaseTech       = request.json['preferredDatabaseTech']

        check_matching_words_web_frontend()
        check_matching_words_mobile_frontend()
        check_for_preferred_matching_web_frontend('React')
        check_for_preferred_matching_mobile_frontend('React Native')
        preferred_percentage = (len(prefered_matching_words)/len(matching_words))*100
        print(len(prefered_matching_words))
        print(len(matching_words))
        print("percentage is : " , preferred_percentage)
    return "S"

def check_matching_words_web_frontend():
    if predicted_web_frontend == ['React']:
        for each in final_web_front_end_words:
            if each in wf_react:
                matching_words.append(each)
    if predicted_web_frontend == ['Angular']:
        for each in final_web_front_end_words:
            if each in wf_angular:
                matching_words.append(each)
    if predicted_web_frontend == ['Vue']:
        for each in final_web_front_end_words:
            if each in wf_vue:
                matching_words.append(each)
    if predicted_web_frontend == ['Node']:
        for each in final_web_front_end_words:
            if each in wf_node:
                matching_words.append(each)

def check_matching_words_mobile_frontend():
    if predicted_mobile_frontend == ['React Native']:
        for each in final_mobile_front_end_words:
            if each in mf_react_native:
                matching_words.append(each)
    if predicted_mobile_frontend == ['Flutter']:
        for each in final_mobile_front_end_words:
            if each in mf_flutter :
                matching_words.append(each)
    if predicted_mobile_frontend == ['Xamarin']:
        for each in final_mobile_front_end_words:
            if each in mf_xamarin :
                matching_words.append(each)
    if predicted_mobile_frontend == ['Ionic']:
        for each in final_mobile_front_end_words:
            if each in mf_ionic :
                matching_words.append(each)
    if predicted_mobile_frontend == ['Jquery Mobile']:
        for each in final_mobile_front_end_words:
            if each in mf_jquery_mobile  :
                matching_words.append(each)
    if predicted_mobile_frontend == ['Mobile angular ui']:
        for each in final_mobile_front_end_words:
            if each in mf_mobile_angular_ui :
                matching_words.append(each)

def check_for_preferred_matching_web_frontend(frontend):
    if frontend == 'React':
         for each_matching_word in matching_words:
            if each_matching_word in wf_react :
                prefered_matching_words.append(each_matching_word)       
    if frontend == 'Angular':
        for each_matching_word in matching_words:
            if each_matching_word in wf_angular:
                prefered_matching_words.append(each_matching_word)   
    if frontend == 'Vue':
        for each_matching_word in matching_words:
            if each_matching_word in wf_vue :
                prefered_matching_words.append(each_matching_word)
    if frontend == 'Node':
        for each_matching_word in matching_words:
            if each_matching_word in wf_node :
                prefered_matching_words.append(each_matching_word)
    if frontend == 'JavaScript':
        for each_matching_word in matching_words:
            if each_matching_word in wf_javascript  :
                prefered_matching_words.append(each_matching_word)

def check_for_preferred_matching_mobile_frontend(frontend):
    if frontend == 'React Native':
         for each_matching_word in matching_words:
            if each_matching_word in mf_react_native  :
                prefered_matching_words.append(each_matching_word)       
    if frontend == 'Flutter':
        for each_matching_word in matching_words:
            if each_matching_word in mf_flutter :
                prefered_matching_words.append(each_matching_word)   
    if frontend == 'Xamarin':
        for each_matching_word in matching_words:
            if each_matching_word in mf_xamarin  :
                prefered_matching_words.append(each_matching_word)
    if frontend == 'Ionic':
        for each_matching_word in matching_words:
            if each_matching_word in mf_ionic  :
                prefered_matching_words.append(each_matching_word)
    if frontend == 'Jquery Mobile':
        for each_matching_word in matching_words:
            if each_matching_word in mf_jquery_mobile   :
                prefered_matching_words.append(each_matching_word)
    if frontend == 'Mobile angular ui':
        for each_matching_word in matching_words:
            if each_matching_word in mf_mobile_angular_ui :
                prefered_matching_words.append(each_matching_word)
if __name__ == "__main__":
    api.debug = True
    api.run()
    