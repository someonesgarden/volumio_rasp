# volumio_rasp

## program files are in :
/volumio/myapp

## should be automatically loaded by nohup.


## Raspberry Pi 起動時に呼ばれるようにする
vim /usr/local/bin/bot.sh
ここに以下のように、gpioToVolumio.jsをnohupで自動起動し、
USBの接続用に、/volumio/myapp/pyudev_app.pyも自動起動しておく。

```
echo "start!"
 # powermate controlling
 nohup node  /volumio/myapp/gpioToVolumio.js &
 
 # pasori  actions to volumio : detecting USB connection first
 /volumio/myapp/pyudev_app.py  &
 ```

