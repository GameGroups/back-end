const vandium = require('vandium');
var mysql = require('mysql');
var uuid = require('uuid4');

const connection  = mysql.createConnection({
    host     : 'firstdbinstance.cfxhhl0pytex.us-east-2.rds.amazonaws.com',
    user     : 'firstmaster',
    password : 'firstpass',
    database : 'gamegroups'
  });

  exports.handler = vandium.generic().handler = (event, context, callback) => {
    var groupMemberId = uuid();
    context.callbackWaitsForEmptyEventLoop = false;
    var sql = 'INSERT INTO gamegroups.groupMembers (groupMemberId, userId, groupId, isAdmin, isActive)'
    sql += 'VALUES ('+connection.escape(groupMemberId)+', '+connection.escape(event.userId)+', '+connection.escape(event.groupId)+', 0, 1)';
      connection.query(sql, function (error, results, fields) {
        results.groupMemberId = groupMemberId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };