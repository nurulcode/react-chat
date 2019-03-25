var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var http = require('http');
const CHAT = require('./models/chat');

// let data =[];


mongoose.connect('mongodb://localhost:27017/phonebooks', { useNewUrlParser: true })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/phonebooks', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var debug = require('debug')('react-chat-server:server');

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//
//     socket.emit('message', data)
//
//     socket.on('postAdd', (item) => {
//         data.push(item)
//         socket.broadcast.emit('message', data)
//     });
//
//     socket.on('deleteData', (id) => {
//         data = data.filter(item => item.id != id)
//         socket.broadcast.emit('message', data)
//     });
//
//
// })

// io.on('connection', (socket) => {
//
//     socket.on("initial_data", () => {
//         CHAT.find({}).then((getData) => {
//             socket.emit('message', getData)
//         })
//      });
//
//     socket.on('postAdd', (item) => {
//
//         let post = new CHAT({});
//
//         post.id = item.id
//         post.name = item.name
//         post.message = item.message
//
//         post.save((err) => {
//             if (err) return console.log(err)
//             CHAT.find({}).then((getData) => {
//                 socket.broadcast.emit('message', getData)
//             })
//         })
//     });
//
//     socket.on('deleteData', (id) => {
//         CHAT.findOneAndDelete({ id : id}).then((getData) => {
//             CHAT.find({}).then((getData) => {
//                 socket.broadcast.emit('message', getData)
//             })
//         })
//     });
//
//
// })


function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}


function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = app;
