#!/usr/bin/python
import pyudev
# import pasori_listen
import subprocess

#---
#bind
#MODEL  : 06c3 -> None
#VENDOR : 054c -> Sony Corp.
#SERIAL : 0852292 -> SONY_RC-S380_P_0852292
#---
#MODEL  : 0410 -> PowerMate
#VENDOR : 077d -> Griffin Technology
#SERIAL : None -> Griffin_Technology_Inc._Griffin_PowerMate


context = pyudev.Context()

monitor = pyudev.Monitor.from_netlink(context)
monitor.filter_by(subsystem='usb')
monitor.start()

for device in iter(monitor.poll, None):

    if device.action == 'bind':
        print("bind!")
        if device.get('ID_MODEL_ID') == '06c3' and device.get('ID_VENDOR_ID') == '054c':
            print("pasori is connected")
            subprocess.Popen('/volumio/myapp/pasori_listen.py', shell=True)
        elif device.get('ID_MODEL_ID') == '0410' and device.get('ID_VENDOR_ID') == '077d':
            print("powerMate is connected")
            subprocess.Popen('node /volumio/myapp/myapp_pm.js', shell=True)
    #print(device.action)
    #print('MODEL  : {0} -> {1}'.format(device.get('ID_MODEL_ID'), device.get('ID_MODEL_FROM_DATABASE')))
    #print('VENDOR : {0} -> {1}'.format(device.get('ID_VENDOR_ID'), device.get('ID_VENDOR_FROM_DATABASE')))
    #print('SERIAL : {0} -> {1}'.format(device.get('ID_SERIAL_SHORT'), device.get('ID_SERIAL')))
    #print('---')
