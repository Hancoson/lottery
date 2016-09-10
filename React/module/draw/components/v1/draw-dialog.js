/**
 * 抽奖相关弹窗
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-17.
 */
const IsPc         = require('../../../../lib/outil/isPc');
const HdDialog     = require('../../../../lib/components/dialog/dialog');
const HdFullDialog = require('../../../../lib/components/dialog/full-dialog');
const WriteInfo    = require('./write-info');
const AJAXCONGIG   = require('../../../../lib/outil/ajax');

const DrawDialog = React.createClass({
    createMarkup() {
        return {__html: CONFIG.PROMPT.drawDialog};
    },
    render(){
        //type: 1,#奖品类型    0未中奖奖品、1实物奖品、2优惠券、3红包、4 M码
        var _draw     = this.props.drawData,
            _data     = _draw.data,
            _main     = this.props.mainData,
            _shareDec = _data ? unescape(this.props.mainData.shareMyPrice.text.split('[name]')[0]) + _draw.data.name + unescape(this.props.mainData.shareMyPrice.text.split('[name]')[1]) : '谢谢惠顾！',
            _href     = location.href;
        _href         = 'http://service.weibo.com/share/share.php?appkey=584049942&title=' + _main.drawShareDec.text + '&pic=' + _main.drawShareImg.link + '&Uid=&language=zh_cn&url=' + _href;
        console.log(_data.type);
        return (
            <div className="hd-drawDialogS">
                {
                    _draw.success && _data.type != 0 ?
                        <div>
                            <div className="title">
                                <p><i></i>恭喜获得{_data.name}！</p>
                            </div>
                            <div className="con">
                                <div className="bg">
                                    <img src={_data.img}/>
                                </div>
                                <div className="links">
                                    {
                                        _data.type == 1 || _data.type == 4 ?
                                            <a href="javascript:void(0)" className="btn" onClick={this._toWriteInfo}>填写收货信息</a> :
                                            <div className="s">
                                                <p className="text">“{_shareDec}”</p>
                                                <a href={_href} target={IsPc.init() ? "_blank" : "_self"}
                                                   className="btn i"
                                                   onClick={this._getChance}>去炫耀</a>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div> :
                        <div>
                            {
                                _draw.errorCode == 6202 || _draw.errorCode == 6205 || _draw.errorCode == 6207 || _draw.errorCode == 6208 ?
                                    <div className="error">
                                        <i></i><p>{_draw.errorMsg}</p>
                                    </div> :
                                    <div>
                                        <div className="title">
                                            {CONFIG.PROMPT.noDraw}
                                        </div>
                                        <div className="con">
                                            <div className="bg no">
                                                <img src="http://hd.res.meizu.com/hd/custom/hd/images/xiexie.png"/>
                                            </div>
                                            <div className="links">
                                                <a href="javascript:void(0)" className="btn"
                                                   onClick={this._onClose}>确定</a>
                                            </div>
                                        </div>
                                    </div>

                            }

                        </div>
                }
                {
                    _data && _data.type == 3 ?
                        <div className="bottom" dangerouslySetInnerHTML={this.createMarkup()}></div> : ''
                }


            </div>
        )
    },
    /**
     * 关闭弹窗
     * @private
     */
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false}><DrawDialog/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    /**
     * 填写收货信息
     * @private
     */
    _toWriteInfo(){
        this._onClose();
        document.body.className = 'no-scroll';
        !IsPc.init() ? document.getElementsByTagName('BODY')[0].scrollTop = 0 : '';
        ReactDOM.render(
            IsPc.init() ?
                <HdDialog
                    onClose={this._onClose}
                    isOpen={true}
                    width="700"
                    marginTop="-250"
                    marginLeft="-350">
                    <WriteInfo
                        drawData={this.props.drawData.data}
                        mainData={this.props.mainData}/>
                </HdDialog> :
                <HdFullDialog
                    onClose={this._onClose}
                    isOpen={true}
                    title="填写您的收货信息">
                    <WriteInfo
                        drawData={this.props.drawData.data}
                        mainData={this.props.mainData}/>
                </HdFullDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    /**
     * 抽奖次数
     */
    _getChance(){
        let that        = this,
            _main       = this.props.mainData,
            _activityId = _main.id.disabled,//抽奖活动ID
            _url        = CONFIG.urlPc.updateChance + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _activityId;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            console.log(data);
            if (data.success) {
                //分享成功后
                IsPc.init() ? location.reload(true) : ''

            }
            else {
                console.log(data.errorMsg)
            }

        }).fail(function () {
            console.log('获取抽奖次数接口服务异常')
        });
    },
});
module.exports   = DrawDialog;
