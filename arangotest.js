var arango = require("arango");

var db = arango.Connection({_name:"InvoiceCre8_MODUL8com", _collection : "example", _server : { hostname : "raspberrypi" } });



db.document.list().then(function(res) {
    console.log(res);
    for(var index in res.documents) {
        console.log("fetching: %j", res.documents[index].replace("/_api/document/",""));
        db.document.get(res.documents[index].replace("/_api/document/","")).then(function(res) {
            console.log(JSON.stringify(res, null, 2));
        }, function(err) {
            console.log("ERROR: %j", err);
        });
    }
}, function(err) {
    console.log("ERROR: %j", err);
});
