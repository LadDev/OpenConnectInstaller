#!/bin/bash

#PASSGEN=$(openssl rand -base64 12)
#SALT=$(openssl rand -base64 48)
#
#EMAIL="service.ru@mail.ru"
#
#echo $SALT
#echo $PASSGEN
#
#sudo tee api/config.json > /dev/null <<EOF
#{
#  "email":"$EMAIL",
#  "password":"$PASSGEN",
#  "salt":"$SALT"
#}
#EOF

cd app && yarn build
cd ..
cp -r app/build/* test/
