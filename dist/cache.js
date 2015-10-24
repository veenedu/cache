///<reference path="../bower_components/veen.utils/ts/Utils.ts" />
var Cache = (function () {
    //array of objects with table name and key keys
    //eg [{name:"stories",key:"id"}]
    function Cache(tables) {
        var c = {};
        Utils.forEach(tables, function (table) {
            c[table.name] = {
                data: [],
                key: table.key
            };
        });
        this.cache = c;
    }
    Cache.prototype.destroy = function () {
        if (this.cache) {
            Utils.forEachKey(this.cache, function (key, val) {
                val['data'].length = 0;
                delete val['data'];
                delete val['key'];
            });
        }
        this.cache = {};
    };
    ///get all rows of a table
    Cache.prototype.getTableData = function (tableName) {
        return this.getTableReference(tableName)['data'];
    };
    Cache.prototype.getDocsEquals = function (tableName, prop, value) {
        var tableData = this.getTableData(tableName);
        return Utils.filterArrayByVal(tableData, prop, value);
    };
    //get row where id
    Cache.prototype.getById = function (tableName, id) {
        var key = this.getTableKey(tableName);
        return this.getDocsEquals(tableName, key, id);
    };
    Cache.prototype.deleteDocsEquals = function (tableName, prop, val) {
        var tableData = this.getTableData(tableName);
        var newData = [];
        Utils.forEach(tableData, function (row) {
            if (row[prop] != val) {
                newData.push(row);
            }
        });
        this.getTableReference(tableName)['data'] = newData;
    };
    Cache.prototype.deleteDocById = function (tableName, id) {
        var tableKey = this.getTableKey(tableName);
        this.deleteDocsEquals(tableName, tableKey, id);
    };
    //update or insert Docs
    Cache.prototype.insertDocs = function (tableName, docs) {
        var me = this;
        var data = me.getTableData(tableName);
        var tableKey = me.getTableKey(tableName);
        Utils.forEach(docs, function (doc, index) {
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
    Cache.prototype.updateDocsEquals = function (tableName, property, value, updateFn) {
        var data = this.getTableData(tableName);
        Utils.forEach(data, function (doc, index) {
            if (doc[property] == value) {
                updateFn(doc);
            }
        });
    };
    Cache.prototype.updateDocById = function (tableName, id, updateFn) {
        var tableKey = this.getTableKey(tableName);
        this.updateDocsEquals(tableName, tableKey, id, updateFn);
    };
    //clear Table
    Cache.prototype.clearTable = function (tableName) {
        this.getTableReference(tableName)['data'].length = 0;
    };
    //
    Cache.prototype.getTableKey = function (tableName) {
        return this.getTableReference(tableName)['key'];
    };
    Cache.prototype.getTableReference = function (tableName) {
        return this.cache[tableName];
    };
    Cache.prototype.pushDocToTable = function (tableName, doc) {
        this.getTableReference(tableName)['data'].push(doc);
    };
    Cache.prototype.updateDocToTable = function (tableName, doc, index) {
        //a.splice(2,1,"pp")
        this.getTableReference(tableName)['data'].splice(index, 1, doc);
    };
    return Cache;
})();
