///<reference path="../bower_components/veen.utils/ts/Utils.ts" />
                    

class Cache {
	cache: Object;
	
	//array of objects with table name and key keys
	//eg [{name:"stories",key:"id"}]
	constructor(tables) {
		var c = {};
		Utils.forEach(tables, function(table) {
			c[table.name] = {
				data: [],
				key: table.key
			};
		});
		this.cache = c;
	}

	
	///get all rows of a table
	getTableData(tableName): Array<any> {
		return this.getTableReference(tableName)['data'];
	}
	
	getDocsEquals(tableName,prop,value){
		var tableData = this.getTableData(tableName);
		return Utils.filterArrayByVal(tableData,prop,value);		
	}
	
	//get row where id
	getById(tableName,id){
		var key = this.getTableKey(tableName);
		return this.getDocsEquals(tableName,key,id);
	}	
	
	deleteDocsEquals(tableName, prop, val){
		var tableData = this.getTableData(tableName);
		var newData = [];
		Utils.forEach(tableData,function(row){
			if(row[prop] != val){
				newData.push(row);
			}
		});
		
		this.getTableReference(tableName)['data']= newData;
	}	
	
	deleteDocById(tableName,id){
		var tableKey = this.getTableKey(tableName);
		this.deleteDocsEquals(tableName,tableKey,id);
	}
	
	//update or insert Docs
	insertDocs(tableName, docs) {
		var me = this;
		var data = me.getTableData(tableName);
		var tableKey = me.getTableKey(tableName);

		Utils.forEach(docs, function(doc, index) {
			//if doc already exists update it 
			if (Utils.inArray(doc[tableKey], data, tableKey)) {
				me.updateDocToTable(tableName, doc, index);
			}
			//else push it
			else {
				me.pushDocToTable(tableName, doc);
			}
		});
	}
	
	//update or insert doc
	insertDoc(tableName, doc) {
		this.insertDocs(tableName, [doc]);
	}
	
	updateDocsEquals(tableName, property, value, updateFn) {
		var data = this.getTableData(tableName);
		Utils.forEach(data,function(doc,index){
			if(doc[property] == value){
				updateFn(doc);
			}
		});
	}
	
	updateDocById(tableName,id,updateFn){
		var tableKey = this.getTableKey(tableName);
		this.updateDocsEquals(tableName,tableKey,id,updateFn);
	}
	
	//clear Table
	clearTable(tableName) {
		this.getTableReference(tableName)['data'].length = 0;
	}
	
	//
	private getTableKey(tableName) {
		return this.getTableReference(tableName)['key'];
	}
			
	private getTableReference(tableName) {
		return this.cache[tableName];
	}

	private pushDocToTable(tableName, doc) {
		this.getTableReference(tableName)['data'].push(doc);
	}

	private updateDocToTable(tableName, doc, index) {
		//a.splice(2,1,"pp")
		this.getTableReference(tableName)['data'].splice(index, 1, doc);
	}
}