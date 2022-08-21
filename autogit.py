from email import message
import os
import time
flag = int(input("按1自動、按0立刻"))
commitMes = ""
timer = 0
if flag:
    timer = int(input("輸入間隔時間秒數 : "))
    commitMes = input("輸入commit訊息")
    while(1):
        os.system("git add .")
        if len(commitMes)==0:
            commitMes = time.ctime() + "\ auto update"
        os.system("git commit -m \"" + commitMes +"\"")
        os.system("git push -u origin main")
        time.sleep(timer)
else:
    commitMes = input("輸入commit訊息 : ")
    os.system("git add .")
    os.system("git commit -m \"" + commitMes + "\"")
    os.system("git push -u origin main")