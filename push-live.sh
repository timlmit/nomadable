mv robots.txt disabled-robots.txt
# npm run build
git add .
git commit -m "$1"
git push live master
ssh root@nomadable.net
expect "'/Users/uzu/.ssh/id_rsa':"
send "$2\r"