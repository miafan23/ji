// var tasks;
conn = new Mongo();
db = conn.getDB("ji");
db = db.getSiblingDB('ji');
db.adminCommand('listDatabases');
var a = db.getCollectionNames();
// printjson(a)
// cursor = db.users.find()
// while(cursor.hasNext()) {
// 	printjson(cursor.next());
// }
db.users.update({"username": "admin"}, {$set:{"tasks": []}})
cursor = db.tasks.distinct("task");
// printjson(cursor)
for (var i=0; i<cursor.length; i++){
	db.users.update({"username": "admin"}, {$push: {"tasks": "admin"+i}})
}

// cursor = db.tasks.distinct("task");
// for(var i=0; i<cursor.length; i++) {
// 	printjson(cursor[i])
// 	db.tasks.update({"task": cursor[i]}, {$set: {"id": "admin"+i}}, {"multi": true})
// }
