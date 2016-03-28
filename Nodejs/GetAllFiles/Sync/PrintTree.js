var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;

var cmdStr = '';
var data = '';
var root = '';

function dealRootData(data)
{
	var obj = JSON.parse(data);

	if(obj.parent === '')
	{
		root = obj.path

		cmdStr = 'rm -rf .' + root;
		exec(cmdStr, function(err){
			if(err) {
				console.log('Rm root Error!');
			}
		});

		cmdStr = 'mkdir .' + root;
		exec(cmdStr, function(err){
			if(err) {
				console.log('Mkdir root Error!');
			}
		});
	}
	else
	{
		if(obj.type === 'folder')
		{
			cmdStr = 'mkdir -p .' + obj.path;
			exec(cmdStr, function(err){
				if(err) {
					console.log('Mkdir Folder Error!');
				}
			});

		}

		if(obj.type === 'file')
		{
			cmdStr = 'touch .' + obj.path;
			exec(cmdStr, function(err){
				if(err) {
					console.log('Touch File Error!');
				}
			});

		}
	}

	for(var i in obj.children)
	{
		if (obj.children[i].length !== 0)
		{
			dealRootData(JSON.stringify(obj.children[i]));
		}
	}
}

function getDataFromGetHttpWithJWT(reqIP, reqPort, reqPath, reqJwt)
{
	data = '';

	var options = {
		hostname: reqIP,
		port: reqPort,
		path: reqPath,
		method: 'GET',
		headers: {
			'authorization':'JWT '+reqJwt
		}
	};

	var req = http.request(options, function (res) {
		res.on('data', function (chunk) {
			data += chunk;
		});

		res.on('end', function () {
			var obj = JSON.parse(data);

			if(obj.parent === '')
			{
				root = obj.path

				cmdStr = 'rm -rf .' + root;
				exec(cmdStr, function(err){
					if(err) {
						console.log('Rm root Error!');
					}
				});

				cmdStr = 'mkdir .' + root;
				exec(cmdStr, function(err){
					if(err) {
						console.log('Mkdir root Error!');
					}
				});
			}

			for(var i in obj.children)
			{
				if (obj.children[i].length !== 0)
				{
					dealRootData(JSON.stringify(obj.children[i]));
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

/* ################################################################### */

var tmp = getDataFromGetHttpWithJWT('192.168.5.189', 80, '/files', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiMzJiODQwNzAtMjM4Yy00YzYxLWJmMWQtYWI4NTFjYmMxODQxIn0.iZpJY6qE1fgy6OGYd1VoFYwBjmTxySkp2xbu2Z4jZzU');
