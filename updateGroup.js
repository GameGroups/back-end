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
      
    var sql = 'UPDATE gamegroups.groups SET groupName = '+connection.escape(event.groupName)
        sql += ', groupDescription ='+connection.escape(event.groupDescription)
        sql += ', region ='+connection.escape(event.region)
        sql += ', skillLevel ='+connection.escape(event.skillLevel)
        sql += ', timeCommitment ='+connection.escape(event.timeCommitment)
        sql += ', profileImage ='+connection.escape(event.profileImage)
        sql += ' WHERE groupId = '+connection.escape(event.groupId);
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };