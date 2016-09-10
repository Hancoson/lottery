/**
 * 配置文件
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-6.
 */

var CONFIG = {
    urlPc: {
     couponCquire: '../../../../lib/config/json/coupon.json', //获取优惠券
     getSkuOrder : '../../../../lib/config/json/skuOrder.json',//获取sku 下单数量接口
     getDrawList : '../../../../lib/config/json/drawList.json',//最新中奖用户信息列表（活动页轮播滚动）
     getDraw     : '../../../../lib/config/json/draw.json',//抽奖
     pullInfo    : '../../../../lib/config/json/pullAddress.json',//提交收货信息
     getChance   : '../../../../lib/config/json/getLeft.json',//获取当日剩余抽奖次数接口
     updateChance: '../../../../lib/config/json/getChance.json',//更新当天抽奖次数
     getMyDraw   : '../../../../lib/config/json/my-draw.json',//根据用户获取用户中奖信息
     },

    //提示文案
    PROMPT  : {
        noShareChance: "抽奖次数已达上限",//分享后不再增加抽奖机会
        noLogin       : "你还没有登录~请立即登录",
        netErr        : "网络异常，请稍后再试！",
        loginErr      : "登录过期，请重新登录",
        errName       : "请正确填写收件人姓名", //
        errTel        : "请正确填写手机号码",
        errAddress    : "请正确填写详细地址(必须大于5个字)",
        noOneDraw     : "还没有中奖的人,赶紧去抽奖吧~", //没人中将是中奖纪录说明文案
        drawNetErr    : "姿势不对<br>请重试",//抽奖网络异常
        drawNoLogin   : "先登录再抽奖", //未登录时抽奖按钮提示文案
        drawDialog    : "红包类奖品将由系统自动发至您的账户，您可在魅族商城 > 个人中心 > 我的红包 中查询", //中奖弹窗底部说明文案
        drawStart     : "活动还未开始", //活动还没有开始
        drawEnd       : "活动已结束", //活动已结束
        nullDrawChance: "抽奖机会用完啦", //抽奖机会用完啦
        noDraw        : "没有中奖噢，再接再厉", //未中奖弹窗提示文案
        noList        : "你还未中奖~", //我还没有中过奖
        pullInfoSucc  : "提交成功！", //收货信息提交成功
        pullInfoErr   : "提交失败", //收货信息提交成功
        pullInfoErrDec: "建议刷新页面后重试，您可在“我的奖品”里继续填写收货信息", //收货信息提交失败描述
        checkCoupon   : "查看优惠券：魅族商城 > 个人中心 > 我的优惠券" //查看查看优惠券提示
    },
    //默认连接
    URL     : {
        mLogin   : "https://login.flyme.cn/vCodeLogin?useruri=http%3A%2F%2Fmall.meizu.com%2Fmember%2Flogin.html?useruri=" + encodeURIComponent(window.location.href) + "&sid=unionlogin&service=store&autodirct=true",
        login    : "https://login.flyme.cn/vCodeLogin?useruri=http%3A%2F%2Fstore.meizu.com%2Fmember%2Flogin.htm?useruri=" + encodeURIComponent(window.location.href) + "&sid=unionlogin&service=&autodirct=true",
        store    : "http://store.meizu.com/index.html",
        mall     : 'http://mall.meizu.com/index.html',
        myOrder  : "http://ordercenter.meizu.com/list/index.html", //我的订单
        mMyOrder : "http://ordercenter.mall.meizu.com/mall/order/init.html", //移动端我的订单
        loginOut : 'http://hd.meizu.com/logout?useruri=' + encodeURIComponent(window.location.href),
        member   : "http://me.meizu.com/", //个人中心
        mMeder   : "http://me.m.meizu.com/", //移动端个人中心
        register : "https://i.flyme.cn/register", //注册
        mRegister: "https://i.flyme.cn/mregister.html" //移动版注册
    },
    REP     : {
        name   : /^[\u4E00-\u9FA5A-Za-z]+$/, //姓名
        phone  : /^1(2|3|4|5|6|7|8)[0-9]{9}$/, //手机号码
        address: /^[\u4E00}-\u9FA5}A-Za-z0-9_\-,，。\(\)（）#＃:：\[\]【】\*－—–《》\s]{5,100}$/ //地址
    },
    POSTDATA: {
        appId: 1, //接入方ID，比如alad接入，appId值为1
        token: 123456 //安全校验；开发&测试：123456； 灰度和线上找开发拿

    }
}