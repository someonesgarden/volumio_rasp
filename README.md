# volumio_rasp

## volumio+pasoli+node-redの設定方法
１）通常の方法で最新版のvolumioをダウンロード
https://volumio.org/get-started/

２）Raspberry PiのOSをインストールするいつもの方法でダウンロードしたvolumio(回答したimg)をインストール
```aidl
diskutil list
// SDカードがdisk2の場合
diskutil umountDisk /dev/disk2
sudo dd if=./Downloads/volumio-2.703-2020-02-15-pi.img.zip of=/dev/disk2 bs=1m
```

３）Rapsberry Piにセットし、同じLAN圏内にいる他のPCからブラウザで
http://volumio.localを叩き、必要なセットアップをする。

４）http://volumio.local/devからsshを有効にし、ターミナルで
ssh volumio@volumio.local


５）pasoli用ライブラリのインストール
```aidl
$ sudo apt-get install python-pip
$ sudo pip2 install --upgrade pip
$ sudo pip2 install nfcpy
$ pip show nfcpy
```

６）powermate用ライブラリのインストール
```aidl
sudo apt-get install libusb-1.0-0-dev
npm install node-powermate —save
```

SSH権限なしでもpowermateを支えるための設定
```aidl
sudo sh -c 'echo SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"077d\", ATTRS{idProduct}==\"0410\", SYMLINK+=\"powermate\", MODE=\"660\", GROUP=\"input\" >> /etc/udev/rules.d/95-powermate.rules'
```

７）USB接続を認識するために、pyudevを使用する
```aidl
sudo apt-get install python-pyudev
```

８）作成したオリジナルプログラムをclone
```aidl
git clone https://github.com/someonesgarden/volumio_rasp.git
```

９）cloneしたフォルダを修正する
```
mv /volumio/volumio_rasp /volumio/myapp
chmod 777 -R /volumio/myapp
```

１０) 自動起動ファイルを作成

```aidl
vim /usr/local/bin/bot.sh
```
ここに以下のように、gpioToVolumio.jsをnohupで自動起動し、
USBの接続用に、/volumio/myapp/pyudev_app.pyも自動起動しておく。

```
echo "start!"
# powermate controlling
nohup node /volumio/myapp/gpioToVolumio.js &

# pasori  actions to volumio : detecting USB connection first
/volumio/myapp/pyudev_app.py  &
 ```

１１）自動起動されるように/etc/rc.localにbot.shを追記する

/etc/rc.localのexitの最後に

```
bot.sh
```
と追加。


１２）node-redをインストール
https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10196568065
```aidl
sudo npm install -g --unsafe-perm node-red
```
自動起動するために、node.jsのプロセスマネージャをインストール。

```aidl
sudo npm install -g pm2
```

１３）node-redをバックグラウンドで動かすプロセスをpm2に登録
root権限がないと、node-redは自動起動されなかったので、
そのあたりもやる。

```aidl
sudo su
cd /root
pm2 start /bin/node-red --node-args="--max-old-space-size=128" -- -v
```
１４）起動時に実行することをPM2に指示する。
```aidl
pm2 save
pm2 startup
```

### /data/plugins/music_service/spop
この中にあるindex.jsファイルにspotify用のclientIdとclientSecretを入力する欄があるので、
ここは自分のアプリケーションIDを入れないと正常にRefreshできない。

### VOLUMIOのネットワーク情報は
/data/configuration/system_controller/network/config.json

ここにある.

