///<reference path="../bower_components/veen.utils/ts/Utils.ts" />
var Cache = (function () {
    //array of objects with table name and key keys
    //eg [{name:"stories",key:"id"}]
    function Cache(tables) {
        var c = this.cache;
        Utils.forEach(tables, function (table) {
            c[table.name] = {
                data: [],
                key: table.key
            };
        });
    }
    Cache.prototype.getTableData = function (tableName) {
        return this.getTableReference[tableName]['data'];
    };
    //get row where id
    Cache.prototype.getById = function (tableName, id) {
        var tableData = this.getTableData(tableName);
        var key = this.getTableKey(tableName);
        return Utils.filterArrayByVal(tableData, key, id);
    };
    //update or insert Docs
    Cache.prototype.insertDocs = function (tableName, docs) {
        var me = this;
        var data = me.getTableData(tableName);
        var tableKey = me.getTableKey(tableName);
        Utils.forEach(data, function (doc, index) {
            //if doc already exists update it 
            if (Utils.inArray(doc[tableKey], data, tableKey)) {
                me.updateDocToTable(tableName, doc, index);
            }
            else {
                me.pushDocToTable(tableName, doc);
            }
        });
    };
    //update or insert doc
    Cache.prototype.insertDoc = function (tableName, doc) {
        this.insertDocs(tableName, [doc]);
    };
    //clear Table
    Cache.prototype.clearTable = function (tableName) {
        this.getTableReference(tableName)['data'].length = 0;
    };
    //
    Cache.prototype.getTableKey = function (tableName) {
        return this.getTableReference[tableName]['key'];
    };
    Cache.prototype.getTableReference = function (tableName) {
        return this.cache[tableName];
    };
    Cache.prototype.pushDocToTable = function (tableName, doc) {
        this.getTableReference[tableName]['data'].push(doc);
    };
    Cache.prototype.updateDocToTable = function (tableName, doc, index) {
        //a.splice(2,1,"pp")
        this.getTableReference[tableName]['data'].splice(index, 1, doc);
    };
    return Cache;
})();
