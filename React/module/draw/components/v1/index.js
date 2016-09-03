/**
 * 抽奖公用
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-10.
 */
const BorderLight = require('./border-light')
const Winners     = require('./winners')
const DrawBox     = require('./do-draw')
const AJAXCONGIG  = require('../../../../lib/outil/ajax');
const IsPc        = require('../../../../lib/outil/isPc');

const DrawView = React.createClass({
    getInitialState(){
        return {
            main      : this.props.mainData,
            details   : this.props.detailsData,
            drawChance: 0,
            _isStart  : false,
            PcCanDraw : true
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            _isStart: nextProps._isStart
        });
    },
    //
    handleChange: function (event) {
        this.setState({PcCanDraw: event});
        !IsPc.init() && !this.state.PcCanDraw ?
            this.props.mHhandleChange(false) : '';
    },
    render(){
        let _details    = this.state.details,
            _main       = this.state.main,
            _drawChance = this.state.drawChance,
            _href       = location.href;
        _href           = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
        return (
            <div className="draw-pcArea clearfix">
                <div className="draw-pcLeft fl">
                    <BorderLight l1="http://hd.res.meizu.com/hd/custom/hd/images/l1.png"
                                 l2="http://hd.res.meizu.com/hd/custom/hd/images/l2.png"
                                 _isStart={this.state._isStart}/>
                    <DrawBox handleChange={this.handleChange} details={_details} main={_main} drawChance={_drawChance}
                             isStart={this._start}/>
                </div>
                <div className="draw-pcRight fl">
                    {
                        IsPc.init() ?
                            <div>
                                <a href={_href} target={IsPc.init() ? "_bland" : "_self"} className="share-btn"
                                   onClick={this._updateChance}>{_main.drawShareBtn.text}<i></i></a>
                                <p className="draw-add">
                                    每日分享赠送{_main.addChance.text}次抽奖机会
                                </p>
                            </div> : ''
                    }
                    <div className="draw-list">
                        <Winners main={_main}/>
                    </div>
                </div>
            </div>
        )
    },
    //开始抽奖
    _start(e){
        console.log(e);
        this.setState({
            _isStart: e
        });
    },

    /**
     * 抽奖次数
     */
    _updateChance(){
        let that        = this,
            _main       = this.state.main,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (data.success) {
                that.setState({
                    drawChance: data.data
                });
                if (IsPc.init()) {
                    location.reload();
                }
            }
            else {
                console.log(data.errorMsg)
            }

        }).fail(function () {
            console.log('获取抽奖次数接口服务异常')
        });
    },
    componentDidMount(){
    }
})
module.exports = DrawView;