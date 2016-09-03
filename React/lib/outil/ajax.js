/**
 *
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-6-20.
 */
const AJAXCONGIG = {
    //json
    AjaxData : function (url, data) {
        // data=JSON.stringify(data);
        return $.ajax({
            url     : url,
            type  : "POST",
            dataType: "json",
            data    : data,
            timeout : 20000,
            //contentType: 'application/json'
        })
    },
    //jsonp
    AjaxJsonp: function (url, data) {
        return $.ajax({
            type       : "GET",
            url          : url,
            dataType     : "jsonp",
            jsonp        : "callback",
            jsonpCallback: "jsoncallback",
            timeout      : 20000,
            contentType  : 'application/javascript'
        })
        /*return $.ajax({
         url        : url,
         method     : "GET",
         dataType   : "json",
         data       : data,
         timeout    : 20000,
         contentType: 'application/json'
         })*/
    }
}
module.exports   = AJAXCONGIG;