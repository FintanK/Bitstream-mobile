#!/usr/bin/env bash

cd ipfs-ionic-mobile-native
set IONIC_ENV=prod
set ANDROID_HOME=

ionic cordova build android
ionic cordova build ios
