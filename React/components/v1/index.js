/**
 * 抽奖公用
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-10.
 */
const React = require('react');

const BorderLight = require('./border-light')
const Winners     = require('./winners')
const DrawBox     = require('./do-draw')
const AJAXCONGIG  = require('../../../../lib/outil/ajax');

const DrawView = React.createClass({
    getInitialState(){
        return {
            main      : this.props.mainData,
            details   : this.props.detailsData,
            drawChance: 0
        }
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
                    <BorderLight/>
                    <DrawBox details={_details} main={_main} drawChance={_drawChance}/>
                </div>
                <div className="draw-pcRight fl">
                    <a href={_href} target="_bland" className="share-btn"
                       onClick={this._updateChance}>{_main.drawShareBtn.text}<i></i></a>
                    <p className="draw-add">分享至微博送您{_main.addChance.text}次机会</p>
                    <div className="draw-list">
                        <Winners main={_main}/>
                    </div>
                </div>
            </div>
        )
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