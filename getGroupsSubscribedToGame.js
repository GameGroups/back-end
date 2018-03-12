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
      
    var sql = 'SELECT groupId, groupName, groupDescription, region, skillLevel, timeCommitment, profileImage FROM gamegroups.groups ';
    sql += 'JOIN gamegroups.subscriptions ON gamegroups.groups.groupId=gamegroups.subscriptions.entityId WHERE gamegroups.subscriptions.gameId = '+connection.escape(event.gameId)+' AND gamegroups.groups.isActive = 1';
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };