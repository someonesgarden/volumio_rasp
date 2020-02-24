#!/usr/bin/python
import binascii
import nfc
import subprocess
import sys
import time

import urllib
import json
import codecs

keymap = {
    "012e4cd44ad95a5a":"node /volumio/myapp/myapp_play.js",
    "012e4cd44ad97e39":"node /volumio/myapp/myapp_stop.js",
    "012e4cd44ad96599":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:playlist:37i9dQZF1DWWQRwui0ExPn",
    "012e4cd44ad98e62":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:artist:6AjXxPL8C44rc1yJdi6RZB",
    "012e4cd44ad92d78":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:artist:0KyolDFb1RjJQb4qXZKCqo",
    "012e4cd44ad95826":"node /volumio/myapp/myapp_prev.js",
    "012e4cd44ad997a4":"node /volumio/myapp/myapp_next.js",
    "012e4cd44ad9865a":"node /volumio/myapp/myapp_pause.js",
    "012e4cd44ad92e3f":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:album:5YuMyydKScBvKXbYii0AH3",
    "012e4cd44ad9c269":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:artist:1tcgfoMTT1szjUeaikxRjA",
    "012e4cd44ad9a355":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:artist:0hCWVMGGQnRVfDgmhwLIxq",
    "012e4cd44ad945b5":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:track:7yRLI37uyPyG4cE49RbjVd",
    "012e4cd4864194ab":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:track:5BSswRy1QF2oB3ZnBKjfTf",
    "012e4cd44ad9b694":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:artist:3Rq3YOF9YG9YfCWD4D56RZ",
    "012e4cd44ad97cad":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:track:4ibHJaMGLp17Y9XS1wHWDL",
    "012e4cd44ad97833":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:track:2k4KivT5hRwKOK9ED43A4U",
    "012e4cd44ad98876":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:playlist:37i9dQZF1DWYWddJiPzbvb",
    "012e4cd44ad9762a":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:playlist:37i9dQZF1DWXAZbVk32w9Z",
    "012e4cd44ad94128":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:album:5Me3MeDQaYUslrMEqm0k5Y",
    "012e4cd44ad98724":"node /volumio/myapp/myapp_replaceAndPlay.js spotify:track:5lNCeyyFkvU2wLYNI9SPT3"
}


class MyCardReader(object):

    # def __init__(self):
    #     url = 'http://spotbrain.org/data/volumio/felica.json'
    #     resStr = self.dataGet(url)
    #     self.keymap = self.jsonConversion(resStr)

    def jsonConversion(self, jsonStr):
        data = json.loads(jsonStr)
        return data

    def dataGet(self,url):
        readObj = urllib.urlopen(url)
        response = readObj.read()
        return response

    def on_connect(self, tag):
        print("touched")
        self.idm = binascii.hexlify(tag.idm)
        return True

    def read_id(self):
        clf = nfc.ContactlessFrontend('usb')
        try:
            clf.connect(rdwr={'on-connect': self.on_connect})
        finally:
            clf.close()


    def call_volumio(self,id):
        proc = subprocess.Popen(keymap[id], shell=True)
        time.sleep(1)
        proc.kill()

def called():
    cr = MyCardReader()
    while True:
        print("touch card:")
        cr.read_id()
        print("released")
        print(cr.idm)
        print(cr.keymap[cr.idm])
        cr.call_volumio(cr.idm)


if __name__ == '__main__':
    called()

