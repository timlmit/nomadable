mv robots.txt disabled-robots.txt
# npm run build
git add .
git commit -m "$1"
git push live master
ssh root@nomadable.net << /Users/uzu/.ssh/id_rsa:
command Siosio0520m
/Users/uzu/.ssh/id_rsa