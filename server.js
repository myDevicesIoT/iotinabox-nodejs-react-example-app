const express = require('express');
const next = require('next');
const request = require('request');
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


const secrets = require('./secrets.json');

var postData = {
    'grant_type': 'authorization_code',
    'client_id': secrets['client_id'],
    'client_secret': secrets['client_secret'],
    'scope': 'offline_access',
    'redirect_uri': 'http://localhost:3000/auth/cb'
};
var tokenData = {};
const tokenUrl = "https://auth.mydevices.com/auth/realms/iotinabox/protocol/openid-connect/token";

app.prepare()
.then(() => {
  const server = express();

  server.get('/auth/cb/', (req, res) => {
    postData['code'] = req.query.code;
    tokenRequest = request({
      method: 'POST',
      url: tokenUrl,
      form: postData
    }, function(error, response, body) {
      var data = JSON.parse(body);
      tokenData["access_token"] = data.access_token;
      tokenData["refresh_token"] = data.refresh_token;
    });
    const actualPage = '/content';
    const queryParams = {};
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/companies', (req, res) => {
    const actualPage = '/content';
    const queryParams = {};
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/locations', (req, res) => {
    const actualPage = '/content';
    const queryParams = {
      companyId: req.query.companyId
    };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/sensors', (req, res) => {
    const actualPage = '/content';
    const queryParams = { 
      companyId: req.query.companyId,
      locationId: req.query.locationId
    };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/latest', (req, res) => {
    const actualPage = '/content';
    const queryParams = {
      companyId: req.query.companyId,
      locationId: req.query.locationId,
      deviceId: req.query.deviceId
    };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/data', (req, res) => {
    console.log("sending data...");
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tokenData));
  });
    
  server.get('*', (req, res) => {
    return handle(req, res);
  });
    
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});