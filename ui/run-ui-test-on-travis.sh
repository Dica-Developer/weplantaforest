#!/bin/sh

cd ui
npm install -g grunt-cli bower
npm install
bower install
grunt test
cd ..

