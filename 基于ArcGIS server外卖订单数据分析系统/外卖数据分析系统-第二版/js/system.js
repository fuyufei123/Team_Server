
Array.prototype.Compact = function () {
    var compact = this;
    for (var i = 0; i < compact.length; i++) {
        if (typeof (compact[i]) == "undefined" || compact[i] == null) {
            compact.RemoveAt(i);
            i--;
        }
    }
    return compact;
}




Array.prototype.SortNumber = function (pName) {
    if (this == null || this.length == 1)
        return this;

    if (typeof (this[0]) == "number") {
        return this.sort(function sortNumber(a, b) { return a - b; });
    }

    if (typeof (this[0]) == "object" && typeof (pName) == "string") {
        return this.sort(function sortNumber(a, b) { return (a[pName] > b[pName]) ? 1 : -1; });
    }

}


Array.prototype.SortNumberDesc = function (pName) {
    if (this == null || this.length == 1)
        return this;

    if (typeof (this[0]) == "number") {
        return this.sort(function sortNumber(a, b) { return b - a; });
    }

    if (typeof (this[0]) == "object" && typeof (pName) == "string") {
        return this.sort(function sortNumber(a, b) { return (b[pName] > a[pName]) ? 1 : -1; });
    }

}


Array.prototype.RemoveAt = function (index) {
    if (index < 0 || index >= this.length) return this;
    return this.splice(index, 1);
}



Array.prototype.IndexOf = function (o) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == o)
            return i;
    }
    return -1;
}


Array.prototype.LastIndexOf = function (o) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] == o)
            return i;
    }
    return -1;
}




Array.prototype.Contains = function (o) {
    return this.IndexOf(o) != -1;
}



Array.prototype.Copy = function () {
    return this.concat();
}




Array.prototype.InsertAt = function (o, i) {
    this.splice(i, 0, o);
}




Array.prototype.InsertBefore = function (o, o2) {

    var i = this.IndexOf(o2);
    if (i == -1)
        this.push(o);
    else
        this.splice(i, 0, o);
}



Array.prototype.Remove = function (o) {
    var i = this.IndexOf(o);
    if (i != -1) {
        this.splice(i, 1);
        return true;
    }
    return false;
}





Array.prototype.AddRange = function (items) {
    if (items == null || items.length == 0) return;
    for (var i = 0; i < items.length; i++) {
        this.push(items[i]);
    }
}



Array.prototype.InsertAt = function (obj, i) {
    this.splice(i, 0, obj);
}



Array.prototype.InsertBefore = function (obj, obj2) {
    var i = this.IndexOf(obj2);
    if (i == -1)
        this.push(obj);
    else
        this.splice(i, 0, obj);
}




Array.prototype.Unique = function () {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (!temp.Contains(this[i])) temp.push(this[i]);
    }
    this.length = temp.length;
    for (var i = 0; i < temp.length; i++) {
        this[i] = temp[i];
    }

}



/**
 * ?????????????????????????????????
 * */
String.prototype.LTrim = function () {
    return this.replace(/^\s*/, "");
}

/**
 * ?????????????????????????????????
 * */
String.prototype.RTrim = function () {
    return this.replace(/\s*$/, "");
}


/**
 * ?????????????????????????????????
 * */
String.prototype.Trim = function () {
    return this.replace(/(^\s+)|\s+$/g, "");
}


/**
 * ?????????????????????????????????????????????
 * */
String.prototype.EndWith = function (end) {
    return (this.substr(this.length - end.length) == end);
}



/**
 * ?????????????????????????????????????????????
 * */
String.prototype.StartWith = function (start) {
    return (this.substr(0, start.length) == start);
}

String.prototype.endWith = String.prototype.EndWith;
String.prototype.startWith = String.prototype.StartWith;



/**
 * ??????????????????????????? ??????: "a+b???????????????:{0}+{1}={3}".Format(a,b,c)
 * */
String.prototype.Format = function () {
    var s = this;
    for (var i = 0; i < arguments.length; i++) {
        s = s.replace("{" + i + "}", arguments[i]);
    }
    return (s);
}


/**
 * ????????????????????????????????????????????? ??????: "a+b???????????????:{p1}+{c1}={g}".GetFormatParames() ??????p1 c1  g ??????????????? 
 * */
String.prototype.GetFormatParameters = function () {
    var s = this;
    var re = /\{[^\{\}]*\}/gi;
    var arr = s.match(re);
    if (arr == null) return null;
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substring(1, arr[i].length - 1);
    }
    return arr;
}



/**
 * ????????????????????????????????? 
 * */
String.prototype.RemoveSpaces = function () {
    return this.replace(new RegExp(" ", "gi"), "");
}



/**
 * ?????????????????????????????????????????? 
 * */
String.prototype.RemoveExtraSpaces = function () {
    return (this.replace(/\s+/g, " "));
}



/**
 * ??????????????????URL????????? 
 * */
String.prototype.EncodeURI = function () {
    var str;
    str = escape(this);
    // + ???????????????
    str = str.replace(/\+/g, "%2B");
    return str;
}


