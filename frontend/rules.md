##Rules to Folow##
 - Rule 1: Never checkout/switch to main branch. (use git branch to see current working branch)
 - Rule 2: while pushing the code, use: git push origin backend (for frontend: git push origin frontend)
 - Rule 3: After every merge run refresh.sh or use 'git pull origin main' without changing branch
 - Rule 4: Don't create new branches, if you want to see frontend (git checkout frontend). 
If it says no branch named frontend(for one time use this: git switch frontend, afterwards use git checkout frontend)
 - Rule 5: for add, commit and push you can run git.sh as well, or run commands manually.

#git.sh usage#
 - For add and commit, -> ./git.sh "commit message"
 - For add, commit and push or only push -> ./git.sh "commit message" -p
