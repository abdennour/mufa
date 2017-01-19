(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/index.js');

},{"./lib/index.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Registry = require('./Registry');

var _Registry2 = _interopRequireDefault(_Registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mufawwad = function () {
  function Mufawwad() {
    _classCallCheck(this, Mufawwad);

    this.registry = new _Registry2.default();
  }

  _createClass(Mufawwad, [{
    key: 'sub',
    value: function sub(event, callback) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.registry.insert('subscriber', {
        event: event,
        callback: callback,
        once: once
      });
    }
  }, {
    key: 'pub',
    value: function pub(event, data) {
      var _this = this;

      var subsToRemove = [];
      this.registry.find('subscriber', function (record) {
        return record.event === event;
      }).forEach(function (record) {
        if (typeof record.callback === 'function') record.callback(data);
        if (record.once) subsToRemove.push(record.id);
      });

      if (subsToRemove.length) subsToRemove.forEach(function (id) {
        return _this.registry.remove('subscriber', function (record) {
          return record.id === id;
        });
      });
    }
  }, {
    key: 'on',
    value: function on() {
      return this.sub.apply(this, arguments);
    }
  }, {
    key: 'one',
    value: function one() {
      return this.sub.apply(this, Array.prototype.slice.call(arguments).concat([true]));
    }
  }, {
    key: 'fire',
    value: function fire() {
      return this.pub.apply(this, arguments);
    }
  }]);

  return Mufawwad;
}();

exports.default = Mufawwad;
},{"./Registry":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('./helper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var Registry = function (_extendableBuiltin2) {
  _inherits(Registry, _extendableBuiltin2);

  function Registry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Registry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Registry.__proto__ || Object.getPrototypeOf(Registry)).call.apply(_ref, [this].concat(args))), _this), _this.id = (0, _helper.getId)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Registry, [{
    key: 'insert',
    value: function insert(table, record) {
      var id = (0, _helper.getId)(table, table),
          updatedRecord = Object.assign(record, { id: id });
      this.push(updatedRecord);
      return updatedRecord;
    }
  }, {
    key: 'find',
    value: function find(table) {
      var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (record, i) {
        return true;
      };

      if (arguments.length === 1) return this.filter(function (record) {
        return Registry.isBelongsTo(record, table);
      });else return this.filter(function (record, i) {
        return Registry.isBelongsTo(record, table) && where(record, i);
      });
    }
  }, {
    key: 'remove',
    value: function remove(table, where) {

      if (arguments.length === 1) this.removeIf(function (record) {
        return Registry.isBelongsTo(record, table);
      });else this.removeIf(function (record, i) {
        return Registry.isBelongsTo(record, table) && where(record, i);
      });
    }
  }, {
    key: 'removeIf',
    value: function removeIf(callback) {
      var i = this.length;
      while (i--) {
        if (callback(this[i], i)) {
          this.splice(i, 1);
        }
      }
    }
  }], [{
    key: 'isBelongsTo',
    value: function isBelongsTo(record, table) {
      return record.id.startsWith(table) && record.id.endsWith(table);
    }
  }]);

  return Registry;
}(_extendableBuiltin(Array));

exports.default = Registry;
},{"./helper":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getId = exports.getId = function getId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_';
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return prefix + parseInt(Math.random() * 10E10) + Date.now() + suffix;
};
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mufawwad = require('./Mufawwad');

var _Mufawwad2 = _interopRequireDefault(_Mufawwad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mufawwad2.default;
},{"./Mufawwad":2}]},{},[1]);
