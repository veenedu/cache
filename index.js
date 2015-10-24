///<reference path = "ts/Cache.ts" />
///<reference path = "bower_components/veen.utils/ts/Utils.ts" />

var cache = new Cache([
	{
		name:"subs",key:"id"
	},
	{
		name:"stories", key:"id"
	}
]);

var subs = [];
var count = 5;
//insert 500 rows to subs
Utils.forTimes(count,function(i){
	subs.push({
		name:"sub "+i,
		id: i
	});
});


console.log('Inser Docs');
cache.insertDocs("subs",subs);
var subs = cache.getTableData("subs");
console.log(subs.length == count);
console.log(subs);

console.log('Delete Doc by id');
cache.deleteDocById("subs",1);
subs = cache.getTableData("subs");
console.log(subs.length == (count -1) );
console.log(subs);

console.log('Update Docs');
var name =  "Praveen Praasd"
cache.updateDocsEquals("subs","id",3,function(sub){
	sub.name = name;
});
subs = cache.getTableData("subs");
var sub  = cache.getById("subs",3);
console.log(sub[0].name == name);


console.log('destroy');
cache.destroy();
try {
	subs = cache.getTableData("subs");
	console.log('false');
} catch (error) {
	console.log('true');
}