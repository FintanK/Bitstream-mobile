# BitStream

Anti-censorship application built using Cordova and Angular.js.

![alt text](./BitStream1.png)

- Publishes files to IPFS anonymously.
- WebTorrent Client.

Freedom of information! Feel free to fork, copy, edit etc.

## Learn about the technologies used in this app.

- https://ipfs.io/ - IPFS
- https://webtorrent.io/ - WebTorrent

## Donate

Bitcoin: 1GkFczi2q494npKgH33w9UVkM6UGe4pUea

Ethereum: 0xACBC96E4c7556dA6e78B85D6d6f0934A9Ff0d9F7

Litecoin: LdkbEPzQCnVABZzYEmVHJyM2dYJddqZcVZ


## Installation

You will need Angular CLI, Node.js and Cordova installed on your system.

In the root directory

> npm install

Under ./Angular4_CLI_Starter

> npm install

# Running the app

The root directory is a cordova project
The ./Angular4_CLI_Starter project is the Angular app.

## Running the Angular app

Under ./Angular4_CLI_Starter

> npm start

## Building for Android and IOS

In the root directory

```
cordova platform add ios
cordova platform add android
cordova build ios
cordova build android
```

You can then run emulators for Android and IOS dependencing on your OS.

```
cordova emulate ios
cordova emulate android
```