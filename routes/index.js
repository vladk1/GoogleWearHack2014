// store list of presentations which include what is the title and its current slide
// default to 2 presentations, demo & my presentation
// the list is loaded from config file under config/index.js
var presentations = {};

var fullAddress;
var curAddress;
var curPort;

var globalSocket;

var demoPpt = function(req, res){
	console.log("not that bad");
	res.render('demo', { title: 'Demo Presentation' })
};

var myPpt = function(req, res){
	console.log("not that bad");
  res.render('newmyppt', { title: 'My Presentation' })
};


var controllerRoute = function(req, res){
	console.log("not that bad");
  res.render('controller', { title: 'Remote Presentation Controller', layout: "controller_layout" })
};

var controlIpAddress = function(req, res) {
	res.render({msg:'hello word!'});
}

exports.informCurrentAddress = function(fullAddr, address, port) {
	fullAddress = fullAddr;
	curAddress = address;
	curPort = port;
}

exports.setupRemotePresenter = function(app, io, config){

	presentations = config.presentations; // load initial presentation list from config file

	app.get('/myppt', myPpt);
		
	app.get('/controller', controllerRoute);


	app.get('/getCurrentAddress', function(request, response){
			// var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
			console.log("request.connection="+request.connection);

			 var ipAddr = request.headers["x-forwarded-for"];
			 if (ipAddr){
			    var list = ipAddr.split(",");
			    ipAddr = list[list.length-1];
			 } else {
			    ipAddr = request.connection.remoteAddress;
			 }

			// fullAddress = window.location.hostname;
			var json = {"fullAddress":fullAddress,"curAddress":ipAddr,"curPort":curPort};
			console.log(json);      // your JSON
			response.send(json);    // echo the result back
	});

//{"args":["up"],"name":"command"}
	app.get('/up_myppt', function(request, response) {
		// response.render('myppt', { title: 'My Presentation' });
		console.log("it is up");
		// var curppt = presentations["myppt"];
		// curppt.indexv--;
		// updateSlide(curppt);
		// globalSocket.broadcast.emit('updatedata', curppt);
		
		response.render('myppt', { title: 'My Presentation' });
		processSlideChangeRequest("up");
	});

	app.get('/down_myppt', function(request, response) {
		// response.render('myppt', { title: 'My Presentation' });
		// socket.broadcast.emit('command', "up");
		console.log("it is down");
		// var curppt = presentations["myppt"];
		// curppt.indexv++;
		// updateSlide(curppt);
		// globalSocket.broadcast.emit('updatedata', curppt);
		
		response.render('myppt', { title: 'My Presentation' });
		processSlideChangeRequest("down");
	});

	app.get('/left_myppt', function(request, response) {
		// response.render('myppt', { title: 'My Presentation' });
		console.log("it is left");
		// var curppt = presentations["myppt"];
		// curppt.indexh--;
		// updateSlide(curppt);
		// globalSocket.broadcast.emit('updatedata', curppt);
		
		response.render('myppt', { title: 'My Presentation' });
		processSlideChangeRequest("left");
	});

	app.get('/right_myppt', function(request, response) {
		console.log("it is right");
		// response.render('myppt', { title: 'My Presentation' });
		// var curppt = presentations["myppt"];
		// curppt.indexh++;
		// updateSlide(curppt);
		// globalSocket.broadcast.emit('updatedata', curppt);
		
		response.render('myppt', { title: 'My Presentation' });
		processSlideChangeRequest("right");
	});


  		
	
	// setup remote control here
	// socket.io setup
	io.sockets.on('connection', function (socket) {

		globalSocket = socket;

		// once connected need to broadcast the cur slide data
		 globalSocket.on('request_presentation', function(data){
		 	if(presentations[data.id])
		 	{
		 		console.log('sending init presentation data ' + JSON.stringify(presentations[data.id]) );
		 		socket.emit('initdata', presentations[data.id]);
		 	}
		 });

		 globalSocket.on('updatedata', function(data) {
				console.log("updatedata: " + JSON.stringify(data) );
				
				// if(data.id == presentation_id)
				// {
					// go to the respective slide
					Reveal.navigateTo(data.indexh, data.indexv);
				// }
		});
		
		
		// send commands to make slide go previous/ next/etc
		// this should be triggered from the remote controller
		globalSocket.on('command', function(command) {
			console.log("command " + JSON.stringify(data) );
			processSlideChangeRequest(command);
			
		});
		
	});	


function processSlideChangeRequest(command) {
	console.log("receive command " + JSON.stringify(command) );
			// window.alert("sometext");
			// TODO: future might need a way to tell how many slides there are

			// var pptId = command.id;  // powerpoint id
			// var cmd = command.txt;   // command can be 'up', 'down', 'left', 'right'
			// console.log("pptId= "+pptId);
			// console.log("cmd= "+cmd);

				if (command === "up") {
					console.log("it is uuuup");

					var curppt = presentations["myppt"];
					curppt.indexv--;
					updateSlide(curppt);
					globalSocket.broadcast.emit('updatedata', curppt);
					
				} else if (command === "down") {
					console.log("it is down");
					var curppt = presentations["myppt"];
					curppt.indexv++;
					updateSlide(curppt);
					globalSocket.broadcast.emit('updatedata', curppt);

				} else if (command === "left") {
					console.log("it is left");
					var curppt = presentations["myppt"];
					curppt.indexh--;
					updateSlide(curppt);
					globalSocket.broadcast.emit('updatedata', curppt);

				} else if (command === "right") {
					console.log("it is right");
					var curppt = presentations["myppt"];
					curppt.indexh++;
					updateSlide(curppt);
					globalSocket.broadcast.emit('updatedata', curppt);
				}

			
			// if(presentations[pptId]) {
			// 	var curppt = presentations[pptId];
			// 	// update ppt information

			// 	if(cmd === 'up') {
			// 		curppt.indexv--;
			// 	} else if(cmd === 'down') {
			// 		curppt.indexv++;
			// 	} else if(cmd === 'left') {
			// 		curppt.indexh--;
			// 	} else if(cmd === 'right') {
			// 		curppt.indexh++;
			// 	}
				
			// 	if(curppt.indexh < 0 ) {
			// 		curppt.indexh = 0;
			// 	}

			// 	if(curppt.indexh > 4 ) {
			// 		curppt.indexh = 4;
			// 	}
					
			// 	if(curppt.indexv < 0 ) {
			// 		curppt.indexv = 0;
			// 	}

			// 	if(curppt.indexv > 4 ) {
			// 		curppt.indexh = 4;
			// 	}
				
			// 	presentations[pptId] = curppt;
				
			// 	// send the new data for update
			// 	globalSocket.broadcast.emit('updatedata', curppt);
			// }
		
		
}


function updateSlide(curppt) {
	console.log("updateSlide with curppt.indexh="+curppt.indexh+" curppt.indexv="+curppt.indexv);
	if(curppt.indexh < 0 ) {
			curppt.indexh = 0;
	}

	if(curppt.indexv < 0 ) {
	    curppt.indexv = 0;
	}
		
    presentations["myppt"] = curppt;
}


};