/**
 * 提交收货地址结果
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-20.
 */
const IsPc       = require('../../../../lib/outil/isPc');
const AJAXCONGIG = require('../../../../lib/outil/ajax');
const HdDialog   = require('../../../../lib/components/dialog/dialog');

const Result   = React.createClass({
    getInitialState(){
        return {
            isOpen   : this.props.isOpen,
            main     : this.props.mainData,
            drawData : this.props.drawData,
            result   : this.props.result
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({});
    },
    render(){
        //type: 1,#奖品类型    0未中奖奖品、1实物奖品、2优惠券、3红包、4 M码
        var _draw      = this.state.drawData,
            _main      = this.state.main,
            _result    = this.state.result,
            _shareDec  = _main.shareMyPrice.text.split('[name]')[0] + _draw.name + _main.shareMyPrice.text.split('[name]')[1],
            _href      = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _shareDec + '&pic=' + _draw.img + '&Uid=&language=zh_cn&url=' + location.href;
        console.log(_draw);

        return (
            <div className="hd-drawDialogBig result">
                <div className={className('re-title',{'err-t': !_result.success})}>
                    <i className={className({'err': !_result.success})}></i>
                    {
                        !_result.success ? CONFIG.PROMPT.pullInfoErr : CONFIG.PROMPT.pullInfoSucc
                    }
                </div>
                {
                    !_result.success ?
                        <div className="re-bottom">
                            <button className="btn" onClick={this._onClose}>确 定</button>
                        </div> :
                        <div className="re-bottom">
                            <div className="img">
                                <img src={_draw.img}/>
                                {
                                    IsPc.init()?<p>{_draw.name}</p>:''
                                }

                            </div>
                            <div className="text">
                                “{_shareDec}”
                            </div>
                            <a className="btn succ" href={_href} target={IsPc.init()?"_bland":"_self"} onClick={this._getChance}>一键分享微博</a>
                        </div>
                }
            </div>
        )
    },
    componentWillMount(){
    },
    componentDidMount(){
        //默认获取省
    },

    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false}><Result/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    /**
     * 抽奖次数
     */
    _getChance(){
        let that        = this,
            _main       = this.state.main,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (data.success) {
                //分享成功后
                if(IsPc.init()){
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
});
module.exports = Result;
