var http = require('http');

var hehehe = [];
  
function getRootInfor(myip, myport, mypath, myjwt)
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
			var obj = JSON.parse(chunk);
			for(var i in obj.children)
			{
				console.log(obj.children[i]);
				hehehe.push(obj.children[i]);
			}

		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
	return hehehe;
	//console.log(hehehe[1]);


}

exports.getRootInfor = getRootInfor;

var tmp = getRootInfor('192.168.5.189', 80, '/files', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiMzJiODQwNzAtMjM4Yy00YzYxLWJmMWQtYWI4NTFjYmMxODQxIn0.iZpJY6qE1fgy6OGYd1VoFYwBjmTxySkp2xbu2Z4jZzU')

console.log('--------------');

for(var j in tmp)
{
    console.log(tmp[j]);
}





