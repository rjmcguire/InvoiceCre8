var arango = require("arango");
var db = arango.Connection("http://raspberrypi/InvoiceCre8_MODUL8com:example");

/*
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
*/

db.document.list().then(function (res) {
    return res.documents.map(function (doc) {
        return doc.replace("/_api/document/","")
    });
}, function (err) {
    console.log("LIST ERROR: %j", err);
}).then(function (documents) {
    db.batch.start();
    for(var index in documents) {
        db.document.get(documents[index]);
    }
    return db.batch.exec();
}, function (err) {
    console.log("BATCH ERROR: %j", err);
}).then(function (res) {
    for(var index = 1; index <= res[0].length; index++) {
        console.log(JSON.stringify(res[index], null, 2));
    }
}, function (error) {
    console.log("RESULTS ERROR: %j", err);
});
