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
      
    var sql = 'SELECT subscriptionId, gamegroups.games.gameId, gamegroups.games.gameName FROM gamegroups.subscriptions ';
    sql += 'JOIN gamegroups.games ON gamegroups.subscriptions.gameId=gamegroups.games.gameId WHERE entityId = '+connection.escape(event.entityId)+' AND gamegroups.subscriptions.isSubscribed = 1';
      connection.query(sql, function (error, results, fields) {
        
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };