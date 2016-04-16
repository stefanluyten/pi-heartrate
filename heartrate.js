var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
console.log(peripheral.uuid);
  if(peripheral.uuid.toString()=="0022d0001273"){
	console.log("H7 found...");
  	peripheral.connect(function(error) {
    		console.log('connected to peripheral: ' + peripheral.uuid);
        	var serviceUUIDs = ["180d"];
        	var characteristicUUIDs = ["2a37"];
        	peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, characteristicUUIDs, function(error, services, characteristics){
			characteristics[0].notify(true, function(error){
            			console.log("error notify: "+error);
            			characteristics[0].on('data', function(data, isNotification){
                			console.log("Heartrate: ",data[1],"bpm");
            			});
          		});

          		characteristics[0].read( function(error, data){
            			console.log("data: "+data);
          		});
        	});
	});

  }
  else {
	console.log("Andere...");
  }
});
