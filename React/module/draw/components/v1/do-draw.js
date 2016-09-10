/**
 * 抽奖view
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-16.
 */
const IsPc       = require('../../../../lib/outil/isPc');
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
            loginInfo : MeiCookie.cookie(/MzmApp/.test(navigator.userAgent) ? "MZ_APP_USER_INFO" : "MZ_ALAD_USER_INFO") || false,
            drawChance: this.props.drawChance,
            isStart   : true,
            isEnd     : false,
            canDraw   : true,
            getDate   : false
        }
    },
    shouldComponentUpdate(nextProps){
        return this.state.details == nextProps.details
    },
    componentWillReceiveProps(nextProps, nextState){
        if (nextProps.drawChance != 0) {
            this.setState({
                drawChance: nextProps.drawChance
            });
        }
    },
    createMarkup() {
        const _fonts = CONFIG.PROMPT.drawNetErr;
        return {__html: _fonts};
    },
    render(){
        const _details   = this.state.details,
              _main      = this.state.main,
              _loginInfo = this.state.loginInfo,
              _chance    = parseInt(this.state.drawChance),
              _isStart   = this.state.isStart,
              _isEnd     = this.state.isEnd,
              _canDraw   = this.state.canDraw,
              _getDate   = this.state.getDate;
        console.log(_loginInfo, _chance, _isStart, _canDraw);
        return (
            <div className="draw-box" id="J_lotteryPc">
                <ul className="lottery-group">
                    <li className='lottery-unit active'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[0].prizeImg.link} alt={_details[0].prizeName.text}/>
                        <p>{_details[0].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[1].prizeImg.link} alt={_details[1].prizeName.text}/>
                        <p>{_details[1].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[2].prizeImg.link} alt={_details[2].prizeName.text}/>
                        <p>{_details[2].prizeName.text}</p>
                    </li>
                </ul>
                <ul className="lottery-group">
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[7].prizeImg.link} alt={_details[7].prizeName.text}/>
                        <p>{_details[7].prizeName.text}</p>
                    </li>
                    {
                        _isStart ? <li className='btn' id="J_lotteryBtn"
                                       style={{
                                           backgroundImage: _loginInfo ?
                                               _getDate && !isNaN(_chance) ?
                                                   _chance < 1 ?
                                                       'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-w.png)' :
                                                       'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-b.png)' :
                                                   'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-w.png)' :
                                               'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-b.png)'
                                       }}>
                            {

                                _loginInfo ?
                                    _getDate && !isNaN(_chance) ?
                                        _chance < 1 ?
                                            <div className="null">
                                                {CONFIG.PROMPT.nullDrawChance}
                                                <p>
                                                    {
                                                        IsPc.init() ?
                                                            _canDraw ?
                                                            "每日分享送" + _main.addChance.text + "次抽奖机会" :
                                                                '' :
                                                            _canDraw ?
                                                            "分享送" + _main.addChance.text + "次机会" :
                                                                ''
                                                    }
                                                </p>
                                            </div> :
                                            <p>
                                                今日剩抽奖<em>{_chance}</em>次
                                            </p> :
                                        <a className="null" style={{lineHeight: '1.2'}}
                                           dangerouslySetInnerHTML={this.createMarkup()}
                                           href="javascript:location.reload() "></a> :
                                    <a href={IsPc.init() ? CONFIG.URL.login : CONFIG.URL.mLogin}>
                                        <p>{CONFIG.PROMPT.drawNoLogin}</p>
                                    </a>
                            }

                        </li> :
                            <li className='btn'
                                style={{backgroundImage: 'url(http://hd.res.meizu.com/hd/custom/hd/images/draw-w.png)'}}>
                                {
                                    !_isEnd ?
                                        <div className="no-start">活动结束了</div> :
                                        <div className="no-start">活动还未开始</div>
                                }

                            </li>
                    }

                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[3].prizeImg.link} alt={_details[3].prizeName.text}/>
                        <p>{_details[3].prizeName.text}</p>
                    </li>
                </ul>

                <ul className="lottery-group">
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[6].prizeImg.link} alt={_details[6].prizeName.text}/>
                        <p>{_details[6].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[5].prizeImg.link} alt={_details[5].prizeName.text}/>
                        <p>{_details[5].prizeName.text}</p>
                    </li>
                    <li className='lottery-unit'>
                        <img className="be-lazy" src="http://hd.res.meizu.com/hd/image/2016/04/01/blank.png"
                             data-src={_details[4].prizeImg.link} alt={_details[4].prizeName.text}/>
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

    },
    componentDidMount(){
        //获取当日剩余抽奖次数接口
        this._getChance('get')
    },
    /**
     * 抽奖次数
     */
    _getChance(e, href){
        if (!this.state.canDraw) return;
        let that        = this,
            _main       = this.state.main,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = e == 'get' ? CONFIG.urlPc.getChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId : CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (!IsPc.init() && e == 'null') {
                //yi
                window.location.href = href;
            }
            else {
                if (e == 'null') {
                    that.state.canDraw ? location.reload(true) : '';
                }
                if (data.success) {
                    that.setState({
                        drawChance: data.data.left,
                        canDraw   : data.data.tLeft > 0 ? true : false,
                        getDate   : true
                    });
                    data.data.tLeft == 0 ? that.props.handleChange(false) : ''
                    that._bindDraw();
                }
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

                if (that.state.canDraw) {
                    that._getChance("null");
                }
                if (IsPc.init()) {
                    window.open(_href);
                }
            }
            return;
        }
        Lottery.lottery({
            selector  : '#J_lotteryPc',
            button    : '#J_lotteryBtn',
            width     : 3,    //长
            height    : 3,    //高
            index     : 0,    // 初始位置
            initSpeed : 50,  // 初始转动速度
            upStep    : 50,   // 加速滚动步长
            upMax     : 50,   // 速度上限
            downStep  : 30,   // 减速滚动步长
            downMax   : 500,  // 减速上限
            waiting   : 3000, // 匀速转动时长
            target    : that._getId(_details, _defaultID), //中奖id，可通过后台算法来获得，默认值：最便宜的一个奖项或者"谢谢参与"
            beforeRoll: function () { // 重写滚动前事件：beforeRoll
                console.log("开始抽奖");
                that.props.isStart(true);
                const _url = CONFIG.urlPc.getDraw + '?activityId=' + _activityId + '&appId=' + CONFIG.POSTDATA.appId;
                that._pullDraw(_details, _url);

            },
            beforeDown: function () {//重写减速之前的操作
                console.log("减速了");
                this._down(PARAMETER._target);
            },
            callBack  : function () {//重写转盘停止自定义事件
                console.log("抽奖结束");

                that.props.isStart(false);
                that._onOpen(PARAMETER._draw);

                //减抽奖次数
                that.setState({
                    drawChance: that.state.drawChance - 1
                });
            },
            _stop     : function () { // 重写转盘停止，没有抽奖机会后禁用按钮
                //没有抽奖机会
                if (that.state.drawChance < 1) {
                    var _href                                       = location.href;
                    _href                                           = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
                    document.getElementById('J_lotteryBtn').onclick = function () {
                        if (that.state.canDraw) {
                            that._getChance("null", _href);
                        }
                        if (IsPc.init()) {
                            window.open(_href);
                        }

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
        if (!IsPc.init()) {
            var _marginTop  = "-3.21rem",
                _marginLeft = "-3.21rem",
                _width      = "6.42rem";
        }
        else {
            var _marginTop  = "-200",
                _marginLeft = "-235",
                _width      = "470";
        }
        document.body.className = 'no-scroll';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={true} width={_width} marginTop={_marginTop}
                                  marginLeft={_marginLeft}><DrawDialog drawData={draw}
                                                                       mainData={this.state.main}/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false}><DrawDialog /></HdDialog>,
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
            PARAMETER._draw = data;
            if (data.data) {
                PARAMETER._target = that._getId(details, data.data.id);
            }
            else {
                PARAMETER._target = that._getId(details, that.props.main.defaultId.text);
            }

        }).fail(function () {
            console.log('抽奖接口服务异常')
        });
    }
});
module.exports = DrawBox;