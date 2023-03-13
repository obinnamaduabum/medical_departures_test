'use strict';

const app = require('./dist/app');
const serverless = require('serverless-http');

module.exports.hello = serverless(app.default);