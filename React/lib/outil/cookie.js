/**
 * Created by Guoxing.han on 2015-10-28.
 * MeiCookie
 */
var MeiCookie = (function () {

    var decode = function (value) {
            return decodeURIComponent(value);
        },
        encode = function (value) {
            return encodeURIComponent(value);
        };

    return {
        cookie      : function (key, value, option) {
            var t, days, items, cookies,
                i, len,
                item,
                result;

            // 参数大于1个时，设置cookie
            if (arguments.length > 1) {
                option = option || {};

                if (typeof option.expires === "number") {
                    days = option.expires;
                    t    = option.expires = new Date();
                    t.setTime(+t + days * 864e+5);// 86400000毫秒 ; +t, 把Date对象转成number类型的值;
                }
                items = [
                    encode(key), "=", encode(value),
                    option.expires ? "; expires=" + option.expires.toUTCString() : '',
                    option.path ? "; path=" + path : '',
                    option.domain ? "; domain=" + domain : '',
                    option.secure ? "; secure" : ''
                ].join('');

                return document.cookie = items;
            }
            //
            cookies = document.cookie ? document.cookie.split("; ") : [];
            for (i = 0, len = cookies.length; i < len; i++) {
                item = cookies[i].split("=");
                if (key && key == decode(item[0])) {
                    result = decode(item[1]);
                    break;
                }
            }
            return result;
        },
        deleteCookie: function (key) {
            if (this.cookie(key) === undefined) {
                return false;
            }

            this.cookie(key, "", {expires: -1});

            return !this.cookie(key); // 删除成功与否
        }
    }

})();

// 模块化
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = MeiCookie;
    }
    exports.MeiCookie = MeiCookie;
} else {
    window.MeiCookie = MeiCookie;
}
