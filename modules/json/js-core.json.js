/* js-core JSON module, version 0.1
 * Copyright (c) 2009 Vlad Zaritovsky
 * 
 * Based on jQuery JSON Plugin (c) Brantley Harris
 * version: 2.1 (2009-08-14)
 * 
 * 
 * Using: 
 			var thing = {plugin: 'js-core-json', version: 0.1};
			var encoded = $.json.toJSON(thing);
			var name = $.json.evalJSON(encoded).plugin;
			var version = $.json.evalJSON(encoded).version;
			alert('Encoded: '+encoded);
			alert('Name: '+name);
			alert('Version: '+version);
 */
core.json = {
	_escapeable: /["\\\x00-\x1f\x7f-\x9f]/g,
	_meta: {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"' : '\\"',
		"\\": "\\\\"
	},
	_typeOf: function(o) {
		return Object.prototype.toString.call(o).slice(8, - 1).toLowerCase();
	},
	toJSON: function(o) {
		if(typeof JSON != "undefined" && JSON.stringify) {
			return JSON.stringify(o);
		}
		if(o === null) {
			return "null";
		}
		if(typeof o == "undefined") {
			return;
		}
		var type = this._typeOf(o), result, j;
		switch(type) {
			case "number": case "boolean":
				result = o.toString();
			break;
			case "string":
				result = this.quoteString(o);
			break;
			case "date":
				var month = o.getUTCMonth() + 1;
				if(month < 10) {
					month = "0" + month;
				}
				var day = o.getUTCDate();
				if(day < 10) {
					day = "0" + day;
				}
				var year = o.getUTCFullYear();
				var hours = o.getUTCHours();
				if(hours < 10) {
					hours = "0" + hours;
				}
				var minutes = o.getUTCMinutes();
				if(minutes < 10) {
					minutes = "0" + minutes;
				}
				var seconds = o.getUTCSeconds();
				if(seconds < 10) {
					seconds = "0" + seconds;
				}
				var milli = o.getUTCMilliseconds();
				if(milli < 100) {
					milli = "0" + milli;
				}
				if(milli < 10) {
					milli = "0" + milli;
				}
				result = '"' + year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milli + 'Z"'; 
			break;
			case "array":
				var i = -1, length = o.length;
				result = [];
				j = 0;
				while(++i < length) {
					result[j++] = this.toJSON(o[i]) || "null";
				}
				result = "[" + result.join(",") + "]";
			break;
			case "object":
				var value;
				result = [];
				j = 0;
				for(var key in o) {
					if(o.hasOwnProperty(key)) {
						value = this.toJSON(o[key]);
						if(typeof value != "undefined") {
							result[j++] = this.quoteString(key)+ ":" + value;
						}
					}
				}
				result = "{" + result.join(",") + "}";
			break;
		}
		return result;
	},
	evalJSON: function(src) {
		if(typeof JSON != "undefined" && JSON.parse) {
			return JSON.parse(src);
		}
		// todo Dmitry Избавиться от eval, вынести в общий функционал.
		return eval("(" + src + ")");
	},
	secureEvalJSON: function(src) {
		if(typeof JSON != "undefined" && JSON.parse) {
			return JSON.parse(src);
		}
		var filtered = src;
		filtered = filtered.replace(/\\["\\\/bfnrtu]/g, "@");
		filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
		filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
		if(/^[\],:{}\s]*$/.test(filtered)) {
			return eval("(" + src + ")");
		} else {
			throw new SyntaxError("Error parsing JSON, source is not valid.");
		}
	},
	quoteString: function(string) {
		if(string.match(this._escapeable)) {
			return '"' + string.replace(this._escapeable, function(a) {
				var c = this._meta[a];
				if(typeof c == "string") {
					return c;
				}
				c = a.charCodeAt();
				return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + string + '"';
	}
};