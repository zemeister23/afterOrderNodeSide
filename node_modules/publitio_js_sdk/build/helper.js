"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helper = exports["default"] = exports.runningInNode = void 0;

var _sha = _interopRequireDefault(require("crypto-js/sha1"));

var _constants = require("./constants");

var _fetch = require("./fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import { runningInNode } from './helper'
var uint32Max = Math.pow(2, 32);
var runningInNode = typeof window === 'undefined';
exports.runningInNode = runningInNode;
var FormData = runningInNode ? require(
/* webpackExclude: /form-data$/ */
'form-data') : window.FormData;

var Helper = /*#__PURE__*/function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, [{
    key: "serialize",
    value: function serialize(obj) {
      var str = [];

      for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          str.push("".concat(encodeURIComponent(property), "=").concat(encodeURIComponent(obj[property])));
        }
      }

      return str.join('&');
    }
  }, {
    key: "mtRand",
    value: function mtRand(min, max) {
      var x = Math.random();
      return Math.floor(x * (max - min + 1)) + min;
    }
  }, {
    key: "pad",
    value: function pad(number, str) {
      return (str + Array(number).join('0')).slice(0, number);
    }
  }, {
    key: "timestamp",
    value: function timestamp() {
      if (!Date.now) {
        Date.now = function () {
          return Math.floor(new Date().getTime() / 1000);
        };
      }

      return Math.floor(Date.now() / 1000);
    }
  }, {
    key: "apiNonce",
    value: function apiNonce() {
      return this.pad(8, this.mtRand(_constants.MIN, _constants.MAX));
    }
  }, {
    key: "createUrl",
    value: function createUrl(call) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var url = arguments.length > 2 ? arguments[2] : undefined;
      var key = arguments.length > 3 ? arguments[3] : undefined;
      var secret = arguments.length > 4 ? arguments[4] : undefined;
      var version = arguments.length > 5 ? arguments[5] : undefined;
      args = this.appendArguments(args, key, secret, version);
      if (call[0] !== '/') call = '/' + call;
      return "".concat(url).concat(call, "?").concat(this.serialize(args));
    }
  }, {
    key: "callApi",
    value: function callApi(url, method) {
      return _fetch.fetchService.callApi(url, method)["catch"](function (error) {
        throw error;
      });
    }
  }, {
    key: "appendArguments",
    value: function appendArguments(args, key, secret, version) {
      args.api_nonce = this.apiNonce();
      args.api_timestamp = this.timestamp();
      args.api_key = key;
      args.api_signature = this.sign(args, secret);
      args.api_kit = "JS".concat(version);
      return args;
    }
  }, {
    key: "sign",
    value: function sign(args, secret) {
      return (0, _sha["default"])("".concat(args.api_timestamp).concat(args.api_nonce).concat(secret));
    }
  }, {
    key: "getUrlForFileCreation",
    value: function getUrlForFileCreation(action, args, url, key, secret, version) {
      if (action === 'file') {
        url = this.createUrl('/files/create', args, url, key, secret, version);
      } else if (action === 'watermark') {
        url = this.createUrl('/watermarks/create', args, url, key, secret, version);
      }

      return url;
    } // dataOrStream can be a Node Buffer, stream, or a string or Blob (or Blob subclasses such as File) in the browser.

  }, {
    key: "uploadFile",
    value: function uploadFile(dataOrStream, url) {
      return this.getDataFrom(dataOrStream).then(function (data) {
        var formData = new FormData();
        if (runningInNode) formData.append('file', data, 'file'); //node requrirement
        else formData.append('file', data); // >1gb size issue, file as name param must be off

        formData.maxDataSize = Infinity;
        formData.maxBodyLength = Infinity;
        formData.maxContentLength = Infinity;
        return _fetch.fetchService.uploadFile(formData, url);
      });
    }
  }, {
    key: "getDataFrom",
    value: function getDataFrom(dataOrStream) {
      return new Promise(function (resolve, reject) {
        if (!runningInNode || dataOrStream instanceof Buffer || typeof dataOrStream === 'string') {
          resolve(dataOrStream);
        } else {
          var data = Buffer.from([]);
          dataOrStream.on('data', function (chunk) {
            data = Buffer.concat([data, chunk]);
          });
          dataOrStream.on('end', function () {
            return resolve(Buffer.from(data));
          });
          dataOrStream.on('error', function (err) {
            return reject(err);
          });
        }
      });
    }
  }]);

  return Helper;
}();

exports["default"] = Helper;
var helper = new Helper();
exports.helper = helper;
//# sourceMappingURL=helper.js.map