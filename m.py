import json
import time
import requests
import sys
x = json.load(open("dat.json", "r"))['data']

new_data = []
print(len(x))
print(json.dumps({"data": new_data}))
for y in x:
    try:
        y['tags'] = json.loads(requests.get(y['link'].replace("github.com", "api.github.com/repos") + "/topics", headers={"Accept": "application/vnd.github.mercy-preview+json", "Authorization": "token 5145411fb4bcb9b3001e839554fbf6ffed3191de"}).text)['names']
    except:
        y['tags'] = []
    try:
        y['intro_full'] = json.loads(requests.get(y['link'].replace("github.com", "api.github.com/repos",  headers={"Accept": "application/vnd.github.mercy-preview+json", "Authorization": "token 5145411fb4bcb9b3001e839554fbf6ffed3191de"}).text)['description']
    except:
        y['intro_full'] = ""
    print(y)
    time.sleep(1)