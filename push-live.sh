mv robots.txt disabled-robots.txt
git add .
git commit -m "$1"
git push live master
ssh root@178.62.37.46