# Sarcasm-o-meter Server

### Description
Ever wanted to measure sarcasm?
This project includes two parts:
* Server (this repo)
* Client ([https://github.com/AquiGorka/sarcasm-o-meter-client]([https://github.com/AquiGorka/sarcasm-o-meter-client))

The Server expects a webRTC enabled browser to establish a p2p connection (this is the Client app). Once the connection is established the Server renders a slider and two buttons to control the meter rendered in the Client app.

### Technologies and tools used:

* Javascript
* React
* PeerJS
* webRTC
* RGraph
* WebGL
* CSS
* HTML
* Browserify
* Reactify (for JSX)
* npm (package manager and task runner)

### Build & Run
```sh
npm install
npm run build
npm run serve 8080
```
Then open up a browser to: http://localhost:8080 and head to dist/

Don't forget to get your own PeerJS api key and add it to /src/libs/remote-device/server.js

### Demo
[http://sarcasm-o-meter-server.surge.sh/](http://sarcasm-o-meter-server.surge.sh/)