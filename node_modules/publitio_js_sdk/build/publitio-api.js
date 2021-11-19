"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publitioApi = publitioApi;
exports["default"] = void 0;

var _helper = require("./helper");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PublitioAPI = /*#__PURE__*/function () {
  function PublitioAPI(key, secret) {
    _classCallCheck(this, PublitioAPI);

    this.version = _constants.API.VERSION;
    this.url = _constants.API.URL;
    this.key = key;
    this.secret = secret;
  }

  _createClass(PublitioAPI, [{
    key: "version",
    value: function version() {
      return this.version;
    }
  }, {
    key: "call",
    value: function call(_call) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (typeof _call !== 'string') {
        throw new Error('First parameter to call must be a string');
      }

      if (typeof method !== 'string') {
        throw new Error('Second parameter to call must be a string');
      }

      var url = _helper.helper.createUrl(_call, args, this.url, this.key, this.secret, this.version);

      return _helper.helper.callApi(url, method);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(file) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!Object.values(_constants.ACTIONS).includes(action)) {
        throw new Error("Second parameter to uploadFile must be one of ".concat(Object.values(_constants.ACTIONS)));
      }

      var url = _helper.helper.getUrlForFileCreation(action, args, this.url, this.key, this.secret, this.version);

      return _helper.helper.uploadFile(file, url);
    }
  }, {
    key: "uploadRemoteFile",
    value: function uploadRemoteFile() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var url = _helper.helper.getUrlForFileCreation('file', args, this.url, this.key, this.secret, this.version);

      return _helper.helper.callApi(url, 'POST');
    }
  }, {
    key: "uploadUrlSigned",
    value: function uploadUrlSigned() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var url = _helper.helper.getUrlForFileCreation('file', args, this.url, this.key, this.secret, this.version);

      return url;
    }
  }]);

  return PublitioAPI;
}();

exports["default"] = PublitioAPI;

function publitioApi(key, secret) {
  return new PublitioAPI(key, secret);
}
//# sourceMappingURL=publitio-api.js.map