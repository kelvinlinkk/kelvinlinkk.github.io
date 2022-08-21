from email import message
import os
os.system("git add .")
os.system("git commit -m " + input("輸入commit訊息"))
os.system("git push -u origin main")