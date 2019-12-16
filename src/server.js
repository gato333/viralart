import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'

const app = express();
const hostname = 'localhost';
const port = 6660;

app.use(rawBody);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

var server = app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function rawBody(req, res, next) {
	if(req.headers['content-type'] != 'application/json'){
	  req.setEncoding('utf8');
	  req.rawBody = '';
	  req.on('data', function(chunk) {
	    req.rawBody += chunk;
	  });
	  req.on('end', function(){
	    next();
	  });
	} else next();
}

const validFiles = [ '/favicon.ico', '/main.js', '/main.js.map', '/styles.css',
	'/styles.css.map', '/server.bundle.js.map', '/server.bundle.js'];

app.get( "/*", (req, res) => {
	if( validFiles.includes(req.url) || /.(jpg|png)$/.test(req.url) )
		return res.status(200).sendFile(path.join(__dirname + req.url))
	else
		return res.status(200).sendFile(path.join(__dirname + '/index.html'));
});