/**
 * ?????????????????? URL ????????? 
 * */
String.prototype.DecodeURI = function () {
    return unescape(this);
}




/**
 * ??????XML???????????????????????????????????????????????????????????????XML?????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????? 
 * */
String.prototype.ConvertEntity = function () {
    if (this.length < 1) return "";
    var str = this.toString();
    str = str.replace(/&/gi, "&amp;");
    str = str.replace(/</gi, "&lt;");
    str = str.replace(/>/gi, "&gt;");
    str = str.replace(/'/gi, "&apos;");
    str = str.replace(/"/gi, "&quot;");
    return str;
}



/**
 * ???????????????????????? 
 * */
String.prototype.DeconvertEntity = function () {
    if (this.length < 1) return "";
    var str = this.toString();
    str = str.replace(/&lt;/gi, "<");
    str = str.replace(/&gt;/gi, ">");
    str = str.replace(/&apos;/gi, "'");
    str = str.replace(/&quot;/gi, "\"");
    str = str.replace(/&amp;/gi, "&");
    return str;
}



/**
 * ??????Email???????????? 
 * */
String.prototype.IsEmail = function () {
    return (/^([a-z][a-z0-9\_\.]*[a-z0-9])(@)(([a-z0-9][a-z0-9\-]*[a-z0-9][\.])+(com|cn|net|hk|tw|au|uk|de|tv|info|biz))$/ig).test(this);
}





/**
 *  ??????????????? 
 * */
String.prototype.IsNumber = function () {
    var re = /^\d*$/;
    return re.test(this);
}


/**
 *  ?????????????????????????????? page-size --> pageSize??? 
 * */
String.prototype.Camelize = function () {
    var oStringList = this.split('-');
    var camelizedString = oStringList[0];
    for (var i = 1; i < oStringList.length; i++) {
        var s = oStringList[i];
        camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return camelizedString;
}



/**
 *  ???????????????????????????
 *  @param {Int} len ????????????????????????
 * */
String.prototype.Left = function (len) {

    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }

    return this.substr(0, len);
}


/**
 *  ???????????????????????????
 *  @param {Int} len ????????????????????????
 * */
String.prototype.Right = function (len) {

    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }

    return this.substring(this.length - len, this.length);
}

/**
 *  ??????????????????????????????
 * */
String.prototype.IsLongDate = function () {
    var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);

}


/**
 *  ??????????????????????????????
 * */
String.prototype.IsShortDate = function () {
    var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}



/**
 *  ??????utf-8????????????
 * */
String.prototype.GetByteForUTF = function () {
    var s = this;
    s = s.replace(/[\u0000-\u007f]/g, "\u0061");
    s = s.replace(/[\u0080-\u07ff]/g, "\u0061\u0061");
    s = s.replace(/[\u0800-\uffff]/g, "\u0061\u0061\u0061");
    return s.length;
}


/**
 *  ?????????gb2312????????????
 * */
String.prototype.GetByteForGB = function () {
    var s = this;
    return s.replace(/[^\u0000-\u007f]/g, "\u0061\u0061").length;
}



/**
 *  ???????????????????????????
 * */
String.prototype.IsDate = function () {
    return this.IsLongDate() || this.IsShortDate();
}


/**
 *  ?????????????????????
 * */
String.prototype.ExistChinese = function () {
    //[\u4E00-\u9FA5]?????????[\uFE30-\uFFA0]????????????
    return /^[\x00-\xff]*$/.test(this) ? false : true;
}


/**
 * ??????????????????????????? 
 * */
String.prototype.IsColor = function () {
    return (/^[0-9a-fA-F]{6}$/ig).test(this);
}



/**
 * ????????????????????? 
 * */
String.prototype.ToCase = function () {
    var tmp = "";
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 0 && this.charCodeAt(i) < 255) {
            tmp += String.fromCharCode(this.charCodeAt(i) + 65248);
        }
        else {
            tmp += String.fromCharCode(this.charCodeAt(i));
        }
    }
    return tmp;
}


/**
 * ??????????????????Html????????? 
 * */
String.prototype.ToHtmlEncode = function () {
    var str = this;

    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/\'/g, "&apos;");
    str = str.replace(/\"/g, "&quot;");
    str = str.replace(/\n/g, "<br>");
    str = str.replace(/\ /g, "&nbsp;");
    str = str.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

    return str;
}


/**
 * ???????????????????????????????????????????????????????????? 
 * */
String.prototype.IsPlusNumeric = function () {
    if ((isNaN(this)) || (this.indexOf("-") != -1))
        return false;
    return true;
}


/**
 * ??????????????????????????????????????????????????????????????? 
 * */
String.prototype.IsNumeric = function () {
    if (isNaN(this))
        return false;

    return true;
}



/**
 * ??????????????????????????? 
 * */
String.prototype.IsInteger = function () {
    if ((isNaN(this)) || (this.indexOf(".") != -1) || (this.indexOf("-") != -1))
        return false;
    return true;
}


/**
 * ??????Get?????????????????? 
 * */
String.prototype.GetQuery = function (paramName, defaultValue) {
    var param = window.location.href.split(paramName + "=")[1];
    if (!param || param.length < 1) return defaultValue;
    param = param.split("&")[0];
    param = param.split("#")[0];
    return param;
}



/**
 * ??????????????????????????????
 * */
String.prototype.DisplayLength = function () {
    var str = this;
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //????????????1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len += 0.85;
        }
        else {
            len += 2;
        }
    }
    return len;
}

