#!/usr/bin/env bash

brew cask install caskroom/versions/java8
brew cask install android-sdk

# DO NOT DISTURB - OFFLOAD TO NPM SCRIPTS AND OTHER SHELLS WHERE POSSIBLE
export ANDROID_SDK_ROOT="/usr/local/share/android-sdk"
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
