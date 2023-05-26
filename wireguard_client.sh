#!/bin/bash

sudo apt-get install wireguard -y
sudo apt install openresolv -y

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

read -p "Диапазон подсети в которой работает OpenConnect например 10.10.10.0/24 (Нажмите Enter тогда весь трафик сервера будет направлен через WaerGuard): " allowed
allowed=${allowed:-"0.0.0.0/0"}


sudo tee /etc/wireguard/wg0.conf > /dev/null << EOF
[Interface]
Address = $address/32
DNS = $dns
PrivateKey = $private
MTU = $mtu

[Peer]
PublicKey = $publick
AllowedIPs = $allowed
Endpoint = $endpoint:$port
PersistentKeepalive = 21
EOF

sudo wg-quick up wg0

ip addr

sudo wg-quick down wg0
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0

# Путь к файлу JSON
json_file="api/config.json"

# Новые значения для полей wg_installed и wg_addr
new_wg_installed=true
new_wg_addr=$address

# Изменение полей с помощью jq и сохранение изменений во временном файле
jq '.wg_installed = $new_wg_installed | .wg_addr = $new_wg_addr' --argjson new_wg_installed "$new_wg_installed" --arg new_wg_addr "$new_wg_addr" "$json_file" > temp.json

# Переименование временного файла в исходное имя файла
cp temp.json "$json_file"

sudo wg-quick down wg0
sudo wg-quick up wg0
