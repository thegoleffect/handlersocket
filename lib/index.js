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

HSocket.prototype.parseHostStr = function(hoststr) {
  var specifiesPort = hoststr.indexOf(":") >= 0;
  var specifiesDB = hoststr.indexOf("/") >= 0;
  var hostObj = {
    host: 'localhost',
    port: 9999,
    db: 'test'
  }
  
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