from fileinput import filename
import docx2txt
from flask import Flask
from pdf2docx import parse
from typing import Tuple
from tkinter import _tkinter
from tkinter import Tk, messagebox
import os
import sys
from flask import Flask, render_template, request
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn import svm
v = CountVectorizer()

UPLOADER_FOLDER = ''
api = Flask(__name__)
api.config['UPLOADER_FOLDER'] = UPLOADER_FOLDER

fileName2 = ''


@api.route('/index', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        def convert_pdf2docx(input_file: str, output_file: str, pages: Tuple = None):
           if pages:
               pages = [int(i) for i in list(pages) if i.isnumeric()]

           result = parse(pdf_file=input_file,
                          docx_with_path=output_file, pages=pages)
           summary = {
               "File": input_file, "Pages": str(pages), "Output File": output_file
           }

           print("\n".join("{}:{}".format(i, j) for i, j in summary.items()))
           return result

        file = request.files['file']
        if file.filename != '':
           file.save(os.path.join(
               api.config['UPLOADER_FOLDER'], file.filename))
           input_file = file.filename
           output_file = r"hello.docx"
           convert_pdf2docx(input_file, output_file)
           doc = input_file.split(".")[0]+".docx"
           global fileName2
           fileName2 = input_file.split(".")[0]
           my_text = docx2txt.process(fileName2+".docx")
        #    print(my_text)
           lis = doc.replace(" ", "=")
        #    return render_template("docx.html", variable=lis)
        # print(userInputDoc(my_text))
        return userInputDoc(my_text)
    # return render_template("index.html")
    return "file name might be empty"

#all keywords in web frontend
web_frontend_values = ['easy', 'rich user interface', 'fast', 'trusted', 'trending', 'strong community support', 'speed', 
                       'efficient', 'flexible', 'performance', 'one way data binding', 'dynamic web development', 
                       'complex website', 'mvc architecture', 'model view control architecture', 'compatible', 'filter', 
                       'testing', 'spa', 'two way data binding', 'consistant,' 'reusable', 'readable', 'maintenance', 
                       'dynamic app', 'small size', 'simple integration', 'improved documentation', 'progressive',
                       'well defined ecosystem', 'interactive web application', 'scalable web apps', 'open source', 
                       'cross platform', 'popular', 'lightweight','serverside', 'high level', 'versatile', 'multi paradigm']
#all keywords in mobile frontend 
mobile_frontend_values = ['reusable', 'cost effective', 'compatible', 'deployment', 'maintainable', 'third party', 
                          'cross platform', 'native', 'widget','material design','flexible', 'dart', 'api', 'easy', 
                          'community', 'fast', 'windows', 'cardova', 'independent', 'adaptable', 'uniform', 'responsive', 
                          'lightweight','theming', 'interactive', 'rich', 'simple', 'simple development', 'hybrid']
#all keywords in backend 
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
#all keywords in database 
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

df = pd.read_csv('dataset.csv')                     # reading the dataset
X_train = v.fit_transform(df.features.values)       # vectorizing the data 
model = MultinomialNB()                             # naive bayes model
model.fit(X_train,df.technology)                    # training the model

SVM = svm.SVC(C=2.0, kernel='linear', degree=4, gamma='auto')
SVM.fit(X_train,df.technology)

final_sentences = []                                # array to hold all the preprocessed sentences 
# method to extract preprocessed sentences 
def extract_preproces_sentences(text):
    global final_sentences                          # global array to hold the preprocessed sentences 
    final_sentences = []                            # resetting the array
    sentences = sent_tokenize(text)                 # tokenzing the text to sentences 
    stopWords = set(stopwords.words('english'))     # removing the stop words from the sentences 
    for sentence in sentences:
        words = word_tokenize(sentence)             # tokenzing each word in each sentence 
        final_words=''
        for word in words:
            if word not in stopWords:
                final_words += word + ' '           # generating preprocessed sentences 
        final_sentences.append(final_words)         # adding the sentences to the final sentences array 
        
web_backend = []                                    # seperate arrays to hold classified sentences 
mobile_front_end = []
web_front_end= []
database = []
# method to calculate the relevancy percentage of the input
def calculate_relevancy_percentage(text):
    web_frontend_count = 0
    mobile_frontend_count = 0
    web_backend_count = 0
    database_count = 0
    for sentence in final_sentences:                    # each preprocessed sentence 
        words_each_sentence = word_tokenize(sentence)   # tokenize each sentence to a words
        for each_word in words_each_sentence:           # each word in the sentence is a key value of 
            if(each_word in web_frontend_values):       # of either frontend, backend or database there will be count 
                web_frontend_count += 1
            elif(each_word in mobile_frontend_values):
                mobile_frontend_count += 1
            elif(each_word in web_backend_values):
                web_backend_count += 1
            elif(each_word in database_values):
                database_count += 1

    new_word_set = word_tokenize(text)                  # getting the number of words in the input text 
    text_word_count = 0
    for word in new_word_set:
        text_word_count += 1
    count = web_frontend_count + mobile_frontend_count + web_backend_count + database_count
    percentage = (count/text_word_count)*100            # calculating the percentage 

    percentageWF = (web_frontend_count/len(web_frontend_values))*100
    percentageMF = (mobile_frontend_count/len(mobile_frontend_values))*100
    percentageB  = (web_backend_count/len(web_backend_values))*100
    percentageD  = (database_count/len(database_values))*100
    eachPercentages = {1: percentage, 2:percentageWF, 3:percentageMF, 4:percentageB, 5:percentageD}
    return eachPercentages

@api.route('/input',methods=['GET', 'POST'])
def userInput():
    if request.method == 'POST':
        global final_technologies                                   # global final technologies array 
        final_technologies = []                                     # resetting the array 
        user_input = request.json['userInput']                      # getting the user input from frontend 
        extract_preproces_sentences(user_input)                     # prerpocessing the text input 
        percentage = calculate_relevancy_percentage(user_input)     # calculating the percentage 
        return percentage
        

def userInputDoc(userInputData):
    print("1111111111111111111")
    if request.method == 'POST':
        # global final technologies array
        global final_technologies
        # resetting the array
        final_technologies = []
        # getting the user input from frontend
        user_input = userInputData
        # prerpocessing the text input
        extract_preproces_sentences(user_input)
        percentage = calculate_relevancy_percentage(
            user_input)     # calculating the percentage
        # returning the percentage
        return percentage
                                           # returning the percentage 

@api.route('/finalStack',methods=['GET', 'POST'])
def getStack():
    if request.method == 'POST':
        classify_sentences()                             # classifying the preprocess sentences into the respective classes 
        create_predicatable_sentences()                  # merging all the sentences in each classifed arrays to one 
        prediction()                                     # technology predictions Naive Bayes 

        confirmTechnologies(predicted_web_frontend)      # adding the predicted technologies to the final technology array 
        confirmTechnologies(predicted_mobile_frontend)
        confirmTechnologies(predicted_web_backend)
        confirmTechnologies(predicted_database)
        print(final_technologies)                        # final technologies 
        techDic = {1: final_technologies[0], 2: final_technologies[1], 3: final_technologies[2], 4: final_technologies[3] }
        return techDic                                   # return the final technologies as an dictionary 

final_technologies = []                                  # array to hold the final technologies 
technologies = ["React","Angular","Vue","Node",          # all the available technologies 
                "React Native","Flutter","Xamarin","Ionic","Jquery Mobile","Mobile angular ui",
                "Java" ,"Python" ,"PHP", "C#" ,"Dart"  ,"Express", "Ruby",
                "MySQL", "MongoDB", "Firebase", "NoSQL", "SQL Server" ,"PostgreSQL"
               ]
# method to add the technologies to the final technology array
def confirmTechnologies(technology):
    for each_tech in technologies:
        if (each_tech == technology):
            final_technologies.append(each_tech)
  
final_web_front_end = "" 
final_mobile_front_end = ""
final_web_backend = ""
final_database = ""
# method to classify sentences into classes 
def classify_sentences():
    loaded_model = joblib.load('classifier')            # loading the Naive Bayes classifer 
    for sentence in final_sentences:                    
        val = loaded_model.predict([sentence])          # getting each sentence classifying it to a class and adding 
        if val == ['Web Backend']:                      # each classified sentence to its respective array 
            web_backend.append(sentence)
        if val == ['Mobile Frontend']:
            mobile_front_end.append(sentence)
        if val == ['Web Frontend']:
            web_front_end.append(sentence)
        if val == ['Database']:
            database.append(sentence)
# method to create a predicatable sentences so that they can be predicted 
def create_predicatable_sentences():
    global final_web_front_end                      # global variables holding the each classified sentences 
    global final_mobile_front_end
    global final_web_backend
    global final_database
    final_web_front_end    = ""                     # resetting the variables 
    final_mobile_front_end = ""
    final_web_backend      = ""
    final_database         = ""
    for each_sentence in web_front_end:             # merging all the sentences as one 
        final_web_front_end += each_sentence
    for each_sentence in mobile_front_end:
        final_mobile_front_end += each_sentence
    for each_sentence in web_backend:
        final_web_backend += each_sentence
    for each_sentence in database:
        final_database += each_sentence

predicted_web_frontend    = ''                      # variables to hold each predicted technologies 
predicted_mobile_frontend = ''
predicted_web_backend     = ''
predicted_database        = ''
# method to predict technologies 
def prediction():
    global predicted_web_frontend                   # global variables holding the technologies 
    global predicted_mobile_frontend
    global predicted_web_backend
    global predicted_database
    features_count1 = v.transform([final_web_front_end])            # vectorzing each classified sentences 
    predicted_web_frontendNB = model.predict(features_count1)         # predicting technologies 
    predicted_web_frontendSVM = SVM.predict(features_count1)

    web_frontend_tech = ["React","Angular","Vue","Node"]
    if(predicted_web_frontendNB in web_frontend_tech and predicted_web_frontendSVM in web_frontend_tech): #if both the models predict valid technolgoies 
        nb_web_count = 0
        if(predicted_web_frontendNB == "React"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_react:
                    nb_web_count += 1
        if(predicted_web_frontendNB == "Anuglar"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_angular:
                    nb_web_count += 1
        if(predicted_web_frontendNB == "Vue"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_vue:
                    nb_web_count += 1
        if(predicted_web_frontendNB == "Node"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_node:
                    nb_web_count += 1
        svm_web_count = 0
        if(predicted_web_frontendSVM == "React"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_react:
                    svm_web_count += 1
        if(predicted_web_frontendSVM == "Anuglar"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_angular:
                    svm_web_count += 1
        if(predicted_web_frontendSVM == "Vue"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_vue:
                    svm_web_count += 1
        if(predicted_web_frontendSVM == "Node"):
            for each_word in word_tokenize(final_web_front_end):
                if each_word in wf_node:
                    svm_web_count += 1
        if(svm_web_count > nb_web_count):
            predicted_web_frontend = predicted_web_frontendSVM
        else:
            predicted_web_frontend = predicted_web_frontendNB  

    elif(predicted_web_frontendNB in web_frontend_tech):    # if naive bayes prediction is valid then that is the final technology
        predicted_web_frontend = predicted_web_frontendNB
    elif(predicted_web_frontendSVM in web_frontend_tech):   # if svm prediction is valid then that is the final technology
        predicted_web_frontend = predicted_web_frontendSVM  

    features_count2 = v.transform([final_mobile_front_end])
    predicted_mobile_frontendNB = model.predict(features_count2)
    predicted_mobile_frontendSVM = SVM.predict(features_count2)

    mobile_frontend_tech = ["React Native","Flutter","Xamarin","Ionic","Jquery Mobile","Mobile angular ui"]
    if(predicted_mobile_frontendNB in mobile_frontend_tech and predicted_mobile_frontendSVM in mobile_frontend_tech):
        nb_mobile_count = 0
        if(predicted_mobile_frontendNB == "React Native"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_react_native:
                    nb_mobile_count += 1
        if(predicted_mobile_frontendNB == "Flutter"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_flutter:
                    nb_mobile_count += 1
        if(predicted_mobile_frontendNB == "Xamarin"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_xamarin:
                    nb_mobile_count += 1
        if(predicted_mobile_frontendNB == "Ionic"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_ionic:
                    nb_mobile_count += 1
        if(predicted_mobile_frontendNB == "Jquery Mobile"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_jquery_mobile:
                    nb_mobile_count += 1
        if(predicted_mobile_frontendNB == "Mobile angular ui"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_mobile_angular_ui:
                    nb_mobile_count += 1
        svm_mobile_count = 0
        if(predicted_mobile_frontendSVM == "React Native"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_react_native:
                    svm_mobile_count += 1
        if(predicted_mobile_frontendSVM == "Flutter"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_flutter:
                    svm_mobile_count += 1
        if(predicted_mobile_frontendSVM == "Xamarin"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_xamarin:
                    svm_mobile_count += 1
        if(predicted_mobile_frontendSVM == "Ionic"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_ionic:
                    svm_mobile_count += 1
        if(predicted_mobile_frontendSVM == "Jquery Mobile"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_jquery_mobile:
                    svm_mobile_count += 1
        if(predicted_mobile_frontendSVM == "Mobile angular ui"):
            for each_word in word_tokenize(final_mobile_front_end):
                if each_word in mf_mobile_angular_ui:
                    svm_mobile_count += 1
        if(svm_mobile_count > nb_mobile_count):
            predicted_mobile_frontend = predicted_mobile_frontendSVM
        else:
            predicted_mobile_frontend = predicted_mobile_frontendNB 
    elif(predicted_mobile_frontendNB in mobile_frontend_tech):    # if naive bayes prediction is valid then that is the final technology
        predicted_mobile_frontend = predicted_mobile_frontendNB
    elif(predicted_mobile_frontendSVM in mobile_frontend_tech):   # if svm prediction is valid then that is the final technology
        predicted_mobile_frontend = predicted_mobile_frontendSVM  

    features_count3 = v.transform([final_web_backend])
    predicted_web_backendNB = model.predict(features_count3)
    predicted_web_backendSVM = SVM.predict(features_count3)

    backend_tech = ["Java" ,"Python" ,"PHP", "C#" ,"Dart"  ,"Express", "Ruby"]
    if(predicted_web_backendNB in backend_tech and predicted_web_backendSVM in backend_tech):
        nb_backend_count = 0 #NB
        if(predicted_web_backendNB == "Java"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_java:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "Python"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_python:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "PHP"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_php:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "C#"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_c:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "Dart"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_dart:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "Express"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_express:
                    nb_backend_count += 1
        if(predicted_web_backendNB == "Ruby"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_ruby:
                    nb_backend_count += 1
        svm_backend_count = 0   #SVM
        if(predicted_web_backendSVM == "Java"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_java:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "Python"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_python:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "PHP"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_php:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "C#"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_c:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "Dart"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_dart:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "Express"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_express:
                    svm_backend_count += 1
        if(predicted_web_backendSVM == "Ruby"):
            for each_word in word_tokenize(final_web_backend):
                if each_word in b_ruby:
                    svm_backend_count += 1
        if(svm_backend_count > nb_backend_count):
            predicted_web_backend = predicted_web_backendSVM
        else:
            predicted_web_backend = predicted_web_backendNB 
    elif(predicted_web_backendNB in backend_tech):    # if naive bayes prediction is valid then that is the final technology
        predicted_web_backend = predicted_web_backendNB
    elif(predicted_web_backendSVM in backend_tech):   # if svm prediction is valid then that is the final technology
        predicted_web_backend = predicted_web_backendSVM 

    features_count4 = v.transform([final_database])
    predicted_databaseNB = model.predict(features_count4)
    predicted_databaseSVM = SVM.predict(features_count4)
    database_tech = ["MySQL", "MongoDB", "Firebase", "NoSQL", "SQL Server" ,"PostgreSQL"]
    if(predicted_databaseNB in database_tech and predicted_databaseSVM in database_tech):
        nb_database_count = 0 #NB
        if(predicted_databaseNB == "MySQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_mysql:
                    nb_database_count += 1
        if(predicted_databaseNB == "MongoDB"):
            for each_word in word_tokenize(final_database):
                if each_word in d_mongodb:
                    nb_database_count += 1
        if(predicted_databaseNB == "Firebase"):
            for each_word in word_tokenize(final_database):
                if each_word in d_firebase:
                    nb_database_count += 1
        if(predicted_databaseNB == "NoSQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_nosql:
                    nb_database_count += 1
        if(predicted_databaseNB == "SQL Server"):
            for each_word in word_tokenize(final_database):
                if each_word in d_sqlserver:
                    nb_database_count += 1
        if(predicted_databaseNB == "PostgreSQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_postgresql:
                    nb_database_count += 1
        svm_database_count = 0 #SVM
        if(predicted_databaseSVM == "MySQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_mysql:
                    svm_database_count += 1
        if(predicted_databaseSVM == "MongoDB"):
            for each_word in word_tokenize(final_database):
                if each_word in d_mongodb:
                    svm_database_count += 1
        if(predicted_databaseSVM == "Firebase"):
            for each_word in word_tokenize(final_database):
                if each_word in d_firebase:
                    svm_database_count += 1
        if(predicted_databaseSVM == "NoSQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_nosql:
                    svm_database_count += 1
        if(predicted_databaseSVM == "SQL Server"):
            for each_word in word_tokenize(final_database):
                if each_word in d_sqlserver:
                    svm_database_count += 1
        if(predicted_databaseSVM == "PostgreSQL"):
            for each_word in word_tokenize(final_database):
                if each_word in d_postgresql:
                    svm_database_count += 1
        if(svm_database_count > nb_database_count):
            predicted_database = predicted_databaseSVM
        else:
            predicted_database = predicted_databaseNB
    elif(predicted_databaseNB in database_tech):    # if naive bayes prediction is valid then that is the final technology
        predicted_database = predicted_databaseNB
    elif(predicted_databaseSVM in database_tech):   # if svm prediction is valid then that is the final technology
        predicted_database = predicted_databaseSVM
    return "f"

# USER PREFERENCES PART  
# frontend web technologies 
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
# frontend mobile technologies 
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
# backend technologies 
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
# database technologies 
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

matching_words_wf = []                      # arrays to hold matching words for each class 
prefered_matching_words_wf = []             # arrays to hold common words between matching and preferred technologies  

matching_words_mf = []
prefered_matching_words_mf = []

matching_words_b  = []
prefered_matching_words_b  = []

matching_words_d  = []
prefered_matching_words_d  = []

final_web_front_end_words = ""              # variables to hold words for each class 
final_mobile_front_end_words = ""           
final_back_end_words = ""
final_database_words = ""

@api.route('/getPreferredTechPercentages',methods=['GET', 'POST'])
def getPreferredTechnologyPercentages():
    if request.method == 'POST':
        global final_web_front_end_words        # global variables holding the tokenzied words for each class 
        global final_mobile_front_end_words
        global final_back_end_words
        global final_database_words

        global matching_words_wf                # global arrays to hold matching words  and common words 
        global prefered_matching_words_wf
        global matching_words_mf
        global prefered_matching_words_mf
        global matching_words_b
        global prefered_matching_words_b
        global matching_words_d
        global prefered_matching_words_d

        matching_words_wf = []                  # resetting the arrays 
        prefered_matching_words_wf = []
        matching_words_mf = []
        prefered_matching_words_mf = []
        matching_words_b = []
        prefered_matching_words_b = []
        matching_words_d = []
        prefered_matching_words_d = []

        final_web_front_end_words    = word_tokenize(final_web_front_end)           # tokenzing words in each class 
        final_mobile_front_end_words = word_tokenize(final_mobile_front_end)
        final_back_end_words         = word_tokenize(final_web_backend)
        final_database_words         = word_tokenize(final_database)

        preferredFrontendWebTech    = request.json['preferredFrontendWebTech']      # getting the preferred technologies from the frontend
        preferredFrontendMobileTech = request.json['preferredFrontendMobileTech']
        preferredBackendTech        = request.json['preferredBackendTech']
        preferredDatabaseTech       = request.json['preferredDatabaseTech']

        check_matching_words_web_frontend()                                         # calling methods checking matching words in each class  
        check_matching_words_mobile_frontend()
        check_matching_words_backend()
        check_matching_words_database()
        check_for_preferred_matching_web_frontend(preferredFrontendWebTech)         # calling methods to get matching words between predicted and preferred technologies 
        check_for_preferred_matching_mobile_frontend(preferredFrontendMobileTech)
        check_for_preferred_matching_backend(preferredBackendTech)
        check_for_preferred_matching_database(preferredDatabaseTech)

        preferred_percentage_wf = 0                 # initalising the percentage 
        if len(matching_words_wf) == 0:             # when 
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