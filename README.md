# Lottery
### 基于`jQuery`抽奖组件，用`React`实现

```js
Lottery.lottery({
            selector  : '#J_lotteryPc',
            button    : '#J_lotteryBtn',
            width     : 3,    //长
            height    : 3,    //高
            index     : 0,    // 初始位置
            initSpeed : 500,  // 初始转动速度
            upStep    : 50,   // 加速滚动步长
            upMax     : 50,   // 速度上限
            downStep  : 30,   // 减速滚动步长
            downMax   : 500,  // 减速上限
            waiting   : 5000, // 匀速转动时长
            target    : that._getId(_details, _defaultID), //中奖id，可通过后台算法来获得，默认值：最便宜的一个奖项或者"谢谢参与"
            beforeRoll: function () { // 重写滚动前事件：beforeRoll
                console.log("开始抽奖");

            },
            beforeDown: function () {//重写减速之前的操作
                console.log("减速了");
            },
            callBack  : function () {//重写转盘停止自定义事件
                console.log("抽奖结束");
            },
            _stop     : function () { // 重写转盘停止，没有抽奖机会后禁用按钮
                //没有抽奖机会
            }

        });

```

