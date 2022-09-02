#!/bin/bash

# Copy the files
echo 'Copying Files'
cp -u ./dist/bundle.js ./static/js/bundle.js
cp -u ./src/templates.js ./static/js/templates.js
cp -u -r ./src/ace-builds ./static/js/ace-builds
cp -u -r ./static ./upload
cp -u index.html ./upload/index.html