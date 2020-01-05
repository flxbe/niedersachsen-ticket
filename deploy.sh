#! /bin/bash

SSH_USERNAME_HOST=codegewerk@codegewerk.lima-ssh.de
APP_DIR_NAME=niedersachsen-ticket
TEMP_DIR=tmp

mkdir $TEMP_DIR/
mkdir $TEMP_DIR/server/
cp server/index.php $TEMP_DIR/server/
cp index.html $TEMP_DIR/
cp style.css $TEMP_DIR/
cp index.js $TEMP_DIR/
cp ticket.js $TEMP_DIR/
cp server.js $TEMP_DIR/
cp header.jpg $TEMP_DIR/
cp -R icons/ $TEMP_DIR/icons/
cp -R img/ $TEMP_DIR/img/
cp env.prod.js $TEMP_DIR/env.js
cp env.prod.php $TEMP_DIR/env.php

# transfer data to server
scp -r $TEMP_DIR/ $SSH_USERNAME_HOST:

rm -R $TEMP_DIR/

# get existing data
ssh $SSH_USERNAME_HOST cp $APP_DIR_NAME/server/data.csv $TEMP_DIR/server/

ssh $SSH_USERNAME_HOST rm -R $APP_DIR_NAME/
ssh $SSH_USERNAME_HOST mv $TEMP_DIR/ $APP_DIR_NAME/