from github import Github


g = Github("rakaar", "aparna007@#")

repo = g.get_repo('grapheo12/Flask-GDrive')
print(repo.description)