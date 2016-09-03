/*!
 * @lottery v1.0.0
 * @author Guoxing.Han(hancoson#163.com)
 */
var defaults = {
    selector : '#lottery',
    button   : '#J_lotteryBtn',
    width    : 4,    // 转盘宽度
    height   : 4,    // 转盘高度
    initSpeed: 300,	// 初始转动速度
    speed    : 0,	// 当前转动速度
    upStep   : 50,   // 加速滚动步长
    upMax    : 50,   // 速度上限
    downStep : 30,   // 减速滚动步长
    downMax  : 500,  // 减速上限
    waiting  : 3000, // 匀速转动时长
    index    : 0,    // 初始位置
    target   : 1,    // 中奖位置，可通过后台算法来获得，默认值：最便宜的一个奖项或者"谢谢参与"
    isRunning: false // 当前是否正在抽奖
}

var Lottery = {

    // 初始化用户配置
    lottery: function (options) {
        this.options       = $.extend(true, defaults, options);
        this.options.speed = this.options.initSpeed;
        this.container     = $(this.options.selector);
        this.button        = $(this.options.button);
        this._setup();
    },

    // 开始装配转盘
    _setup: function () {

        // 这里为每一个奖项设置一个有序的下标，方便Lottery._roll的处理
        // 初始化第一行lottery-group的序列
        for (var i = 0; i < this.options.width; ++i) {
            this.container.find('.lottery-group').first().find('.lottery-unit').eq(i).attr('lottery-unit-index', i);
        }

        // 初始化最后一行lottery-group的序列
        for (var i = Lottery._count() - this.options.height + 1, j = 0, len = this.options.width + this.options.height - 2; i >= len; --i, ++j) {
            this.container.find('.lottery-group').last().find('.lottery-unit').eq(j).attr('lottery-unit-index', i);
        }

        // 初始化两侧lottery-group的序列
        for (var i = 1, len = this.options.height - 2; i <= len; ++i) {
            this.container.find('.lottery-group').eq(i).find('.lottery-unit').first().attr('lottery-unit-index', Lottery._count() - i);
            this.container.find('.lottery-group').eq(i).find('.lottery-unit').last().attr('lottery-unit-index', this.options.width + i - 1);
        }
        this._enable();
    },

    // 开启抽奖
    _enable: function () {
        this.container.find(this.button).on('click', this.beforeRoll);
    },

    // 禁用抽奖
    _disable: function () {
        this.container.find(this.button).off('click', this.beforeRoll);
    },

    // 转盘加速
    _up: function () {
        var _this = this;
        if (_this.options.speed <= _this.options.upMax) {
            _this._constant();
        } else {
            _this.options.speed -= _this.options.upStep;
            _this.upTimer = setTimeout(function () {
                _this._up();
            }, _this.options.speed);
        }
    },

    // 转盘匀速
    _constant: function () {
        var _this = this;
        clearTimeout(_this.upTimer);
        setTimeout(function () {
            _this.beforeDown();
        }, _this.options.waiting);
    },

    // 减速之前的操作，支持用户追加操作（例如：从后台获取中奖号）
    beforeDown: function () {
        var _this = this;
        if (_this.options.beforeDown) {
            _this.options.beforeDown.call(_this);
        }
        //_this._down();
    },

    // 转盘减速
    _down: function (target) {
        var _this = this;
        if (_this.options._down) {
            _this.options._down.call(_this);
        }
        target = target || _this.options.target;
        if (_this.options.speed > _this.options.downMax && target == _this._index()) {
            //if (_this.options.speed > _this.options.downMax && result == _this._index()) {
            _this._stop();
        } else {
            _this.options.speed += _this.options.downStep;
            _this.downTimer = setTimeout(function () {
                _this._down(target);
            }, _this.options.speed);
        }
    },

    // 转盘停止，还原设置
    _stop: function () {
        var _this = this;
        clearTimeout(_this.downTimer);
        clearTimeout(_this.rollerTimer);
        _this.options.speed     = _this.options.initSpeed;
        _this.options.isRunning = false;
        _this.callBack();
        if (_this.options._stop) {
            _this.options._stop.call(_this);
        }
    },

    // 抽奖之前的操作，支持用户追加操作
    beforeRoll: function () {
        var _this = Lottery;
        _this._disable();
        if (_this.options.beforeRoll) {
            _this.options.beforeRoll.call(_this);
        }
        _this._roll();
    },

    // 转盘滚动
    _roll: function () {
        var _this = this;
        _this.container.find('[lottery-unit-index="' + _this._index() + '"]').removeClass("active");
        ++_this.options.index;
        _this.container.find('[lottery-unit-index="' + _this._index() + '"].lottery-unit').addClass("active");
        _this.rollerTimer = setTimeout(function () {
            _this._roll();
        }, _this.options.speed);
        if (!_this.options.isRunning) {
            _this._up();
            _this.options.isRunning = true;
        }
    },

    // 转盘当前格子下标
    _index: function () {
        return this.options.index % this._count();
    },

    // 转盘总格子数
    _count  : function () {
        return this.options.width * this.options.height - (this.options.width - 2) * (this.options.height - 2);
    },
    //抽奖结束返回事件
    callBack: function () {
        if (this.options.callBack) {
            this.options.callBack.call(this);
        }
    }
};

// 模块化
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Lottery;
    }
    exports.Lottery = Lottery;
} else {
    window.Lottery = Lottery;
}