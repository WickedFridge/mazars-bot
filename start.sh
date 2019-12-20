#! /bin/bash

PROJECT_NAME="mazars-bot"
PM2CONF_FILE="pm2.ecosystem.config.js"
PM2CONF_FILE_PROD="pm2.ecosystem.config.prod.js"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
DIRECTORIES=(botcore lms nlu connectors common)

# install pm2 if not already installed
if [[ `npm list -g | grep -c pm2` -eq 0 ]]; then
    sudo npm install -g pm2
else
    pm2 delete all
fi

for dir in ${DIRECTORIES[*]}; do
    cd $dir
    if [ ! -d "node_modules" ]; then
        echo -e "installing dependencies for package ${GREEN}$dir${NC}"
        npm install
    fi
    cd ..
done



pm2 list | grep -w $PROJECT_NAME

if [[ $? -eq 0 ]]; then
  pm2 delete $PROJECT_NAME
fi

while true; do
    read -p "Which env do you want to start (local/prod) ? " MODE
    case $MODE in
        local|prod* ) pm2 start $PM2CONF_FILE --env MODE; break;;
        * ) echo "Please answer local or prod.";;
    esac
done

printf "\n"
echo -e "${GREEN}Starting the application in $MODE mode ${NC}"
echo -e "Run ${GREEN}pm2 status${NC} to check that everything is running."
echo -e "Run ${GREEN}pm2 logs${NC} to check the logs."
echo -e "Run ${GREEN}pm2 log${RED}<id>${NC} to get the logs of each component."
