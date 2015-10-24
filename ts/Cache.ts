class Cache {
	cache: Object;
	
	//array of objects with table name and key keys
	//eg [{name:"stories",key:"id"}]
	constructor(tables) {
		var c = this.cache;
		Utils.forEach(tables, function(table) {
			c[table.name] = {
				data: [],
				key: table.key
			};
		})
	}


	getTableData(tableName): Array<any> {
		return this.getTableReference[tableName]['data'];
	}
	
	//get row where id
	getById(tableName,id){
		// Utils.
	}

	getTableKey(tableName) {
		return this.getTableReference[tableName]['key'];
	}	
	
	//update or insert Docs
	insertDocs(tableName, docs) {
		var me = this;
		var data = me.getTableData(tableName);
		var tableKey = me.getTableKey(tableName);

		Utils.forEach(data, function(doc, index) {
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
	
	//clear Table
	clearTable(tableName) {
		this.getTableReference(tableName)['data'].length = 0;
	}
	
	//
	
	private getTableReference(tableName) {
		return this.cache[tableName];
	}

	private pushDocToTable(tableName, doc) {
		this.getTableReference[tableName]['data'].push(doc);
	}

	private updateDocToTable(tableName, doc, index) {
		//a.splice(2,1,"pp")
		this.getTableReference[tableName]['data'].splice(index, 1, doc);
	}
}