// store list of presentations which include what is the title and its current slide
// default to 2 presentations, demo & my presentation
// the list is loaded from config file under config/index.js
var presentations = {};

var demoPpt = function(req, res){
	console.log("not that bad");
	// alert("I am an alert box!");
  res.render('demo', { title: 'Demo Presentation' })
};

var myPpt = function(req, res){
	console.log("not that bad");
  res.render('myppt', { title: 'My Presentation' })
};


var controllerRoute = function(req, res){
	console.log("not that bad");
  res.render('controller', { title: 'Remote Presentation Controller', layout: "controller_layout" })
};

exports.setupRemotePresenter = function(app, config){

	presentations = config.presentations; // load initial presentation list from config file

	
	app.get('/myppt', myPpt);
	
	
	app.get('/controller', controllerRoute);
	
	
	
	// setup remote control here
	// socket.io setup
// 	io.sockets.on('connection', function (socket) {

// 		// console.log('hi');
		
// 		// once connected need to broadcast the cur slide data
// 		 socket.on('request_presentation', function(data){
// 		 	if(presentations[data.id])
// 		 	{
// 		 		console.log('sending init presentation data ' + JSON.stringify(presentations[data.id]) );
// 		 		socket.emit('initdata', presentations[data.id]);
// 		 	}
// 		 });
		
		
// 		// send commands to make slide go previous/ next/etc
// 		// this should be triggered from the remote controller
// 		socket.on('command', function(command) {
			
// 			console.log("receive command " + JSON.stringify(command) );
// 			// TODO: future might need a way to tell how many slides there are
// 			var pptId = command.id;  // powerpoint id
// 			var cmd = command.txt;   // command can be 'up', 'down', 'left', 'right'
// 			console.log("pptId= "+pptId);
// 			console.log("cmd= "+cmd);

// 				if (command === "up") {
// 					console.log("it is uuuup");

// 					var curppt = presentations["myppt"];
// 					curppt.indexv--;
// 					updateSlide(curppt);
// 					socket.broadcast.emit('updatedata', curppt);
					
// 				} else if (command === "down") {
// 					console.log("it is down");
// 					var curppt = presentations["myppt"];
// 					curppt.indexv++;
// 					updateSlide(curppt);
// 					socket.broadcast.emit('updatedata', curppt);

// 				} else if (command === "left") {
// 					console.log("it is left");
// 					var curppt = presentations["myppt"];
// 					curppt.indexh--;
// 					updateSlide(curppt);
// 					socket.broadcast.emit('updatedata', curppt);

// 				} else if (command === "right") {
// 					console.log("it is right");
// 					var curppt = presentations["myppt"];
// 					curppt.indexh++;
// 					updateSlide(curppt);
// 					socket.broadcast.emit('updatedata', curppt);
// 				}

			
// 			if(presentations[pptId]) {
// 				var curppt = presentations[pptId];
// 				// update ppt information

// 				if(cmd === 'up')
// 				{
// 					curppt.indexv--;
// 				}
// 				else if(cmd === 'down')
// 				{
// 					curppt.indexv++;
// 				}
// 				else if(cmd === 'left')
// 				{
// 					curppt.indexh--;
// 				}
// 				else if(cmd === 'right')
// 				{
// 					curppt.indexh++;
// 				}
				
// 				if(curppt.indexh < 0 )
// 					curppt.indexh = 0;

// 				if(curppt.indexh > 4 )
// 					curppt.indexh = 4;
					
// 				if(curppt.indexv < 0 )
// 					curppt.indexv = 0;

// 					if(curppt.indexv > 4 )
// 					curppt.indexh = 4;
				
// 				presentations[pptId] = curppt;
				
// 				// send the new data for update
// 				socket.broadcast.emit('updatedata', curppt);
// 			}
			
// 		});
		
// 	});	


// function updateSlide(curppt) {
// 	if(curppt.indexh < 0 )
// 			curppt.indexh = 0;

// 	if(curppt.indexv < 0 )
// 	    curppt.indexv = 0;
		
//     presentations["myppt"] = curppt;
// }


	
};