#!/usr/bin/python
# import commands
import subprocess
import sys
import time

MYAPP_ADD2QUEUE='node ./myapp_addToQueue.js '+sys.argv[1] if len(sys.argv)>1 else 'node ./myapp_addToQueue.js'

#print("hello!")
proc = subprocess.Popen(MYAPP_ADD2QUEUE, shell=True)
#subprocess.Popen('gpicview hoge.jpg')
#return (commands.getoutput(MYAPP_ADD2QUEUE))

time.sleep(1)
proc.kill()
