# OpenConnect VPN

OpenConnect VPN – это реализация с открытым исходным кодом протокола Cisco 
AnyConnnect VPN, который широко используется на предприятиях и в 
университетах.

Для лучшей организации VPN сервера мы рекомендуем хостинг компанию [Fofnex.com](https://fornex.com/c/fff118/)

Особенности:
- Легкий и быстрый.
- Работает на Linux и большинстве BSD-серверов.
- Совместимость с клиентом Cisco AnyConnect
- Существует клиентское программное обеспечение OpenConnect для Linux, 
macOS, Windows и OpenWRT. Для Android и iOS можно использовать клиент Cisco 
AnyConnect Client.
- Поддерживает аутентификацию по паролю и сертификату
- Поддерживает учет RADIUS.
- Поддерживает виртуальный хостинг (несколько доменов).
- Легко настраивается
- Устойчив к глубокой проверке пакетов (DPI). Основан на HTTPS, поэтому очень 
- хорошо проникает через брандмауэры.

Лучше всего подходит: Людям, которым нужно VPN-решение для обхода 
национальных брандмауэров или для управления большим количеством VPN-
пользователей, а также тем, кто не хочет жертвовать скоростью.

# Установщик OpenConnectVPN сервер
Установочный скрипт для автоматической установки и настройки OpenConnect VPN Server на Ubuntu, а также для установки панели администрирования

Для установки необходимо скачать скрипт ocserv-installer.ch
```
git clone https://github.com/LadDev/OpenConnectInstaller.git
```
далее необходимо зайти в папку со скриптом и дать ему разрешение на выполнение

```
cd OpenConnectInstaller
chmod +x ocserv-install.sh
```
и далее выполнить скрипт

```
./ocserv-install.sh
```
После того как вы запустите скрипт следуйте инструкциям которые будут предлагаться во время выполнения

После успешного выполнения установки будет создана панель администратора по адресу http://домен:10034 логин и пароль будет выведен в консоли установки. Также вы можете посмотреть логин и пароль в файле
```
api/config.json
```

![Описание изображения](screen_shot.png)


!!!Внимание!!! OpenConnect VPN использует порт 443 для соединений, если на вашем сервере работают другие проекты и используется этот порт, это может нарушить работу ваших приложений. 
Рекомендуется установка на отдельный сервер

Все настройки для установки сервера были взяты из статьи:
```url
https://www.linuxbabe.com/ubuntu/openconnect-vpn-server-ocserv-ubuntu-20-04-lets-encrypt
```
