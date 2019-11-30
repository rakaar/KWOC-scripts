import json
import time
# import requests
import sys
x = json.load(open("dat.json", "r"))['data']


from github import Github


g = Github("ur_github_username", "ur_password")
new_data = []
for y in x:
    link = y['link']
    if(link[-1] == '/'): #those who have the link as 'https://xyz..xyz/'
        link = link[:-1]
    if(link[-4:] == '.git'): #those who have the link as 'https://xyz..xyz.git'
        link = link[:-4]
    try:
        repo_name = link.split('/')[-2]+'/'+link.split('/')[-1] # like 'rakaar/to-do-list'
    except:
        print(y['link'])
        continue
    try:
        repo = g.get_repo(repo_name)
    except:
        print(y['link'])
        continue    
    try:
        y['tag'] = repo.get_topics()
    except:
        y['tag'] = []
    try:
        y['intro_full'] = repo.description
    except:
        y['intro_full'] = y['intro'] 
    y = json.dumps(y)
    # print(y)
    new_data.append(y)
print(new_data)











    # try:
    #     y['tag'] = json.loads(requests.get(y['link'].replace("github.com", "api.github.com/repos") + "/topics", headers={"Accept": "application/vnd.github.mercy-preview+json", "Authorization": "token 5145411fb4bcb9b3001e839554fbf6ffed3191de"}).text)['names']
    # except:
    #     y['tag'] = []
    # try:
    #     y['intro_full'] = json.loads(requests.get(y['link'].replace("github.com", "api.github.com/repos"),  headers={"Accept": "application/vnd.github.mercy-preview+json", "Authorization": "token 5145411fb4bcb9b3001e839554fbf6ffed3191de"}).text)['description']
    # except:
    #     y['intro_full'] = ""
    # print(y)
    