var http  = require('http'),
    fs = require('fs'),
    path = require('path'),
    mongo = require('mongoskin');

// Database Connection //
var db = mongo.db('mongodb://nerd:dork@flame.mongohq.com:27094/clear');
var nerds = db.collection('nerds');

// CREATE SERVER //
http.createServer(function(request, response) {

    if (request.headers['content-type'] == 'text/json') {
        serveMongo(request, response);
    }
    else {
        serveStaticFile(request, response);
    }


}).listen(1337, "0.0.0.0");
console.log('server is =)');

// FILE SERVER //
var serveStaticFile = function(request, response) {
        var filePath = '.' + request.url;
        if (filePath == './') filePath = './index.html';


        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        }

        console.log('serving ' + filePath + ", content type: " + contentType);

        path.exists(filePath, function(exists) {

            if (exists) {
                fs.readFile(filePath, function(error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    }
                    else {
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.end(content, 'utf-8');
                    }
                });
            }
            else {
                response.writeHead(404);
                response.end();
            }
        });
    };

// SERVICES //
var serveMongo = function(req, res) {
    var nerd = [];
    var oldmeta = {};

    console.log('data request: ' + req.url);

    if (req.url.indexOf('?') > 0) {
        if(req.url.indexOf('add-to-nerd') > 0) {
            var values = req.url.substring(req.url.indexOf('?') + 1, req.url.length);
            values = values.split("&");
            nerd.name = values[0];
            nerd.key = values[1];
            nerd.value = values[2];
            nerd.id = values[3];
        } 
        else if(req.url.indexOf('remove-from-nerd') > 0) {
            var values = req.url.substring(req.url.indexOf('?') + 1, req.url.length);
            values = values.split("&");
            nerd.id = values[0];
            // iterate over the rest, push into oldmeta object
            for (var m = 1; m < values.length; m++) {
                var key = values[m];
                 oldmeta[key] = "";  
            }
        }
        else {
            nerd.name = unescape(req.url.substring(req.url.indexOf('?') + 1, req.url.length)); 
        }
        
        req.url = req.url.substring(0, req.url.indexOf('?'));
    }

    if (req.url == '/nerd-list') {
        nerds.find({}).sort({
            name: 1
        }).toArray(function(err, items) {
            if (err) throw err;

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(items));
        });
    }
    else if (req.url == '/name') {
        console.log('serving data on nerd ' + nerd.name);
        nerds.find({
            name: nerd.name
        }).toArray(function(err, items) {
            if (err) throw err;

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(items));
        });
    }
    
    else if (req.url == '/new-nerd') {
        console.log('adding new nerd ' + nerd.name);
        nerds.insert({
            name: nerd.name
        }, function(err, result) {
            if (err) throw err;
            if (result) console.log('Nerd added!');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(result));
        });
    }
    
    else if (req.url == '/add-to-nerd') {
        console.log('adding ' + nerd.key + ' to ' + nerd.name);
        if(nerd.key != "image" && nerd.key != "website" && nerd.key != "linkedin" && nerd.key != "twitter") nerd.value = unescape(nerd.value);
        var meta = {};
        meta[nerd.key] = nerd.value;
        nerds.updateById(
            nerd.id.toString(),
            { $set : meta },
        function(err, result) {
            if (err) throw err;
            if (result) console.log('Nerd added!');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(result));
        });
    }
    
    else if (req.url == '/remove-from-nerd') {
        console.log('removing stuff from a nerd');
        
        nerds.updateById( nerd.id.toString(), { $set : oldmeta },
        function(err, result) {
            if (err) throw err;
            if (result) console.log('Nerd added!');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(result));
        });
    }

};