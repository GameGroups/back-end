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
    var friendshipId = uuid();
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'INSERT INTO gamegroups.friendships (friendshipId, friendOne, friendTwo, isActive)'
    sql += 'VALUES ('+connection.escape(friendshipId)+', '+connection.escape(event.userId)+', '+connection.escape(event.friendTwo)+', 0)';
      connection.query(sql, function (error, results, fields) {
        results.friendshipId = friendshipId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };