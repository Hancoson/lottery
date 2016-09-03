/**
 * 移动版抽奖
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-24.
 */

require('../../../../lib/outil/lazyload');
const AJAXCONGIG     = require('../../../../lib/outil/ajax');
const DrawView       = require('../../components/v1/index');
const MyDraw         = require('../../components/v1/myDraw')
const DrawRegulation = require('../../components/v1/regulation')
const Message    = require('../../../../lib/components/popmsg/popmsg');

const PcDraw = React.createClass({
    getInitialState(){
        return {
            MCanDraw  : true
        }
    },

    //
    mHhandleChange: function (event) {
        this.setState({MCanDraw: event})
    },
    render() {
        let _data    = this.props.data,
            _main    = _data.main,
            _details = _data.details,
            _bg      = _main.bg.text,
            _href    = location.href;
        _href        = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
        return (
            <div className="main clearfix" style={{background: _bg}}>
                <div className="container">
                    <div className="mhd-draw">
                        <a href={_href} className="m-share-btn" onClick={this._updateChance}>
                            <p>每日分享赠送{_main.addChance.text}次抽奖机会<i></i></p>

                        </a>
                        <DrawView mHhandleChange={this.mHhandleChange} mainData={_main} detailsData={_details}/>

                        <div className="top-btns">
                            <MyDraw mainData={_main}/>
                            <DrawRegulation mainData={_main}/>
                        </div>
                    </div>
                </div>
                <div id="J_drawdialogView"></div>
            </div>
        )
    },
    /**
     * 抽奖次数
     */
    _updateChance(){
        let that        = this,
            _data       = this.props.data,
            _main       = _data.main,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (data.success) {
                that.setState({
                    drawChance: data.data
                });
            }
            else {
                console.log(data.errorMsg)
            }

        }).fail(function () {
            console.log('获取抽奖次数接口服务异常')
        });
    },
});

hdMDrawv1.map(function (val) {
    return (
        ReactDOM.render(<PcDraw data={val.content}/>,
            document.getElementById(val.id)
        )
    )

})