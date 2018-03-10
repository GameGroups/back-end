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
      
    var sql = 'SELECT groupMemberId, gamegroups.groups.groupId, joinDate, isAdmin, groupName, groupDescription FROM gamegroups.groupMembers ';
    sql += 'JOIN gamegroups.groups ON gamegroups.groupMembers.groupId=gamegroups.groups.groupId WHERE userId = '+connection.escape(event.userId)+' AND gamegroups.groupMembers.isActive = 1';
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };
