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
    var subscriptionId = uuid();
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'INSERT INTO gamegroups.subscriptions (subscriptionId, gameId, entityId, isSubscribed)'
    sql += 'VALUES ('+connection.escape(subscriptionId)+', '+connection.escape(event.gameId)+', '+connection.escape(event.entityId)+', 1)';
      connection.query(sql, function (error, results, fields) {
        results.subscriptionId = subscriptionId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };