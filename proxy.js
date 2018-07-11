const express = require('express')
const app = express()
const httpProxy = require('http-proxy')

const PROXY_PORT = (process.env.PROXY_PORT === undefined ? 2000 : process.env.PROXY_PORT);
const API_PORT = 2001;
const APP_PORT = 2002;

var proxy = httpProxy.createProxyServer({});

function performProxy(req, res, target) {
    proxy.web(req, res, { target: target },
        (err) => {
            res.status(500).send('<h1>OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</h1>');
        }
    );
}

app.all("/api/*", function(req, res) {
    req.url = '/' + req.url.split('/').slice(2).join('/');
    console.log("Proxying API-call: " + req.url)
    performProxy(req, res, "http://localhost:"+API_PORT);
});

app.all("/*", function(req, res) {
    console.log("Proxying app-call: " + req.url);
    performProxy(req, res, "http://localhost:"+APP_PORT);
});

app.listen(PROXY_PORT, () => console.log('Example app listening on port '+PROXY_PORT+'!'))
