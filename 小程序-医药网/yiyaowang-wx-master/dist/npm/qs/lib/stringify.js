"use strict";var exports=module.exports={};
var _typeof2 = require('../../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = require('./utils.js');
var formats = require('./formats.js');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = (0, _keys2.default)(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};
    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = encode ? typeof options.encoder === 'function' ? options.encoder : defaults.encoder : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = (0, _keys2.default)(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter));
    }

    return keys.join(delimiter);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJmb3JtYXRzIiwiYXJyYXlQcmVmaXhHZW5lcmF0b3JzIiwiYnJhY2tldHMiLCJwcmVmaXgiLCJpbmRpY2VzIiwia2V5IiwicmVwZWF0IiwidG9JU08iLCJEYXRlIiwicHJvdG90eXBlIiwidG9JU09TdHJpbmciLCJkZWZhdWx0cyIsImRlbGltaXRlciIsImVuY29kZSIsImVuY29kZXIiLCJzZXJpYWxpemVEYXRlIiwiZGF0ZSIsImNhbGwiLCJza2lwTnVsbHMiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJzdHJpbmdpZnkiLCJvYmplY3QiLCJnZW5lcmF0ZUFycmF5UHJlZml4IiwiZmlsdGVyIiwic29ydCIsImFsbG93RG90cyIsImZvcm1hdHRlciIsIm9iaiIsImlzQnVmZmVyIiwiU3RyaW5nIiwidmFsdWVzIiwib2JqS2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImtleXMiLCJpIiwibGVuZ3RoIiwiY29uY2F0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdHMiLCJvcHRpb25zIiwiZm9ybWF0IiwiZGVmYXVsdCIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiZm9ybWF0dGVycyIsIlR5cGVFcnJvciIsInVuZGVmaW5lZCIsImFycmF5Rm9ybWF0Iiwiam9pbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVFDLFFBQVEsU0FBUixDQUFaO0FBQ0EsSUFBSUMsVUFBVUQsUUFBUSxXQUFSLENBQWQ7O0FBRUEsSUFBSUUsd0JBQXdCO0FBQ3hCQyxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQ2hDLGVBQU9BLFNBQVMsSUFBaEI7QUFDSCxLQUh1QjtBQUl4QkMsYUFBUyxTQUFTQSxPQUFULENBQWlCRCxNQUFqQixFQUF5QkUsR0FBekIsRUFBOEI7QUFDbkMsZUFBT0YsU0FBUyxHQUFULEdBQWVFLEdBQWYsR0FBcUIsR0FBNUI7QUFDSCxLQU51QjtBQU94QkMsWUFBUSxTQUFTQSxNQUFULENBQWdCSCxNQUFoQixFQUF3QjtBQUM1QixlQUFPQSxNQUFQO0FBQ0g7QUFUdUIsQ0FBNUI7O0FBWUEsSUFBSUksUUFBUUMsS0FBS0MsU0FBTCxDQUFlQyxXQUEzQjs7QUFFQSxJQUFJQyxXQUFXO0FBQ1hDLGVBQVcsR0FEQTtBQUVYQyxZQUFRLElBRkc7QUFHWEMsYUFBU2hCLE1BQU1lLE1BSEo7QUFJWEUsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkI7QUFDeEMsZUFBT1QsTUFBTVUsSUFBTixDQUFXRCxJQUFYLENBQVA7QUFDSCxLQU5VO0FBT1hFLGVBQVcsS0FQQTtBQVFYQyx3QkFBb0I7QUFSVCxDQUFmOztBQVdBLElBQUlDLFlBQVksU0FBU0EsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkJsQixNQUEzQixFQUFtQ21CLG1CQUFuQyxFQUF3REgsa0JBQXhELEVBQTRFRCxTQUE1RSxFQUF1RkosT0FBdkYsRUFBZ0dTLE1BQWhHLEVBQXdHQyxJQUF4RyxFQUE4R0MsU0FBOUcsRUFBeUhWLGFBQXpILEVBQXdJVyxTQUF4SSxFQUFtSjtBQUMvSixRQUFJQyxNQUFNTixNQUFWO0FBQ0EsUUFBSSxPQUFPRSxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQzlCSSxjQUFNSixPQUFPcEIsTUFBUCxFQUFld0IsR0FBZixDQUFOO0FBQ0gsS0FGRCxNQUVPLElBQUlBLGVBQWVuQixJQUFuQixFQUF5QjtBQUM1Qm1CLGNBQU1aLGNBQWNZLEdBQWQsQ0FBTjtBQUNILEtBRk0sTUFFQSxJQUFJQSxRQUFRLElBQVosRUFBa0I7QUFDckIsWUFBSVIsa0JBQUosRUFBd0I7QUFDcEIsbUJBQU9MLFVBQVVBLFFBQVFYLE1BQVIsQ0FBVixHQUE0QkEsTUFBbkM7QUFDSDs7QUFFRHdCLGNBQU0sRUFBTjtBQUNIOztBQUVELFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsT0FBT0EsR0FBUCxLQUFlLFFBQTFDLElBQXNELE9BQU9BLEdBQVAsS0FBZSxTQUFyRSxJQUFrRjdCLE1BQU04QixRQUFOLENBQWVELEdBQWYsQ0FBdEYsRUFBMkc7QUFDdkcsWUFBSWIsT0FBSixFQUFhO0FBQ1QsbUJBQU8sQ0FBQ1ksVUFBVVosUUFBUVgsTUFBUixDQUFWLElBQTZCLEdBQTdCLEdBQW1DdUIsVUFBVVosUUFBUWEsR0FBUixDQUFWLENBQXBDLENBQVA7QUFDSDtBQUNELGVBQU8sQ0FBQ0QsVUFBVXZCLE1BQVYsSUFBb0IsR0FBcEIsR0FBMEJ1QixVQUFVRyxPQUFPRixHQUFQLENBQVYsQ0FBM0IsQ0FBUDtBQUNIOztBQUVELFFBQUlHLFNBQVMsRUFBYjs7QUFFQSxRQUFJLE9BQU9ILEdBQVAsS0FBZSxXQUFuQixFQUFnQztBQUM1QixlQUFPRyxNQUFQO0FBQ0g7O0FBRUQsUUFBSUMsT0FBSjtBQUNBLFFBQUlDLE1BQU1DLE9BQU4sQ0FBY1YsTUFBZCxDQUFKLEVBQTJCO0FBQ3ZCUSxrQkFBVVIsTUFBVjtBQUNILEtBRkQsTUFFTztBQUNILFlBQUlXLE9BQU8sb0JBQVlQLEdBQVosQ0FBWDtBQUNBSSxrQkFBVVAsT0FBT1UsS0FBS1YsSUFBTCxDQUFVQSxJQUFWLENBQVAsR0FBeUJVLElBQW5DO0FBQ0g7O0FBRUQsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlKLFFBQVFLLE1BQTVCLEVBQW9DLEVBQUVELENBQXRDLEVBQXlDO0FBQ3JDLFlBQUk5QixNQUFNMEIsUUFBUUksQ0FBUixDQUFWOztBQUVBLFlBQUlqQixhQUFhUyxJQUFJdEIsR0FBSixNQUFhLElBQTlCLEVBQW9DO0FBQ2hDO0FBQ0g7O0FBRUQsWUFBSTJCLE1BQU1DLE9BQU4sQ0FBY04sR0FBZCxDQUFKLEVBQXdCO0FBQ3BCRyxxQkFBU0EsT0FBT08sTUFBUCxDQUFjakIsVUFDbkJPLElBQUl0QixHQUFKLENBRG1CLEVBRW5CaUIsb0JBQW9CbkIsTUFBcEIsRUFBNEJFLEdBQTVCLENBRm1CLEVBR25CaUIsbUJBSG1CLEVBSW5CSCxrQkFKbUIsRUFLbkJELFNBTG1CLEVBTW5CSixPQU5tQixFQU9uQlMsTUFQbUIsRUFRbkJDLElBUm1CLEVBU25CQyxTQVRtQixFQVVuQlYsYUFWbUIsRUFXbkJXLFNBWG1CLENBQWQsQ0FBVDtBQWFILFNBZEQsTUFjTztBQUNISSxxQkFBU0EsT0FBT08sTUFBUCxDQUFjakIsVUFDbkJPLElBQUl0QixHQUFKLENBRG1CLEVBRW5CRixVQUFVc0IsWUFBWSxNQUFNcEIsR0FBbEIsR0FBd0IsTUFBTUEsR0FBTixHQUFZLEdBQTlDLENBRm1CLEVBR25CaUIsbUJBSG1CLEVBSW5CSCxrQkFKbUIsRUFLbkJELFNBTG1CLEVBTW5CSixPQU5tQixFQU9uQlMsTUFQbUIsRUFRbkJDLElBUm1CLEVBU25CQyxTQVRtQixFQVVuQlYsYUFWbUIsRUFXbkJXLFNBWG1CLENBQWQsQ0FBVDtBQWFIO0FBQ0o7O0FBRUQsV0FBT0ksTUFBUDtBQUNILENBMUVEOztBQTRFQVEsT0FBT0MsT0FBUCxHQUFpQixVQUFVbEIsTUFBVixFQUFrQm1CLElBQWxCLEVBQXdCO0FBQ3JDLFFBQUliLE1BQU1OLE1BQVY7QUFDQSxRQUFJb0IsVUFBVUQsUUFBUSxFQUF0QjtBQUNBLFFBQUk1QixZQUFZLE9BQU82QixRQUFRN0IsU0FBZixLQUE2QixXQUE3QixHQUEyQ0QsU0FBU0MsU0FBcEQsR0FBZ0U2QixRQUFRN0IsU0FBeEY7QUFDQSxRQUFJTyxxQkFBcUIsT0FBT3NCLFFBQVF0QixrQkFBZixLQUFzQyxTQUF0QyxHQUFrRHNCLFFBQVF0QixrQkFBMUQsR0FBK0VSLFNBQVNRLGtCQUFqSDtBQUNBLFFBQUlELFlBQVksT0FBT3VCLFFBQVF2QixTQUFmLEtBQTZCLFNBQTdCLEdBQXlDdUIsUUFBUXZCLFNBQWpELEdBQTZEUCxTQUFTTyxTQUF0RjtBQUNBLFFBQUlMLFNBQVMsT0FBTzRCLFFBQVE1QixNQUFmLEtBQTBCLFNBQTFCLEdBQXNDNEIsUUFBUTVCLE1BQTlDLEdBQXVERixTQUFTRSxNQUE3RTtBQUNBLFFBQUlDLFVBQVVELFNBQVUsT0FBTzRCLFFBQVEzQixPQUFmLEtBQTJCLFVBQTNCLEdBQXdDMkIsUUFBUTNCLE9BQWhELEdBQTBESCxTQUFTRyxPQUE3RSxHQUF3RixJQUF0RztBQUNBLFFBQUlVLE9BQU8sT0FBT2lCLFFBQVFqQixJQUFmLEtBQXdCLFVBQXhCLEdBQXFDaUIsUUFBUWpCLElBQTdDLEdBQW9ELElBQS9EO0FBQ0EsUUFBSUMsWUFBWSxPQUFPZ0IsUUFBUWhCLFNBQWYsS0FBNkIsV0FBN0IsR0FBMkMsS0FBM0MsR0FBbURnQixRQUFRaEIsU0FBM0U7QUFDQSxRQUFJVixnQkFBZ0IsT0FBTzBCLFFBQVExQixhQUFmLEtBQWlDLFVBQWpDLEdBQThDMEIsUUFBUTFCLGFBQXRELEdBQXNFSixTQUFTSSxhQUFuRztBQUNBLFFBQUksT0FBTzBCLFFBQVFDLE1BQWYsS0FBMEIsV0FBOUIsRUFBMkM7QUFDdkNELGdCQUFRQyxNQUFSLEdBQWlCMUMsUUFBUTJDLE9BQXpCO0FBQ0gsS0FGRCxNQUVPLElBQUksQ0FBQ0MsT0FBT25DLFNBQVAsQ0FBaUJvQyxjQUFqQixDQUFnQzVCLElBQWhDLENBQXFDakIsUUFBUThDLFVBQTdDLEVBQXlETCxRQUFRQyxNQUFqRSxDQUFMLEVBQStFO0FBQ2xGLGNBQU0sSUFBSUssU0FBSixDQUFjLGlDQUFkLENBQU47QUFDSDtBQUNELFFBQUlyQixZQUFZMUIsUUFBUThDLFVBQVIsQ0FBbUJMLFFBQVFDLE1BQTNCLENBQWhCO0FBQ0EsUUFBSVgsT0FBSjtBQUNBLFFBQUlSLE1BQUo7O0FBRUEsUUFBSWtCLFFBQVEzQixPQUFSLEtBQW9CLElBQXBCLElBQTRCMkIsUUFBUTNCLE9BQVIsS0FBb0JrQyxTQUFoRCxJQUE2RCxPQUFPUCxRQUFRM0IsT0FBZixLQUEyQixVQUE1RixFQUF3RztBQUNwRyxjQUFNLElBQUlpQyxTQUFKLENBQWMsK0JBQWQsQ0FBTjtBQUNIOztBQUVELFFBQUksT0FBT04sUUFBUWxCLE1BQWYsS0FBMEIsVUFBOUIsRUFBMEM7QUFDdENBLGlCQUFTa0IsUUFBUWxCLE1BQWpCO0FBQ0FJLGNBQU1KLE9BQU8sRUFBUCxFQUFXSSxHQUFYLENBQU47QUFDSCxLQUhELE1BR08sSUFBSUssTUFBTUMsT0FBTixDQUFjUSxRQUFRbEIsTUFBdEIsQ0FBSixFQUFtQztBQUN0Q0EsaUJBQVNrQixRQUFRbEIsTUFBakI7QUFDQVEsa0JBQVVSLE1BQVY7QUFDSDs7QUFFRCxRQUFJVyxPQUFPLEVBQVg7O0FBRUEsUUFBSSxRQUFPUCxHQUFQLHVEQUFPQSxHQUFQLE9BQWUsUUFBZixJQUEyQkEsUUFBUSxJQUF2QyxFQUE2QztBQUN6QyxlQUFPLEVBQVA7QUFDSDs7QUFFRCxRQUFJc0IsV0FBSjtBQUNBLFFBQUlSLFFBQVFRLFdBQVIsSUFBdUJoRCxxQkFBM0IsRUFBa0Q7QUFDOUNnRCxzQkFBY1IsUUFBUVEsV0FBdEI7QUFDSCxLQUZELE1BRU8sSUFBSSxhQUFhUixPQUFqQixFQUEwQjtBQUM3QlEsc0JBQWNSLFFBQVFyQyxPQUFSLEdBQWtCLFNBQWxCLEdBQThCLFFBQTVDO0FBQ0gsS0FGTSxNQUVBO0FBQ0g2QyxzQkFBYyxTQUFkO0FBQ0g7O0FBRUQsUUFBSTNCLHNCQUFzQnJCLHNCQUFzQmdELFdBQXRCLENBQTFCOztBQUVBLFFBQUksQ0FBQ2xCLE9BQUwsRUFBYztBQUNWQSxrQkFBVSxvQkFBWUosR0FBWixDQUFWO0FBQ0g7O0FBRUQsUUFBSUgsSUFBSixFQUFVO0FBQ05PLGdCQUFRUCxJQUFSLENBQWFBLElBQWI7QUFDSDs7QUFFRCxTQUFLLElBQUlXLElBQUksQ0FBYixFQUFnQkEsSUFBSUosUUFBUUssTUFBNUIsRUFBb0MsRUFBRUQsQ0FBdEMsRUFBeUM7QUFDckMsWUFBSTlCLE1BQU0wQixRQUFRSSxDQUFSLENBQVY7O0FBRUEsWUFBSWpCLGFBQWFTLElBQUl0QixHQUFKLE1BQWEsSUFBOUIsRUFBb0M7QUFDaEM7QUFDSDs7QUFFRDZCLGVBQU9BLEtBQUtHLE1BQUwsQ0FBWWpCLFVBQ2ZPLElBQUl0QixHQUFKLENBRGUsRUFFZkEsR0FGZSxFQUdmaUIsbUJBSGUsRUFJZkgsa0JBSmUsRUFLZkQsU0FMZSxFQU1mSixPQU5lLEVBT2ZTLE1BUGUsRUFRZkMsSUFSZSxFQVNmQyxTQVRlLEVBVWZWLGFBVmUsRUFXZlcsU0FYZSxDQUFaLENBQVA7QUFhSDs7QUFFRCxXQUFPUSxLQUFLZ0IsSUFBTCxDQUFVdEMsU0FBVixDQUFQO0FBQ0gsQ0FoRkQiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvYmplY3QsIHByZWZpeCwgZ2VuZXJhdGVBcnJheVByZWZpeCwgc3RyaWN0TnVsbEhhbmRsaW5nLCBza2lwTnVsbHMsIGVuY29kZXIsIGZpbHRlciwgc29ydCwgYWxsb3dEb3RzLCBzZXJpYWxpemVEYXRlLCBmb3JtYXR0ZXIpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciA/IGVuY29kZXIocHJlZml4KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoZW5jb2RlcihwcmVmaXgpKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaikpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlclxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXJcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgdmFyIHN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG4gICAgdmFyIHNraXBOdWxscyA9IHR5cGVvZiBvcHRpb25zLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHM7XG4gICAgdmFyIGVuY29kZSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGU7XG4gICAgdmFyIGVuY29kZXIgPSBlbmNvZGUgPyAodHlwZW9mIG9wdGlvbnMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIpIDogbnVsbDtcbiAgICB2YXIgc29ydCA9IHR5cGVvZiBvcHRpb25zLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNvcnQgOiBudWxsO1xuICAgIHZhciBhbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiBvcHRpb25zLmFsbG93RG90cztcbiAgICB2YXIgc2VyaWFsaXplRGF0ZSA9IHR5cGVvZiBvcHRpb25zLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0cy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAob3B0aW9ucy5lbmNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIGZvcm1hdHRlclxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cy5qb2luKGRlbGltaXRlcik7XG59O1xuIl19