var arango = require("arango");
var db = arango.Connection("http://raspberrypi/InvoiceCre8_MODUL8com:example");

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
