var _ = require('underscore');
var hs = require('node-handlersocket');

function HSocket() {
  this.connections = [];
  this._readyState = 0; //States.disconnected;
};

HSocket.prototype.connect = function(hoststr) {
  var conn = hs.connect(this.parseHostStr(hoststr));
  this.connections.push(conn);
  return conn;
};

HSocket.prototype.__defaultHostObj = {
  host: 'localhost',
  port: 9999,
  db: 'test'
}

HSocket.prototype.parseHostStr = function(hoststr) {
  if (hoststr == null || typeof hoststr == "undefined" || hoststr == "") {
    return _.clone(this.__defaultHostObj);
  }
  
  if (hoststr.indexOf("://") >= 0) {
    throw "Protocol not allowed for hoststring (for the time being)";
  }
  
  var specifiesPort = hoststr.indexOf(":") >= 0;
  var specifiesDB = hoststr.indexOf("/") >= 0;
  var hostObj = _.clone(this.__defaultHostObj);
  
  if (specifiesDB == true) {
    var h = hoststr.split('/');
    hostObj.db = h.pop();
    hoststr = h.shift();
  }
  
  if (specifiesPort == true) {
    var h = hoststr.split(":");
    hostObj.port = +(h.pop().split("/").shift());
    hoststr = h.shift();
  }
  
  hostObj.host = hoststr;
  
  return hostObj;
}

module.exports = new HSocket();