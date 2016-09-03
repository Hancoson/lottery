/*
 * 移动端提示组件
 * @parma   msg         {String}, 显示的消息
 * @parma   callback    {Function}，回调
 * @parma   duration    {Number}，消息展示时间
 *
 */
;(function (win, $) {

    "use strict";

    function Message(msg) {}

    Message.prototype.open = function (msg, callback, duration) {

        if (!msg || typeof msg !== 'string') return;

        duration = duration || 1500; // 单位毫秒

        var self = this;

        var popupTmpl = '<div class="popup popmsg"><div class="wrap"><div class="cell">';
            popupTmpl +=     '<div class="content">'+ msg +'</div>';
            popupTmpl += '</div></div></div>';

        var $body = $('body');
        var $popup = $(popupTmpl);

        if (!$body.hasClass('popup-open')) {
            $body.addClass('popup-open');
            $popup.appendTo($body).fadeIn(200);
        }

        setTimeout(function () {
            $popup.fadeOut(200, function () {
                $body.removeClass('popup-open');
                $popup.remove();
            });

            if (callback && $.isFunction(callback)) {
                callback.call(self, arguments);
            }
        }, duration);
    };

    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Message;
    } else if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            module.exports = Message;
        });
    } else {
        window.Message = Message;
    }

})(window, window.jQuery || window.Zepto);