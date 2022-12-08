#!/usr/bin/env bash

# replace font urls with base href prefix '/ui2022'
find='assets';
replace='ui2022/assets';
find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +

# clean dist
rm -rf dist
# install dependencies
yarn install
# build app
yarn build --configuration=staging --base-href /ui2022/ --deploy-url /ui2022/
# deploy to server
scp -r /home/ipat/weplantaforest/ui2022/dist/ui2022/* ipat@iplantatree.org:/home/ipat/weplantaforest/ui/dist/ui2022

# undo find/replace changes
find='ui2022/assets';
replace='assets';
find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +