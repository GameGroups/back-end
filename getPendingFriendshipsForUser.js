const vandium = require('vandium');
var mysql = require('mysql');

const connection  = mysql.createConnection({
    host     : 'firstdbinstance.cfxhhl0pytex.us-east-2.rds.amazonaws.com',
    user     : 'firstmaster',
    password : 'firstpass',
    database : 'gamegroups'
  });

  exports.handler = vandium.generic().handler = (event, context, callback) => {
    
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'SELECT * FROM gamegroups.friendships WHERE friendTwo = '+connection.escape(event.userId)+' AND isActive = 0';
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };