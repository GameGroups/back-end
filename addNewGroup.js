const vandium = require('vandium');
var mysql = require('mysql');
var uuid = require('uuid4');

const connection  = mysql.createConnection({
    host     : 'firstdbinstance.cfxhhl0pytex.us-east-2.rds.amazonaws.com',
    user     : 'firstmaster',
    password : 'firstpass',
    database : 'gamegroups',
    multipleStatements : true
  });

  exports.handler = vandium.generic().handler = (event, context, callback) => {
    var groupId = uuid();
    var groupMemberId = uuid();
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'INSERT INTO gamegroups.groups (groupId, groupName, groupDescription, isActive, region, skillLevel, timeCommitment, profileImage)'
    sql += 'VALUES ('+connection.escape(groupId)+', '+connection.escape(event.groupName)+', '+connection.escape(event.groupDescription)+', 1, '+connection.escape(event.region)+' , '+connection.escape(event.skillLevel)+' , '+connection.escape(event.timeCommitment)+' , '+connection.escape(event.profileImage)+');';
    sql += 'INSERT INTO gamegroups.groupMembers (groupMemberId, userId, groupId, isAdmin, isActive)'
    sql += 'VALUES ('+connection.escape(groupMemberId)+', '+connection.escape(event.userId)+', '+connection.escape(groupId)+', 1, 1)'; 
      connection.query(sql, function (error, results, fields) {
        results.groupId = groupId;
        results.groupMemberId = groupMemberId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };