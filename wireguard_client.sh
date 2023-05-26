#!/bin/bash

sudo apt-get install wireguard -y

read -p "Введите адрес сервер к которому следует подключиться (Endpoint в файле конфигурации): " endpoint
endpoint=${endpoint:-192.168.0.178}

read -p "Введите порт сервера (Нажмите Enter для установки значений по умолчанию 51820): " port
port=${port:-51820}


read -p "Введите локальный адрес который вам выдал сервер (Address в файле конфигурации. Пример: 10.0.0.18): " address
address=${address:-10.0.0.18}

read -p "DNS (Нажмите Enter для установки значений по умолчанию 8.8.8.8): " dns
dns=${dns:-8.8.8.8}

read -p "MTU (Нажмите Enter для установки значений по умолчанию 1420): " mtu
mtu=${mtu:-1420}

read -p "Приватный ключ (PrivateKey): " private
private=${private:-""}

read -p "Публичный ключ (PublicKey): " publick
publick=${publick:-""}


sudo tee /etc/wireguard/wg0.conf > /dev/null << EOF
[Interface]
Address = $address/32
DNS = $dns
PrivateKey = $private
MTU = $mtu

[Peer]
PublicKey = $publick
AllowedIPs = 0.0.0.0/0
Endpoint = $endpoint:$port
PersistentKeepalive = 21
EOF

sudo wg-quick up wg0

ip addr

sudo wg-quick down wg0
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
