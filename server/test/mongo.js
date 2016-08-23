// var tasks;
conn = new Mongo();
db = conn.getDB("ji");
db = db.getSiblingDB('ji');
db.adminCommand('listDatabases');
var a = db.getCollectionNames();
printjson(a)
// cursor = db.tasks.distinct("task");
cursor = db.users.find()
// printjson(cursor())
// db.users.update({"username": "admin"}, {$set: {"tasks": cursor}}, {multi: true})
while(cursor.hasNext()) {
	printjson(cursor.next());
}