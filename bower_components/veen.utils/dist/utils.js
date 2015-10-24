//Array<Subscription>
var Utils = (function () {
    function Utils() {
    }
    //this method subtracts array of objects, uses 'prop' to compare
    //subtracts one array from another
    Utils.subtractFromArray = function (a, b, prop) {
        var result = [];
        for (var i = 0; i < a.length; i++) {
            var item = a[i];
            if (!Utils.inArray(item, b, prop)) {
                result.push(item);
            }
        }
        return result;
    };
    //this mathod check whether a value exists in array,
    //if property is passed then its assumed that array contains object
    Utils.inArray = function (value, arr, prop) {
        if (prop) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][prop] == value[prop]) {
                    return true;
                }
            }
            return false;
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == value) {
                    return true;
                }
            }
            return false;
        }
    };
    //filters an array and returns value where fn returns true
    Utils.filterArrayByFn = function (arr, fn) {
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            var val = arr[i];
            if (fn(val)) {
                res.push(val);
            }
        }
        return res;
    };
    //this function, filters an array, compares a prop and val
    /*
        var arr = [{a:1},{a:2},{a:1}]
        filterArrayByVal(arr,'a',1) ==> returns first and last element
    */
    Utils.filterArrayByVal = function (arr, prop, value) {
        var res = Utils.filterArrayByFn(arr, function (item) {
            return item[prop] == value;
        });
        return res;
    };
    Utils.getGuid = function () {
        //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript   
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    Utils.noop = function (val) {
        return val;
    };
    Utils.forEach = function (arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    };
    Utils.parseTime = function (time) {
        var diff = Math.floor((new Date().getTime() - (time * 1000)) / 1000);
        if (diff < 60) {
            return diff + " secs ago";
        }
        else {
            diff = Math.floor(diff / 60);
            if (diff < 60) {
                return diff + " mins ago";
            }
            else {
                if (diff < 600) {
                    diff = Math.floor(diff / 60);
                    var t = "";
                    if (diff > 1) {
                        t = "s";
                    }
                    return diff + " hour" + t + " ago";
                }
                else {
                    var d = new Date(time * 1000);
                    var now = new Date();
                    if (now.getDate() == d.getDate() && now.getMonth() == d.getMonth() && now.getFullYear() == d.getFullYear()) {
                        var hours = d.getHours();
                        var ampm = "AM";
                        var minutes = d.getMinutes();
                        if (hours > 11) {
                            hours = hours - 12;
                            ampm = "PM";
                        }
                        if (minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        return hours + ":" + minutes + " " + ampm;
                    }
                    else {
                        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                    }
                }
            }
        }
    };
    return Utils;
})();
