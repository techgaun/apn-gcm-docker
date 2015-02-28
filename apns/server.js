/**
 * Mock APNS server
 */
 var net = require('net');

 var HOST='0.0.0.0';
 var PORT=7777;

 // Need this option so the client doesn't close
 // the connection on sending a FIN
 var options = {allowHalfOpen:true};

 // Create a server and listen for connections
 net.createServer(options, function(sock) {

   var allData = [];

 	sock.on('data', function(data) {

 		// Keep pushing data on to a temp array
 		allData.push(data);
 	});

 	sock.on('end', function() {
 		try {
	 		// Read buffers of data, one at a time
	 		for( var i in allData ) {
	 			readBuffer(allData[i]);
	 		}

	 		sock.write('0');
 		} catch(e) {
 			sock.write('1');
 		}

 		sock.end();
 	});

 }).listen(PORT, HOST);

 console.log('Server listening on ' + HOST + ':' + PORT);

 // Parse the buffer per the APNS protocol
 var readBuffer = function(data) {

 	var offset = 0;

 	// Command byte
 	var command = data.readUInt8(offset);
 	offset++;

 	// Handle enhanced mode
 	if( command == 1 ) {
 		// Identifier
 		var id = data.readUInt32BE(offset);
 		offset += 4;

 		// Expiration
 		var expiry = data.readUInt32BE(offset);
 		offset += 4;
 	}

 	// Token length
 	var tokenLength = data.readUInt16BE(offset);
 	offset += 2;

 	// Token
 	var tempBuf = new Buffer(tokenLength);
 	data.copy(tempBuf, 0, offset, offset+tokenLength);
 	var token = tempBuf.toString();
 	offset += tokenLength;

 	// Payload length
 	var payloadLength = data.readUInt16BE(offset);
 	offset += 2;

 	// Payload
 	var pBuf = new Buffer(payloadLength);
 	data.copy(pBuf, 0, offset, offset+payloadLength);
 	var payload = pBuf.toString();
 }
