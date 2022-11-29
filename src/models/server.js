const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

// route imports
const { homeRoute, landingRoute } = require('../routes');

// controller imports
const { errorLog } = require('../controllers');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            landing: '/',
            home: '/home',
            //auth: '/auth',
        };

        this.viewEngine();
        this.middlewares();
        this.routes();
    }

    // using EJS view engine
    viewEngine() {
        this.app.set('views', (path.join(__dirname, '..', 'views', 'pages')));
        this.app.set('view engine', 'ejs');
    }

    // will add middlewares for authenticating users, tokens and more
    middlewares() { }

    // routes, basic error handling at the bottom of the stack
    // at the time of writing, home and auth route exist only to try multiple routes
    // auth and home are next to be added
    routes() {
        this.app.use(this.paths.landing, landingRoute);
        this.app.use(this.paths.home, homeRoute);
        //this.app.use(this.paths.auth, authRoute);

        //error handling at bottom of stack
        this.app.use(errorLog);
        this.app.use(function (req, res) {
            res.status(404).render('error', { errorMessage: 'It does get better than this.. (404).' });
        });
    }

    listen() {
        // create https server with self-signed certificate (we haven't made it yet)
        https
            .createServer({
                key: fs.readFileSync(path.join(__dirname, '..', '..', 'pem', 'key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '..', '..', 'pem', 'cert.pem')),
            }, this.app)
            .listen(this.port, (err) => {
                // what type of error could we get here? maybe pem-file related
                if (err) { return console.log('Something bad happened', err); }
                else { console.log('Server is running on port:', this.port); }
            });
    }
}

// export server class to be initialized in root folders index.js 
module.exports = Server;