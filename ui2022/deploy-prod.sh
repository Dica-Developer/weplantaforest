#!/usr/bin/env bash

# exit when any command fails
set -e

# replace font urls with base href prefix '/ui2022'
# find='assets';
# replace='ui2022/assets';
# find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
# find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +

# clean dist
rm -rf dist
# install dependencies
yarn install
# build app
yarn build --configuration=prod

# undo find/replace changes
# find='ui2022/assets';
# replace='assets';
# find src/assets/fonts/bull5/bull5.css -type f -exec sed -i "s#$find#$replace#g" {} +
# find src/assets/fonts/nbArchitect/nbArchitect.css -type f -exec sed -i "s#$find#$replace#g" {} +

# create ui backup
ssh ipat@iplantatree.org "rm -r iplantatree/ui2022.backup/*"
ssh ipat@iplantatree.org "cp -a  iplantatree/ui2022/. iplantatree/ui2022.backup/ "
# clean remote folder first
ssh ipat@iplantatree.org "rm -r iplantatree/ui2022/*"
# deploy new version to server
scp -r /home/ipat/weplantaforest/ui2022/dist/ui2022/* ipat@iplantatree.org:/home/ipat/iplantatree/ui2022

