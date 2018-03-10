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
    var messageId = uuid();

    context.callbackWaitsForEmptyEventLoop = false;
      
    var sql = 'INSERT INTO gamegroups.messages (messageId, conversationId, senderId, recipientId, messageText, isActive)'
    sql += 'VALUES ('+connection.escape(messageId)+', '+connection.escape(event.conversationId)+', '+connection.escape(event.senderId)+', '+connection.escape(event.recipientId)+', '+connection.escape(event.messageText)+', 1)';
      connection.query(sql, function (error, results, fields) {
        results.messageId = messageId;
        if (error) { return callback(error);}
        callback(null, results);
        
      })

  };