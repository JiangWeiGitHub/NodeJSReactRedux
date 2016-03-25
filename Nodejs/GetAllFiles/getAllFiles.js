var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;

var cmdStr = '';
var data = '';
var root = '';

function geAllFiles(myip, myport, mypath, myjwt)
{
	var options = {
		hostname: myip,
		port: myport,
		path: mypath,
		method: 'GET',
		headers: {
			'authorization':'JWT '+myjwt
		}
	};

	var req = http.request(options, function (res) {
		res.on('data', function (chunk) {
			data += chunk;
		});

		res.on('end', function () {
			var obj = JSON.parse(data);

			for(var i in obj)
			{
				if(obj[i].parent === '')
				{
					root = obj[i].path
				}

				cmdStr = 'rm -rf .' + root;
				exec(cmdStr, function(err){
					if(err) {
						console.log('Rm root Error!');
					}
				});
			}
			
			for(var i in obj)
			{
				if(obj[i].type === 'folder')
				{
					cmdStr = 'mkdir -p .' + obj[i].path + '_' + obj[i].uuid;
					exec(cmdStr, function(err){
						if(err) {
							console.log('Mkdir Folder Error!');
						}
					});

				}
			}

			for(var i in obj)
			{
				if(obj[i].type === 'file')
				{
					cmdStr = 'touch .' + obj[i].path + '_' + obj[i].uuid;
					exec(cmdStr, function(err){
						if(err) {
							console.log('Touch File Error!');
						}
					});

				}
			}

			cmdStr = 'tree .' + root;
			exec(cmdStr, function(err, stdout){
				console.log(`\nFiles & Folders Tree: \n\n${stdout}`);

				if(err) {
					console.log('Tree Folder Error!');
				}
			});

		});

	});

	req.on('error', function (e) {
		console.log('Problem With Request: ' + e.message);
	});

	req.end();
}

exports.geAllFiles = geAllFiles;

/* ################################################################### */

var tmp = geAllFiles('192.168.5.189', 80, '/files', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiMzJiODQwNzAtMjM4Yy00YzYxLWJmMWQtYWI4NTFjYmMxODQxIn0.iZpJY6qE1fgy6OGYd1VoFYwBjmTxySkp2xbu2Z4jZzU');
