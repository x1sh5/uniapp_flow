//import 


var ConnectionState;
ConnectionState["Disconnected"] = 0;
ConnectionState["Connecting"] = 1;
ConnectionState["Connected"] = 2;
ConnectionState["Disconnecting"] = 3;

var TransferFormat = {};
TransferFormat["Text"] = 1;
TransferFormat["Binary"] = 2;

var SocketClient = {};
SocketClient.socketTask= null;
`_=${Date.now()}`
