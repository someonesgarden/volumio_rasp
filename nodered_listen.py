#!/usr/bin/python
import binascii
import nfc
import subprocess
import sys
import time

keymap = {
    "play":"node /volumio/myapp/myapp_play.js",
    "stop":"node /volumio/myapp/myapp_stop.js",
    "prev":"node /volumio/myapp/myapp_prev.js",
    "next":"node /volumio/myapp/myapp_next.js",
    "pause":"node /volumio/myapp/myapp_pause.js",
    "replaceandplay":"node /volumio/myapp/myapp_replaceAndPlay.js"
}


if __name__ == '__main__':
    args = sys.argv

    type = args[1] if args[1] else 'stop'
    #spotify_uri= args[2] if type is 'replaceandplay' else 'spotify:album:5YuMyydKScBvKXbYii0AH3'
    spotify_uri = args[2]
    # spotify_uri = ""
    action = keymap[type]+' '+str(spotify_uri)
    proc = subprocess.Popen(action, shell=True)
    time.sleep(1)
    proc.kill()
    print(proc.pid)
