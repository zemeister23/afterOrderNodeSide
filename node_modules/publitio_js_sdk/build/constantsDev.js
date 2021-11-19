"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX = exports.MIN = exports.ACTIONS = exports.API = void 0;
var API_URL = 'https://api.publit.io/v1';
if (window.LOCAL_DEV == true) var API_URL = 'https://test.publit.io/v1';
var API = {
  VERSION: '1.1.5',
  URL: API_URL
};
exports.API = API;
var ACTIONS = {
  FILE: 'file',
  WATERMARK: 'watermark'
};
exports.ACTIONS = ACTIONS;
var MIN = 0;
exports.MIN = MIN;
var MAX = 99999999;
exports.MAX = MAX;
//# sourceMappingURL=constantsDev.js.map