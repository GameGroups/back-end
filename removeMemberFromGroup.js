const vandium = require('vandium');
var mysql = require('mysql');

const connection  = mysql.createConnection({
    host     : 'firstdbinstance.cfxhhl0pytex.us-east-2.rds.amazonaws.com',
    user     : 'firstmaster',
    password : 'firstpass',
    database : 'gamegroups',
    multipleStatements : true
  });

  exports.handler = vandium.generic().handler = (event, context, callback) => {
    
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'UPDATE gamegroups.groupMembers SET isAdmin=0, isActive=0 WHERE groupMemberId='+connection.escape(event.groupMemberId);
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };