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
      
    var sql = 'SELECT * from gamegroups.friendships WHERE (friendOne = '+connection.escape(event.userId)+' OR friendTwo = '+connection.escape(event.userId)+') AND isActive = 1; ';
    sql += 'SELECT groupMemberId, gamegroups.groups.groupId, joinDate, isAdmin, groupName, groupDescription, username FROM gamegroups.groupMembers ';
    sql += 'JOIN gamegroups.groups ON gamegroups.groupMembers.groupId=gamegroups.groups.groupId WHERE userId = '+connection.escape(event.userId)+' AND gamegroups.groupMembers.isActive = 1; ';
    sql += 'SELECT subscriptionId, gamegroups.games.gameId, gamegroups.games.gameName FROM gamegroups.subscriptions ';
    sql += 'JOIN gamegroups.games ON gamegroups.subscriptions.gameId=gamegroups.games.gameId WHERE entityId = '+connection.escape(event.userId)+' AND gamegroups.subscriptions.isSubscribed = 1';
    connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };