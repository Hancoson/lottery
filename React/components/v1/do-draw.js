/**
 * 抽奖view
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-16.
 */
const React      = require('react');
const ReactDom   = require('react-dom');
const HdDialog   = require('../../../../lib/components/dialog/dialog');
const Lottery    = require('../../../../lib/outil/lottery')
const AJAXCONGIG = require('../../../../lib/outil/ajax');
const DrawDialog = require('./draw-dialog');
// const WriteInfo=require('./write-info');
// const Result=require('./result');
let PARAMETER  = {
    _draw     : '',//中奖data
    _arr      : [],//奖品id组
    _target   : '',//中奖id
    _subscript: ''//中奖id对应下标
}
const DrawBox  = React.createClass({
    getInitialState(){
        return {
            details   : this.props.details,
            main      : this.props.main,
            loginInfo : MeiCookie.cookie("MZ_ALAD_USER_INFO") || false,
            drawChance: this.props.drawChance,
            isStart   : true,
            isEnd     : false
        }
    },
    componentWillReceiveProps(nextProps){
        console.log(nextProps,this.state.drawChance);
        this.setState({
            drawChance: this.state.drawChance+nextProps.drawChance
        });
    },
    render(){
        const _details   = this.state.details,
              _main      = this.state.main,
              _loginInfo = this.state.loginInfo,
              _chance    = this.state.drawChance,
              _isStart   = this.state.isStart,
              _isEnd     = this.state.isEnd;
        return (
            <div className="draw-box" id="J_lotteryPc">
                <ul className="lottery-group">
                    <li className='lottery-unit active'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[0].prizeImg.link}/>
                        <p>{_details[0].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[1].prizeImg.link}/>
                        <p>{_details[1].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[2].prizeImg.link}/>
                        <p>{_details[2].prizeName.text}</p>
                    </li>
                </ul>
                <ul className="lottery-group">
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[7].prizeImg.link}/>
                        <p>{_details[7].prizeName.text}</p>
                    </li>
                    {
                        _isStart ? <li className='btn' id="J_lotteryBtn"
                                       style={{background: _loginInfo ? _chance < 1 ? 'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-w.png)' : 'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-b.png)' : 'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-b.png)'}}>
                            {

                                _loginInfo ?
                                    _chance < 1 ?
                                        <div className="null">
                                            {CONFIG.PROMPT.nullDrawChance}
                                            <p>分享至微博送您<em>{_main.addChance.text}</em>次机会</p>
                                        </div> :
                                        <p>今日剩<em>{_chance}</em>次抽奖机会</p> :
                                    <a href={CONFIG.URL.login}>
                                        <p>{CONFIG.PROMPT.drawNoLogin}</p>
                                    </a>
                            }

                        </li> :
                            <li className='btn'
                                style={{background: 'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-w.png)'}}>
                                {
                                    !_isEnd ?
                                        <div className="no-start">活动结束了</div> :
                                        <div className="no-start">活动还未开始</div>
                                }

                            </li>
                    }

                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[3].prizeImg.link}/>
                        <p>{_details[3].prizeName.text}</p>
                    </li>
                </ul>

                <ul className="lottery-group">
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[6].prizeImg.link}/>
                        <p>{_details[6].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[5].prizeImg.link}/>
                        <p>{_details[5].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[4].prizeImg.link}/>
                        <p>{_details[4].prizeName.text}</p>
                    </li>
                </ul>
            </div>
        )
    },
    componentWillMount(){
        let _timeStamp = parseInt(timeStamp) * 1000,
            _main      = this.state.main;
        if (new Date(_main.start_date.disabled).getTime() > _timeStamp || new Date(_main.end_date.disabled).getTime() < _timeStamp) {
            if (new Date(_main.end_date.disabled).getTime() < _timeStamp) {
                this.setState({
                    isStart: false,
                    isEnd  : false
                });
            }
            else {
                this.setState({
                    isStart: false,
                    isEnd  : true
                });
            }
        }
        //未登录是拦截
        if (!this.state.loginInfo) {
            return;
        }

        //获取当日剩余抽奖次数接口
        this._getChance('get')
    },
    /**
     * 抽奖次数
     */
    _getChance(e){
        let that        = this,
            _main       = this.state.main,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = e == 'get' ? CONFIG.urlPc.getChance+ '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId : CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (data.success) {
                that.setState({
                    drawChance: data.data
                });
                that._bindDraw();
            }
            else {
                console.log(data.errorMsg)
            }

        }).fail(function () {
            console.log('获取抽奖次数接口服务异常')
        });
    },
    /**
     * 绑定抽奖
     * @private
     */
    _bindDraw(){

        let that        = this,
            _details    = this.state.details,
            _main       = this.state.main,
            _defaultID  = _main.defaultId.text,
            _activityId = _main.id.disabled;//抽奖活动ID
        //未登录是拦截
        if (!this.state.loginInfo) {
            return;
        }
        //没有抽奖机会
        if (this.state.drawChance < 1) {
            var _href                                       = location.href;
            _href                                           = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
            document.getElementById('J_lotteryBtn').onclick = function () {
                that._getChance();
                window.open(_href);
            }
            return;
        }
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
                const _url  = CONFIG.urlPc.getDraw+'?activityId='+_activityId+'&appId='+CONFIG.POSTDATA.appId;
                that._pullDraw(_details, _url);

            },
            beforeDown: function () {//重写减速之前的操作
                console.log("减速了");
                this._down(PARAMETER._target);
                //减抽奖次数
                that.setState({
                    drawChance: that.state.drawChance - 1
                });
            },
            callBack  : function () {//重写转盘停止自定义事件
                console.log("抽奖结束");
                that._onOpen(PARAMETER._draw);
            },
            _stop     : function () { // 重写转盘停止，没有抽奖机会后禁用按钮
                //没有抽奖机会
                if (that.state.drawChance < 1) {
                    var _href                                       = location.href;
                    _href                                           = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
                    document.getElementById('J_lotteryBtn').onclick = function () {
                        that._getChance();
                        window.open(_href);
                    }
                }
                else {
                    console.log("开始抽奖");
                    this._enable();
                }
            },

        });
    },
    /**
     *
     * @param draw 中奖后的data
     * @private
     */
    _onOpen(draw){
        document.body.className = 'no-scroll';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={true} width="470" marginTop="-200"
                                  marginLeft="-235"><DrawDialog drawData={draw} mainData={this.state.main}/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    _onClose(){
        document.body.className = '';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={false}><DrawDialog /></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    /**
     * 获取奖品id的下标
     * @param details 奖品
     * @param id
     * @returns {string}
     * @private
     */
    _getId(details, id){
        let _sub = '';
        details.map(function (v, i) {
            if (id == v.prizeId.disabled) {
                _sub = i
            }
        });
        return _sub;
    },
    _pullDraw(details, url){
        const that = this;
        AJAXCONGIG.AjaxJsonp(url).done(function (data) {
            console.log(data);
            PARAMETER._draw   = data;
            PARAMETER._target = that._getId(details, data.data.id);

        }).fail(function () {
            console.log('抽奖接口服务异常')
        });
    }
});
module.exports = DrawBox;