#!/usr/bin/python
import pyudev
import pasori_listen


#---
#bind
#MODEL  : 06c3 -> None
#VENDOR : 054c -> Sony Corp.
#SERIAL : 0852292 -> SONY_RC-S380_P_0852292
#---

context = pyudev.Context()

monitor = pyudev.Monitor.from_netlink(context)
monitor.filter_by(subsystem='usb')
monitor.start()

for device in iter(monitor.poll, None):

    print(device.action)
    if device.action == 'bind':
        print('MODEL  : {0} -> {1}'.format(device.get('ID_MODEL_ID'), device.get('ID_MODEL_FROM_DATABASE')))
        print('VENDOR : {0} -> {1}'.format(device.get('ID_VENDOR_ID'), device.get('ID_VENDOR_FROM_DATABASE')))
        print('SERIAL : {0} -> {1}'.format(device.get('ID_SERIAL_SHORT'), device.get('ID_SERIAL')))
        print('---')
