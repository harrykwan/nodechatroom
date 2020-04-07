var MongoClient = require('mongodb').MongoClient;

function createdb(){
    var url = "mongodb://localhost:27017/mydb";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });
}

function createcollection(){
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.createCollection("messagerecord", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });
}


function getoldmessage(){
    var yesterday = new Date(); 
    yesterday.setDate(yesterday.getDate() - 1);  
    var today = new Date();
    var yesterdaydate = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate();
    var todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
            var dbo = db.db("mydb").collection("messagerecord");
            dbo.find({$or: [{date:todaydate},{date:yesterdaydate}]}).sort({time: -1}).limit(20).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
              });
    });
    
}
// createdb()
// createcollection()
getoldmessage()