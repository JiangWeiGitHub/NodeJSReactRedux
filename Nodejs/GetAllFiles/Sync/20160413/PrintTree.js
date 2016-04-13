/*
Create a tree with movie\music\pic files which have uuid & owner.

Result like:

Files & Folders Tree:

./mnt
|-- 1
|   `-- 12.txt
|-- 11.txt
|-- 2
|   `-- 6
|-- Movie.wmv
|-- Music.mp3
`-- Pic.jpg

3 directories, 5 files
*/

var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;

var cmdStr = '';
var data = '';
var root = '';
var root_uuid = '';

function traversalFiles(uuid, path, type)
{
	var parent_uuid = '';

	if(uuid !== root_uuid)
	{
                var obj = JSON.parse(data);

                for(var i in obj)
                {
			if(obj[i].uuid === uuid)
			{
				parent_uuid = obj[i].parent;

				break;
			}			
		}

		for(var j in obj)
		{
			if(obj[j].uuid === parent_uuid)
			{
				path = '/' + obj[j].attribute.name + path;
				traversalFiles(obj[j].uuid, path, type);

				break;
			}
		}	
	}
	else
	{
                if(type === 'folder')
                {
                        cmdStr = 'mkdir -p .' + path;
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Mkdir Folder Error!');
                                }
                        });
		}
		else
		{
                        cmdStr = 'touch .' + path;
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Touch File Error!');
                                }
                        });
		}
	}
}

exports.traversalFiles = traversalFiles;

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
                                        root = obj[i].attribute.name;
					root_uuid = obj[i].uuid;

		                        cmdStr = 'rm -rf ./' + root;
		                        exec(cmdStr, function(err){
		                                if(err) {
		                                        console.log('Rm root Error!');
		                                }
		                        });
                                }

				break;				
                        }

                        for(var i in obj)
                        {
				traversalFiles(obj[i].uuid, '/' + obj[i].attribute.name, obj[i].type);			
                        }

                       
                        cmdStr = 'cp /trynode/Movie.wmv ./' + root;
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Cp File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.uuid -v "5dfdbd62-b864-4824-9f7c-6c3cd8bf0d7e" "./' + root + '/Movie.wmv"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Setfattr File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.owner -v "c31a2e99-987d-4f65-9559-22e22ff603da" "./' + root + '/Movie.wmv"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Setfattr File Error!');
                                }
                        });

                        cmdStr = 'cp /trynode/Music.mp3 ./' + root;
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('aCp File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.uuid -v "892a1943-33bd-4b7d-ae59-ec9d3d2a8094" "./' + root +'/Music.mp3"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('aSetfattr File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.owner -v "c31a2e99-987d-4f65-9559-22e22ff603da" "./' + root +'/Music.mp3"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('aSetfattr File Error!');
                                }
                        });

                        cmdStr = 'cp /trynode/Pic.jpg ./' + root;
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Cp File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.uuid -v "3e04af9e-4148-45ad-a60d-fbbe32d000f7" "./' + root + '/Pic.jpg"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Setfattr File Error!');
                                }
                        });

                        cmdStr = 'setfattr -n user.owner -v "c31a2e99-987d-4f65-9559-22e22ff603da" "./' + root + '/Pic.jpg"';
                        exec(cmdStr, function(err){
                                if(err) {
                                        console.log('Setfattr File Error!');
                                }
                        });
                        

                        cmdStr = 'tree ./' + root;
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

var tmp = geAllFiles('192.168.5.132', 80, '/files', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiYzMxYTJlOTktOTg3ZC00ZjY1LTk1NTktMjJlMjJmZjYwM2RhIn0.C7j5pmnGXSr2ZB2NTHJHMNw2HGDrZlmgXbNa-TtSUoU');
