const { PORT } = require('../webApp/env')();
const debug = require('debug')('express:www');
const debugEvent = require('../utils/eventsWebApp')
const http = require('http');

module.exports = (client) => {
    const app = require('../webApp/app')(client);
    let port = PORT | 5000
    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port, () => {
        debugEvent.emit('debug', `listening on ${port}`);
    });
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    }
}
