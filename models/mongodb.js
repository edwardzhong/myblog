var mongoose = require('mongoose');
var log=require('../log').logger;
var config=require('../config.js');
mongoose.connect(config.connectString);

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to %s error: ', config.connectString, err.message);
    log.info('connect to %s error: ', config.connectString, err.message);
    process.exit(1);
});
db.once('open', function () {
    log.info('%s has been connected.', config.connectString);
});

module.exports = mongoose;