
// Added to handle injection
const vandium = require( 'vandium' );
var mysql      = require('mysql');
var uuid = require('uuid4');

//exports.handler = vandium.generic()
//   .handler( (event, context, callback) => {

//      context.callbackWaitsForEmptyEventLoop = false;
  var connection = mysql.createConnection({
    host: 'firstdbinstance.cfxhhl0pytex.us-east-2.rds.amazonaws.com',
    user: 'firstmaster',
    password: 'firstpass',
    database: 'gamegroups',
    multipleStatements: true
  });
  var sql1 = 'SELECT * FROM gamegroups.games; SELECT * FROM gamegroups.groups';
	connection.query(sql1, [1,2], function (error, results, fields) {
    
	if (error) {
      //return callback(error)
      throw error

    }
    //context.succeed(results);
    //callback(null, results);
    console.log(results[0]);
    console.log(results[1]);
  });
//});

/* 
Sample request body json structure
{
    "gameName": "hopeThisWorks",
    "gameDescription": "Any hope description",
    "releaseDate": "2018-02-13 20:46:13"
}

Sample Body Mapping Template for the above request body
{
    "gameName": "$input.json('$.gameName')",
    "gameDescription": "$input.json('$.gameDescription')",
    "releaseDate": "$input.json('$.releaseDate')"
}
method.request.path.gameId

"gameId": "$input.params('gameId')"

*/