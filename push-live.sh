#!/bin/bash
eval `ssh-agent`
ssh-add ~/.ssh/id_rsa
mv robots.txt disabled-robots.txt
# npm run build
git add .
git commit -m "$1"
git push live master
ssh root@nomadable.net