/**
 * ????????????????????? 
 * @param {Int} len ???????????????
 * */
Number.prototype.ToFixed = function (len) {

    if (isNaN(len) || len == null) {
        len = 0;
    }
    else {
        if (len < 0) {
            len = 0;
        }
    }

    return Math.round(this * Math.pow(10, len)) / Math.pow(10, len);

}



/**
 * ?????????????????????????????????????????? 
 * */
Number.prototype.Inrange = function (vmin, vmax) {
    return this > vmin && this < vmax;
}


/**
 * ??????Error toString????????? 
 * */
Error.prototype.toString = function () {
    return this.message;
}



Function.prototype.Bind = function (object) {
    var __method = this;
    return function () {
        __method.apply(object, arguments);
    }
}

Array.prototype.Clone = function () {
    if (this.length == 0) return [];
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (item == null) arr.push(null);
        else arr.push(item.Clone);
    }
    return arr;
}

Function.prototype.CreateCallback = function (/*args...*/) {
    //???????????????????????????????????????function??????????????????????????????????????????????????????//?????????????????????????????????window??????????????????????????????????????????????????????????????????  
    var args = arguments;
    var method = this;
    return function () {
        return method.apply(window, args);
    };
},


Function.prototype.CreateDelegate = function (obj, args, appendArgs) {
    //return function() 
    //{
    //    return method.apply(instance, arguments);
    // }


    var method = this;
    return function () {
        var callArgs = args || arguments;
        if (appendArgs === true) {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        } else if (typeof appendArgs == "number") {
            callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
            var applyArgs = [appendArgs, 0].concat(args); // create method call params
            Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
        }
        return method.apply(obj || window, callArgs);
    };
}






Function.prototype.Defer = function (millis, obj, args, appendArgs) {
    var fn = this.CreateDelegate(obj, args, appendArgs);
    if (millis) {
        return setTimeout(fn, millis);
    }
    fn();
    return 0;
}



Function.prototype.CreateSequence = function (fcn, scope) {
    if (typeof fcn != "function") {
        return this;
    }
    var method = this;
    return function () {
        var retval = method.apply(this || window, arguments);
        fcn.apply(scope || this || window, arguments);
        return retval;
    };
}





Function.prototype.CreateInterceptor = function (fcn, scope) {
    if (typeof fcn != "function") {
        return this;
    }
    var method = this;
    return function () {
        fcn.target = this;
        fcn.method = method;
        if (fcn.apply(scope || this || window, arguments) === false) {
            return;
        }
        return method.apply(this || window, arguments);
    };
}



function StringBuilder(initString) {
    this.Strings = [];
    this.Append = function (str) { this.Strings.push(str); }
    this.ToString = function () { return this.Strings.join(""); }
    this.Clear = function () { this.Strings.length = 0; }
    //this.IsEmpty = function(){return this.Strings.length>0?true:false;}

    if (typeof (initString) != "undefined" && initString != null) {
        this.Append(initString);
    }
}

function LoadJS(url, completed) {
    var oHead = document.getElementsByTagName("head")[0];
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = url;
    if (completed && $.isFunction(completed)) {
        oScript.onload = completed;
    }
    oHead.appendChild(oScript);
}



function LoadCSS(url, completed) {
    var head = document.getElementsByTagName("head")[0];
    var mylink = document.createElement('link');
    mylink.setAttribute("rel", "stylesheet");
    mylink.setAttribute("type", "text/css");
    mylink.setAttribute("href", url);
    if (completed && $.isFunction(completed)) {
        mylink.onload = completed;
    }
    head.appendChild(mylink);
}

///????????????????????????
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}


function DateFormat(strDate) {
    var date = new Date();
    if (strDate) {
        strDate = strDate.replace("T", " ");
        var days;
        if (strDate.indexOf("-") > -1) {
            days = strDate.split(" ")[0].split("-");
        }
        if (strDate.indexOf("/") > -1) {
            days = strDate.split(" ")[0].split("/");
        }
        var times = strDate.split(" ")[1].split(":");
        var year = days[0];
        var month = days[1];
        var day = days[2];
        var hh = times[0];
        var mm = times[1];
        var ss = times[2];
        date = new Date(year, month, day, hh, mm, ss);
        var relmonth = date.getMonth() - 1;
        date = new Date(year, relmonth, day, hh, mm, ss);
    }
    return date;
}
//???????????????
var formatterDate = function (date) {
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
    + (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
};

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

