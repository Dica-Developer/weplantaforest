#!/usr/bin/env bash

# exit when any command fails
set -e

# replace font urls with base href prefix '/staging'
find='assets';
replace='staging/assets';
find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +

# clean dist
rm -rf dist
# install dependencies
yarn install
# build app
yarn build --configuration=staging --base-href /staging/ --deploy-url /staging/

# undo find/replace changes
find='staging/assets';
replace='assets';
find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +

# create ui backup
ssh -oHostKeyAlgorithms=+ssh-dss ipat@iplantatree.org "rm -r iplantatree/staging.backup/*"
ssh -oHostKeyAlgorithms=+ssh-dss ipat@iplantatree.org "cp -a  iplantatree/ui/dist/staging/. iplantatree/staging.backup/ "
# clean remote folder first
ssh -oHostKeyAlgorithms=+ssh-dss ipat@iplantatree.org "rm -r iplantatree/ui/dist/staging/*"
# deploy new version to server
scp -r /home/timelean/projekte/weplantaforest/ui2022/dist/ui2022/* ipat@iplantatree.org:/home/ipat/iplantatree/ui/dist/staging

