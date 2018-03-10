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
    var gameId = uuid();
    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'INSERT INTO gamegroups.games (gameId, gameName, gameDescription, releaseDate, isActive)'
    sql += 'VALUES ('+connection.escape(gameId)+', '+connection.escape(event.gameName)+', '+connection.escape(event.gameDescription)+', '+connection.escape(event.releaseDate)+', 1)';
      connection.query(sql, function (error, results, fields) {
        results.gameId = gameId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };