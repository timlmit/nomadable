mv robots.txt disabled-robots.txt
git add .
git commit -m "$1"
git push live master
ssh root@nomadable.net