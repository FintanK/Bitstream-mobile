#!/usr/bin/env bash

npm run install:all

./bash/addAllPlatforms.sh

npm run build:full

# Copy angular static files to IPFS public folder
cp -rf angular-client/dist ipfs-public

# Publish all executables and save
npm run ipfs:compile

# Build a new docker image for the app - used for CI Builds later.

docker --version
docker-compose --version
docker-machine --version

# Publish the latest docker image

# TBD

# Last execution
npm run dev:osx
